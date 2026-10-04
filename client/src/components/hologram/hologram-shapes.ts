import type { FormId } from "@/data";

/*
  Particle sculptures for each form. Every builder fills `n` points (x, y, z) inside
  roughly a radius-2 sphere. Some shapes also move on their own (`motion`): it rewrites
  the positions for time t, and `positions` is that motion at t = 0.
*/
export type Shape = {
  positions: Float32Array;
  motion?: (out: Float32Array, t: number) => void;
  pointScale?: number; // particle size multiplier for this shape (default 1)
  tones?: Float32Array; // per-particle colour role (see TONE); default: theme colours
};

// Colour roles a shape can give its particles (read by the shader in hologram-scene).
export const TONE = { theme: 0, white: 1, warm: 2, dim: 3 } as const;

type Vec = [number, number, number];

const rand = (a = -1, b = 1) => a + Math.random() * (b - a);
const gauss = () => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};
const onSphere = (r: number): Vec => {
  const x = gauss(), y = gauss(), z = gauss();
  const len = Math.hypot(x, y, z) || 1;
  return [(x / len) * r, (y / len) * r, (z / len) * r];
};
const rotX = ([x, y, z]: Vec, a: number): Vec => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];

// surface samplers
const fill = (n: number, gen: (i: number) => Vec) => {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) out.set(gen(i), i * 3);
  return out;
};
const still = (positions: Float32Array): Shape => ({ positions });
const scaled = (positions: Float32Array, k: number) => positions.map((v) => v * k);

// harry: a black hole. The accretion disk orbits (inner particles faster), the centre
// stays empty, and a photon ring faces the viewer.
const blackHole = (n: number): Shape => {
  const DISK_TILT = 0.32;
  const kind = new Uint8Array(n); // 0 disk, 1 photon ring, 2 lensed arc over the top
  const radius = new Float32Array(n);
  const angle = new Float32Array(n);
  const height = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    if (i < n * 0.72) {
      radius[i] = 0.95 + Math.pow(Math.random(), 1.6) * 0.85;
      height[i] = gauss() * 0.025 * radius[i];
      angle[i] = Math.random() * Math.PI * 2;
    } else if (i < n * 0.86) {
      kind[i] = 1;
      radius[i] = 0.58 + rand(-0.025, 0.025);
      height[i] = rand(-0.02, 0.02);
      angle[i] = Math.random() * Math.PI * 2;
    } else {
      // light from the far side of the disk, bent up and over the shadow
      kind[i] = 2;
      radius[i] = 0.7 + Math.pow(Math.random(), 2) * 0.25;
      height[i] = rand(-0.03, 0.03);
      angle[i] = rand(0.08, Math.PI - 0.08);
    }
  }
  const motion = (out: Float32Array, t: number) => {
    for (let i = 0; i < n; i++) {
      const r = radius[i];
      let p: Vec;
      if (kind[i] === 0) {
        const a = angle[i] + (1.1 / Math.pow(r, 1.5)) * t; // Kepler-ish: faster near the centre
        p = rotX([Math.cos(a) * r, height[i], Math.sin(a) * r], DISK_TILT);
      } else if (kind[i] === 1) {
        const a = angle[i] + t * 0.6;
        p = [Math.cos(a) * r, Math.sin(a) * r, height[i]];
      } else {
        const a = angle[i];
        const shimmer = 1 + Math.sin(t * 1.5 + a * 6) * 0.02;
        p = [Math.cos(a) * r * 1.35 * shimmer, Math.sin(a) * r * 0.85 * shimmer - 0.05, -0.2 + height[i]];
      }
      out[i * 3] = p[0];
      out[i * 3 + 1] = p[1];
      out[i * 3 + 2] = p[2];
    }
  };
  const positions = new Float32Array(n * 3);
  motion(positions, 0);
  return { positions, motion, pointScale: 0.72 };
};

