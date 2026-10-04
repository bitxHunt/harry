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
};

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
const box = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number): Vec => {
  const face = Math.floor(Math.random() * 6);
  const x = rand(x0, x1), y = rand(y0, y1), z = rand(z0, z1);
  if (face === 0) return [x0, y, z];
  if (face === 1) return [x1, y, z];
  if (face === 2) return [x, y0, z];
  if (face === 3) return [x, y1, z];
  if (face === 4) return [x, y, z0];
  return [x, y, z1];
};
const fill = (n: number, gen: (i: number) => Vec) => {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) out.set(gen(i), i * 3);
  return out;
};
const still = (positions: Float32Array): Shape => ({ positions });

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

// dev: a laptop with a big </> on the screen.
const laptop = (n: number): Shape => {
  const TILT = 0.26; // screen leans back
  const HINGE_Z = -0.25;
  // a point on the screen plane at (x, y), pushed slightly forward by `lift`
  const screen = (x: number, y: number, lift = 0): Vec => [x, y, HINGE_Z - (y + 0.85) * Math.tan(TILT) + lift];
  // thick stroke between two screen points (for the </> glyph)
  const stroke = (a: [number, number], b: [number, number]): Vec => {
    const t = Math.random();
    return screen(a[0] + (b[0] - a[0]) * t + rand(-0.05, 0.05), a[1] + (b[1] - a[1]) * t + rand(-0.05, 0.05), 0.05 + rand(-0.03, 0.03));
  };
  const GLYPH: [[number, number], [number, number]][] = [
    [[-0.72, 0.38], [-0.38, 0.66]], // <
    [[-0.72, 0.38], [-0.38, 0.1]],
    [[-0.13, -0.02], [0.13, 0.78]], // /
    [[0.38, 0.66], [0.72, 0.38]], // >
    [[0.38, 0.1], [0.72, 0.38]],
  ];
  return still(
    fill(n, (i) => {
      const part = i / n;
      if (part < 0.22) return box(-1.4, 1.4, -1.0, -0.86, HINGE_Z, 1.15); // keyboard deck
      if (part < 0.32) {
        // key rows on top of the deck
        const row = Math.floor(Math.random() * 4);
        return [Math.round(rand(-1.15, 1.15) / 0.16) * 0.16, -0.84, 0.05 + row * 0.2 + rand(-0.02, 0.02)];
      }
      if (part < 0.52) {
        // screen frame: the four edges, a little thick
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) return screen(rand(-1.3, 1.3), -0.82 + rand(-0.03, 0.03));
        if (edge === 1) return screen(rand(-1.3, 1.3), 1.08 + rand(-0.03, 0.03));
        return screen((edge === 2 ? -1.3 : 1.3) + rand(-0.03, 0.03), rand(-0.82, 1.08));
      }
      if (part < 0.6) return screen(rand(-1.25, 1.25), rand(-0.78, 1.04), -0.01); // dim screen glass
      return stroke(...GLYPH[Math.floor(Math.random() * GLYPH.length)]); // </>
    }),
  );
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
  developer: laptop,
  devops: pipeline,
  pm: bridge,
  tutor: bulb,
  volunteer: heart,
  offduty: eightBall,
};

export const buildShape = (id: FormId, n: number): Shape => BUILDERS[id](n);
