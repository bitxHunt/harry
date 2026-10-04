import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Group,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  AdditiveBlending,
  NormalBlending,
  Color,
  Points,
  Clock,
} from "three";
import type { FormId } from "@/data";
import { buildShape } from "./hologram-shapes";
import { THEME_EVENT, accentColors, isLightTheme } from "@/lib/theme";

export type SceneApi = { morphTo: (id: FormId) => void; dispose: () => void };

const VERTEX = /* glsl */ `
  uniform float uSize;
  uniform float uSizeMul;
  uniform float uPixelRatio;
  uniform float uTime;
  attribute float aMix;
  attribute float aScale;
  varying float vMix;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float twinkle = 0.8 + 0.2 * sin(uTime * 2.0 + aMix * 40.0);
    gl_PointSize = uSize * uSizeMul * aScale * twinkle * uPixelRatio * (1.0 / -mv.z);
    vMix = aMix;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uCyan;
  uniform vec3 uViolet;
  uniform vec3 uPink;
  uniform float uAlpha;
  varying float vMix;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uCyan, uViolet, smoothstep(0.0, 0.75, vMix));
    col = mix(col, uPink, smoothstep(0.85, 1.0, vMix));
    gl_FragColor = vec4(col, alpha * uAlpha);
  }
`;

/*
  Builds the three.js scene. This module is imported dynamically by FormHologram, and
  uses named imports so the bundler only ships the parts of three.js used here.
  One Points cloud morphs between shapes: each particle flies out along its own
  direction and lands in the next shape, with a staggered start.
*/
export const createScene = (host: HTMLDivElement, initial: FormId, reduced: boolean): SceneApi => {
  const small = host.clientWidth < 420;
  const N = small ? 1500 : 2600;

  const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
  const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.set(0, 0.35, 7);

  const group = new Group();
  scene.add(group);

  // particles
  const initialShape = buildShape(initial, N);
  const current = initialShape.positions;
  let from: Float32Array = current.slice();
  let to: Float32Array = current.slice();
  // shapes that move by themselves (black hole, pipeline) take over once a morph lands
  let motion = initialShape.motion;
  let pendingMotion: typeof motion;
  let motionStart = 0;
  let targetSizeMul = initialShape.pointScale ?? 1;
  const dirs = new Float32Array(N * 3);
  const delays = new Float32Array(N);
  const mixes = new Float32Array(N);
  const scales = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const x = Math.random() * 2 - 1, y = Math.random() * 2 - 1, z = Math.random() * 2 - 1;
    const len = Math.hypot(x, y, z) || 1;
    dirs[i * 3] = x / len; dirs[i * 3 + 1] = y / len; dirs[i * 3 + 2] = z / len;
    delays[i] = Math.random() * 0.35;
    mixes[i] = Math.random();
    scales[i] = 0.55 + Math.random() * 0.9;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(current, 3));
  geometry.setAttribute("aMix", new BufferAttribute(mixes, 1));
  geometry.setAttribute("aScale", new BufferAttribute(scales, 1));
  const material = new ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: isLightTheme() ? NormalBlending : AdditiveBlending,
    uniforms: {
      uSize: { value: small ? 70 : 85 },
      uSizeMul: { value: initialShape.pointScale ?? 1 },
      uAlpha: { value: isLightTheme() ? 0.38 : 0.62 },
      uPixelRatio: { value: pixelRatio },
      uTime: { value: 0 },
      uCyan: { value: new Color(accentColors().cyan || "#7cf2ff") },
      uViolet: { value: new Color(accentColors().violet || "#a78bfa") },
      uPink: { value: new Color(accentColors().pink || "#f0abfc") },
    },
  });
  const points = new Points(geometry, material);
  group.add(points);

  // morph state
  let morphStart = -1;
  const DURATION = reduced ? 0.001 : 1.5;
  const morphTo = (id: FormId) => {
    const pos = geometry.getAttribute("position").array as Float32Array;
    from = pos.slice();
    const next = buildShape(id, N);
    to = next.positions;
    pendingMotion = next.motion;
    targetSizeMul = next.pointScale ?? 1;
    motion = undefined;
    morphStart = clock.getElapsedTime();
  };

  // pointer tilt (desktop only)
  let tx = 0, ty = 0;
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    tx = (e.clientX / window.innerWidth) * 2 - 1;
    ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  // follow the accent theme picked in the About section
  const onTheme = () => {
    const c = accentColors();
    material.uniforms.uCyan.value.set(c.cyan);
    material.uniforms.uViolet.value.set(c.violet);
    material.uniforms.uPink.value.set(c.pink);
    // glow on dark backgrounds, solid ink on light ones
    material.blending = isLightTheme() ? NormalBlending : AdditiveBlending;
    material.uniforms.uAlpha.value = isLightTheme() ? 0.38 : 0.62;
    material.needsUpdate = true;
  };
  window.addEventListener(THEME_EVENT, onTheme);

  // sizing
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  // only render while visible
  let onScreen = true;
  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }, { threshold: 0.05 });
  io.observe(host);

  const clock = new Clock();
  let raf = 0;
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!onScreen || document.hidden) return;
    const t = clock.getElapsedTime();
    material.uniforms.uTime.value = t;
    // light themes draw ink, not glow: smaller dots so the shape stays readable
    const sizeTarget = targetSizeMul * (isLightTheme() ? 0.7 : 1);
    material.uniforms.uSizeMul.value += (sizeTarget - material.uniforms.uSizeMul.value) * 0.06;

    if (morphStart >= 0) {
      const pos = geometry.getAttribute("position").array as Float32Array;
      const elapsed = (t - morphStart) / DURATION;
      let done = true;
      for (let i = 0; i < N; i++) {
        const local = Math.min(Math.max((elapsed - delays[i]) / 0.65, 0), 1);
        if (local < 1) done = false;
        const e = ease(local);
        const burst = reduced ? 0 : Math.sin(Math.PI * local) * 1.6;
        const k = i * 3;
        pos[k] = from[k] + (to[k] - from[k]) * e + dirs[k] * burst;
        pos[k + 1] = from[k + 1] + (to[k + 1] - from[k + 1]) * e + dirs[k + 1] * burst;
        pos[k + 2] = from[k + 2] + (to[k + 2] - from[k + 2]) * e + dirs[k + 2] * burst;
      }
      geometry.getAttribute("position").needsUpdate = true;
      if (done) {
        morphStart = -1;
        motion = pendingMotion;
        motionStart = t;
      }
    } else if (motion && !reduced) {
      motion(geometry.getAttribute("position").array as Float32Array, t - motionStart);
      geometry.getAttribute("position").needsUpdate = true;
    }

    // swing gently instead of spinning, so flat shapes (heart, infinity) stay readable
    const swing = reduced ? 0 : Math.sin(t * 0.45) * 0.55;
    group.rotation.y += (swing + tx * 0.5 - group.rotation.y) * 0.05;
    group.rotation.x += (0.18 + ty * 0.3 - group.rotation.x) * 0.05;
    group.position.x += (tx * 0.25 - group.position.x) * 0.05;
    group.position.y = Math.sin(t * 0.8) * 0.06;
    renderer.render(scene, camera);
  };
  tick();

  return {
    morphTo,
    dispose: () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener(THEME_EVENT, onTheme);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
};