// dev: Tux, modelled on Larry Ewing's original Linux penguin. Pear-shaped dark body,
// white face + belly, white eyes with pupils, a wide warm beak and big flat feet.
const penguin = (n: number): Shape => {
  // body half-width at height y: narrow at the head, widest low down (pear shape)
  const halfWidth = (y: number) => 0.5 + 0.42 * Math.exp(-((y + 0.55) ** 2) / 0.55);
  const BOTTOM = -1.15, TOP = 1.3;
  // a point on the body surface at height y and angle a (a = 0 faces the viewer)
  const body = (y: number, a: number): Vec => {
    const w = halfWidth(y);
    const round = Math.sqrt(Math.max(0, 1 - ((y - (BOTTOM + TOP) / 2) / ((TOP - BOTTOM) / 2)) ** 2)) * 0.35 + 0.65;
    return [Math.sin(a) * w * round, y, Math.cos(a) * w * 0.8 * round];
  };
  // project (x, y) onto the front of the body, lifted by `lift`
  const front = (x: number, y: number, lift = 0.02): Vec => {
    const w = halfWidth(y);
    const a = Math.asin(Math.max(-1, Math.min(1, x / (w * 0.98))));
    const p = body(y, a);
    return [x, y, p[2] + lift];
  };
  const tones = new Float32Array(n);
  const positions = fill(n, (i) => {
    const part = i / n;
    if (part < 0.3) {
      tones[i] = TONE.dim; // the black body and head
      return body(rand(BOTTOM, TOP), Math.random() * Math.PI * 2);
    }
    if (part < 0.52) {
      // white belly + face: an oval from the chin down, plus the face patch around the eyes
      tones[i] = TONE.white;
      for (;;) {
        const x = rand(-0.7, 0.7), y = rand(-1.05, 1.15);
        const belly = (x / 0.62) ** 2 + ((y + 0.3) / 0.78) ** 2 < 1;
        const face = (x / 0.42) ** 2 + ((y - 0.78) / 0.32) ** 2 < 1;
        if (belly || face) return front(x, y);
      }
    }
    if (part < 0.62) {
      // eyes: white ovals, close together
      tones[i] = TONE.white;
      const side = Math.random() < 0.5 ? -1 : 1;
      for (;;) {
        const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random());
        const x = side * 0.15 + Math.cos(a) * 0.1 * r, y = 0.98 + Math.sin(a) * 0.15 * r;
        // leave a hole where the pupil sits so it reads as dark
        if (((x - side * 0.12) / 0.055) ** 2 + ((y - 0.95) / 0.075) ** 2 > 1) return front(x, y, 0.05);
      }
    }
    if (part < 0.66) {
      // pupils, looking slightly inward
      tones[i] = TONE.dim;
      const side = Math.random() < 0.5 ? -1 : 1;
      const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random());
      return front(side * 0.12 + Math.cos(a) * 0.045 * r, 0.95 + Math.sin(a) * 0.065 * r, 0.08);
    }
    if (part < 0.76) {
      // beak: wide and flat, upper and lower halves
      tones[i] = TONE.warm;
      const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random());
      const lower = Math.random() < 0.4;
      const [x, y, z] = front(Math.cos(a) * 0.27 * r, (lower ? 0.68 : 0.76) + Math.sin(a) * (lower ? 0.045 : 0.06) * r, 0.06);
      return [x, y, z + 0.12 * (1 - r)];
    }
    if (part < 0.9) {
      // feet: big flat ovals splayed outward, toes forward
      tones[i] = TONE.warm;
      const side = Math.random() < 0.5 ? -1 : 1;
      const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random());
      const fx = Math.cos(a) * 0.36 * r, fz = Math.sin(a) * 0.26 * r;
      const spread = side * 0.4;
      return [side * 0.42 + fx * Math.cos(spread) - fz * Math.sin(spread), BOTTOM - 0.06 + rand(-0.03, 0.03), 0.3 + fx * Math.sin(spread) + fz * Math.cos(spread)];
    }
    // flippers: hang down at the sides, angled out
    tones[i] = TONE.dim;
    const side = Math.random() < 0.5 ? -1 : 1;
    const [x, y, z] = onSphere(1);
    const fx = x * 0.12, fy = y * 0.5, fz = z * 0.26, tilt = side * 0.35;
    return [side * 0.86 + fx * Math.cos(tilt) - fy * Math.sin(tilt), -0.35 + fx * Math.sin(tilt) + fy * Math.cos(tilt), fz];
  });
  return { positions: scaled(positions, 1.15), tones };
};

// ops: the DevOps infinity loop, tilted toward the viewer, with particles flowing
// around it like a pipeline that never stops.
const pipeline = (n: number): Shape => {
  const u0 = new Float32Array(n);
  const off = new Float32Array(n * 3);
  const speed = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    u0[i] = Math.random() * Math.PI * 2;
    const core = i < n * 0.2;
    off.set(onSphere(core ? 0.03 : 0.26 * Math.sqrt(Math.random())), i * 3);
    speed[i] = core ? 0.55 : 0.4 + Math.random() * 0.12;
  }
  const A = 2.05;
  const TILT = -0.95;
  const motion = (out: Float32Array, t: number) => {
    for (let i = 0; i < n; i++) {
      const u = u0[i] + speed[i] * t;
      const d = 1 + Math.sin(u) ** 2;
      const p = rotX(
        [(A * Math.cos(u)) / d + off[i * 3], Math.sin(2 * u) * 0.28 + off[i * 3 + 1], (A * Math.sin(u) * Math.cos(u)) / d + off[i * 3 + 2]],
        TILT,
      );
      out[i * 3] = p[0];
      out[i * 3 + 1] = p[1] + 0.1;
      out[i * 3 + 2] = p[2];
    }
  };
  const positions = new Float32Array(n * 3);
  motion(positions, 0);
  return { positions, motion };
};

// pm: a suspension bridge (connecting clients, design and engineering).
const bridge = (n: number): Shape =>
  still(
    fill(n, (i) => {
      const part = i / n;
      const L = 1.85; // half span
      const TOWER_X = 1.05;
      const DECK_Y = -0.45;
      const TOP_Y = 1.0;
      const side = Math.random() < 0.5 ? -0.22 : 0.22; // two cable planes, front and back
      // main cable: sags between the towers, runs down to anchors at each end
      const cableY = (x: number) => {
        const ax = Math.abs(x);
        if (ax <= TOWER_X) return DECK_Y + 0.12 + (TOP_Y - DECK_Y - 0.12) * (ax / TOWER_X) ** 2;
        return TOP_Y - (TOP_Y - DECK_Y) * ((ax - TOWER_X) / (L - TOWER_X));
      };
      if (part < 0.22) {
        // deck: a flat slab with railings
        const x = rand(-L, L);
        return Math.random() < 0.6 ? [x, DECK_Y + rand(-0.03, 0.03), rand(-0.26, 0.26)] : [x, DECK_Y + 0.08, side * 1.18];
      }
      if (part < 0.52) {
        // two towers, each a pair of thick legs with cross braces
        const tx = Math.random() < 0.5 ? -TOWER_X : TOWER_X;
        const r = Math.random();
        if (r < 0.12) return [tx + rand(-0.16, 0.16), rand(-1.25, -1.05), rand(-0.32, 0.32)]; // pier at the waterline
        // legs: extra weight below the deck so they read clearly
        if (r < 0.45) return [tx + rand(-0.08, 0.08), rand(-1.05, DECK_Y), side + rand(-0.06, 0.06)];
        if (r < 0.82) return [tx + rand(-0.07, 0.07), rand(DECK_Y, TOP_Y + 0.15), side + rand(-0.05, 0.05)];
        const by = [0.1, 0.7][Math.floor(Math.random() * 2)];
        return [tx + rand(-0.03, 0.03), by + rand(-0.02, 0.02), rand(-0.22, 0.22)];
      }
      if (part < 0.77) {
        const x = rand(-L, L); // main cables
        return [x, cableY(x) + rand(-0.015, 0.015), side];
      }
      if (part < 0.985) {
        // vertical hangers from cable to deck
        const k = Math.round(rand(-L, L) / 0.18) * 0.18;
        return [k, rand(DECK_Y, cableY(k)), side];
      }
      // a faint waterline under the deck
      return [rand(-L, L), -1.2 + rand(-0.01, 0.01), rand(-0.15, 0.15)];
    }),
  );

// tutor: a lightbulb (an idea clicking).
const bulb = (n: number): Shape =>
  still(
    fill(n, (i) => {
      const part = i / n;
      if (part < 0.62) {
        const [x, y, z] = onSphere(0.9);
        return [x, y * 1.05 + 0.4, z];
      }
      if (part < 0.9) {
        const y = rand(-1.25, -0.45);
        const r = 0.36 + Math.max(0, y + 0.75) * 0.6;
        const ridge = Math.abs(Math.sin(y * 18)) > 0.6 ? 1.06 : 1;
        const a = Math.random() * Math.PI * 2;
        return [Math.cos(a) * r * ridge, y, Math.sin(a) * r * ridge];
      }
      const t = rand(-1, 1); // filament
      return [t * 0.35, 0.35 + Math.abs(Math.sin(t * 9)) * 0.25, rand(-0.02, 0.02)];
    }),
  );

// care: a puffy 3D heart.
const heart = (n: number): Shape =>
  still(
    fill(n, () => {
      const t = Math.random() * Math.PI * 2;
      const s = Math.sqrt(Math.random());
      const x = 16 * Math.sin(t) ** 3;
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const depth = Math.sqrt(Math.max(0, 1 - s * s)) * 0.55;
      return [(x / 17) * 1.5 * s, (y / 17) * 1.5 * s + 0.15, rand(-1, 1) * depth];
    }),
  );

// pool: an 8-ball. Faint sphere, white circle, and a dense "8" facing the viewer.
const eightBall = (n: number): Shape => {
  const R = 1.15;
  const front = (x: number, y: number, lift = 0.02): Vec => [x, y, Math.sqrt(Math.max(0, R * R - x * x - y * y)) + lift];
  return still(
    fill(n, (i) => {
      const part = i / n;
      if (part < 0.4) return onSphere(R);
      if (part < 0.55) {
        const a = Math.random() * Math.PI * 2; // circle outline
        return front(Math.cos(a) * 0.48, Math.sin(a) * 0.48 + 0.02);
      }
      if (part < 0.63) {
        const a = Math.random() * Math.PI * 2, r = 0.46 * Math.sqrt(Math.random()); // circle fill, sparse
        return front(Math.cos(a) * r, Math.sin(a) * r + 0.02, 0.01);
      }
      const top = Math.random() < 0.45; // the 8: two stacked loops, drawn thick
      const a = Math.random() * Math.PI * 2;
      const r = (top ? 0.12 : 0.155) + rand(-0.018, 0.018);
      return front(Math.cos(a) * r * 0.85, Math.sin(a) * r + (top ? 0.18 : -0.12), 0.04);
    }),
  );
};

const BUILDERS: Record<FormId, (n: number) => Shape> = {
  harry: blackHole,
  developer: penguin,
  devops: pipeline,
  pm: bridge,
  tutor: bulb,
  volunteer: heart,
  offduty: eightBall,
};

export const buildShape = (id: FormId, n: number): Shape => BUILDERS[id](n);
