"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

/**
 * Das Haus als Architekturmodell. Der Scroll-Fortschritt (0 bis 1) steuert Kamera und Zustand:
 * Start, Lage, Substanz, Technik, Wohnfläche, Schluss. Flache Toon-Flächen mit Konturlinie ergeben den
 * illustrativen Look; keine Texturen, keine Bilddateien.
 */

const INK = "#0a2b33";
const YELLOW = "#ffd23f";
const WALL = "#f1ece2";
const SLATE = "#3b4a5e";
const OUT = 1.35;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const band = (a: number, b: number, c: number, d: number, x: number) => smooth(a, b, x) * (1 - smooth(c, d, x));
/** Weiches Überschwingen ohne Federn: schneller Anstieg, kurzer Überhang, ruhiges Einpendeln. */
const settle = (x: number) => {
  const t = clamp(x);
  return 1 - Math.pow(1 - t, 3) + Math.sin(t * Math.PI) * 0.06;
};

// Konturstärke bleibt auf dem Bildschirm gleich, egal wie weit die Kamera weg ist
const outlineScale = { v: 1 };

/**
 * Konturlinie als aufgeblasene Rückseite des Elternkörpers (Inverted Hull). Die Dicke wird mit der
 * Kameradistanz nachgeführt, damit sie auf Handy und Laptop gleich fein wirkt.
 */
function Outlines({ thickness, color }: { thickness: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const info = useRef<{ size: THREE.Vector3; c: THREE.Vector3; last: number } | null>(null);

  const apply = (k: number) => {
    const hull = ref.current;
    const d = info.current;
    if (!hull || !d) return;
    const t = thickness * OUT * k;
    const sx = (d.size.x + 2 * t) / Math.max(d.size.x, 1e-3);
    const sy = (d.size.y + 2 * t) / Math.max(d.size.y, 1e-3);
    const sz = (d.size.z + 2 * t) / Math.max(d.size.z, 1e-3);
    hull.scale.set(sx, sy, sz);
    hull.position.set(d.c.x * (1 - sx), d.c.y * (1 - sy), d.c.z * (1 - sz));
    d.last = k;
  };

  useLayoutEffect(() => {
    const hull = ref.current;
    const parent = hull?.parent as THREE.Mesh | null | undefined;
    const geo = parent?.geometry;
    if (!hull || !geo) return;
    geo.computeBoundingBox();
    const box = geo.boundingBox;
    if (!box) return;
    info.current = { size: box.getSize(new THREE.Vector3()), c: box.getCenter(new THREE.Vector3()), last: -1 };
    hull.geometry = geo;
    apply(outlineScale.v);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thickness]);

  useFrame(() => {
    if (info.current && Math.abs(info.current.last - outlineScale.v) > 0.015) apply(outlineScale.v);
  });

  return (
    <mesh ref={ref}>
      <meshBasicMaterial color={color} side={THREE.BackSide} />
    </mesh>
  );
}

type Key = { p: number; pos: [number, number, number]; look: [number, number, number]; shift: number };

// Kamera und seitlicher Versatz je Abschnitt: shift > 0 schiebt das Haus nach rechts (Text links).
const KEYS: Key[] = [
  { p: 0.0, pos: [6.5, 4.4, 9.5], look: [0, 1.2, 0], shift: 4.6 },
  { p: 0.12, pos: [6.5, 4.4, 9.5], look: [0, 1.2, 0], shift: 4.6 },
  { p: 0.24, pos: [12, 9, 13.5], look: [0, 0.2, 0], shift: 3.3 },
  { p: 0.34, pos: [12, 9, 13.5], look: [0, 0.2, 0], shift: 3.3 },
  { p: 0.44, pos: [5.4, 3.3, 8.6], look: [-0.2, 1.3, 0.4], shift: 3.9 },
  { p: 0.52, pos: [5.4, 3.3, 8.6], look: [-0.2, 1.3, 0.4], shift: 3.9 },
  { p: 0.62, pos: [8.6, 6.4, 6.8], look: [-0.2, 1.9, -0.3], shift: -4.4 },
  { p: 0.7, pos: [8.6, 6.4, 6.8], look: [-0.2, 1.9, -0.3], shift: -4.4 },
  { p: 0.8, pos: [2.4, 9.2, 9.0], look: [-0.2, 0.5, -0.8], shift: 3.8 },
  { p: 0.9, pos: [2.4, 9.2, 9.0], look: [-0.2, 0.5, -0.8], shift: 3.8 },
  { p: 1.0, pos: [6.5, 4.4, 9.5], look: [0, 1.2, 0], shift: 4.6 },
];

function sample(p: number) {
  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const t = smooth(a.p, b.p, p);
  const mix = (x: number, y: number) => x + (y - x) * t;
  return {
    pos: [mix(a.pos[0], b.pos[0]), mix(a.pos[1], b.pos[1]), mix(a.pos[2], b.pos[2])] as const,
    look: [mix(a.look[0], b.look[0]), mix(a.look[1], b.look[1]), mix(a.look[2], b.look[2])] as const,
    shift: mix(a.shift, b.shift),
  };
}

type ClayProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  args: [number, number, number];
  color: string;
  outline?: number;
  matRef?: React.Ref<THREE.MeshToonMaterial>;
  noOutline?: boolean;
};

/** Ein Quader aus mattem Ton mit Konturlinie. */
function Clay({ position, rotation, args, color, outline = 0.03, matRef, noOutline }: ClayProps) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshToonMaterial ref={matRef} color={color} />
      {noOutline ? null : <Outlines thickness={outline} color={INK} />}
    </mesh>
  );
}

function Ball({
  position,
  r,
  color,
  outline = 0.03,
}: {
  position: [number, number, number];
  r: number;
  color: string;
  outline?: number;
}) {
  return (
    <mesh position={position}>
      <icosahedronGeometry args={[r, 1]} />
      <meshToonMaterial color={color} />
      <Outlines thickness={outline} color={INK} />
    </mesh>
  );
}

function Tree({ x, z, s = 1, round = false }: { x: number; z: number; s?: number; round?: boolean }) {
  return (
    <group position={[x, 0.12, z]} scale={s}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.13, 0.6, 7]} />
        <meshToonMaterial color="#8a5a3c" />
        <Outlines thickness={0.03} color={INK} />
      </mesh>
      {round ? (
        <>
          <Ball position={[0, 1.05, 0]} r={0.7} color="#3aa86b" outline={0.035} />
          <Ball position={[0.35, 1.5, 0.1]} r={0.42} color="#4cba7d" outline={0.035} />
        </>
      ) : (
        <>
          <mesh position={[0, 1.0, 0]}>
            <coneGeometry args={[0.6, 1.1, 7]} />
            <meshToonMaterial color="#2f8f5b" />
            <Outlines thickness={0.03} color={INK} />
          </mesh>
          <mesh position={[0, 1.65, 0]}>
            <coneGeometry args={[0.42, 0.8, 7]} />
            <meshToonMaterial color="#3aa86b" />
            <Outlines thickness={0.03} color={INK} />
          </mesh>
        </>
      )}
    </group>
  );
}

function Prism({ w, h, d, color }: { w: number; h: number; d: number; color: string }) {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2, 0);
    shape.lineTo(w / 2, 0);
    shape.lineTo(0, h);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false });
    g.translate(0, 0, -d / 2);
    return g;
  }, [w, h, d]);
  return (
    <mesh geometry={geo}>
      <meshToonMaterial color={color} />
      <Outlines thickness={0.03} color={INK} />
    </mesh>
  );
}

function Neighbour({ x, z, color, rot = 0 }: { x: number; z: number; color: string; rot?: number }) {
  return (
    <group position={[x, 0.12, z]} rotation={[0, rot, 0]}>
      <Clay position={[0, 0.7, 0]} args={[2.2, 1.4, 1.8]} color={color} />
      <Clay position={[-0.5, 0.8, 0.92]} args={[0.45, 0.5, 0.04]} color="#9fd7ea" outline={0.015} />
      <Clay position={[0.5, 0.8, 0.92]} args={[0.45, 0.5, 0.04]} color="#9fd7ea" outline={0.015} />
      <group position={[0, 1.4, 0]}>
        <Prism w={2.5} h={0.9} d={2.0} color="#46566a" />
      </group>
    </group>
  );
}

/** Fenster mit Rahmen, Sprossenkreuz und Sims. */
function Win({ position, w = 0.8, h = 0.9 }: { position: [number, number, number]; w?: number; h?: number }) {
  const [x, y, z] = position;
  return (
    <group position={[x, y, z]}>
      <Clay args={[w + 0.12, h + 0.12, 0.05]} color="#26404a" outline={0.015} />
      <Clay position={[0, 0, 0.03]} args={[w, h, 0.04]} color="#a8dcee" noOutline />
      <Clay position={[0, 0, 0.06]} args={[0.045, h, 0.03]} color="#26404a" noOutline />
      <Clay position={[0, 0, 0.06]} args={[w, 0.045, 0.03]} color="#26404a" noOutline />
      <Clay position={[0, -h / 2 - 0.1, 0.07]} args={[w + 0.24, 0.08, 0.16]} color="#f7f4ee" outline={0.015} />
    </group>
  );
}

function Car({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) {
  const wheels: [number, number, number][] = [
    [-0.5, 0.14, 0.4],
    [0.5, 0.14, 0.4],
    [-0.5, 0.14, -0.4],
    [0.5, 0.14, -0.4],
  ];
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      <Clay position={[0, 0.32, 0]} args={[1.55, 0.42, 0.78]} color="#ff7a59" outline={0.025} />
      <Clay position={[-0.05, 0.68, 0]} args={[0.85, 0.34, 0.68]} color="#ff9477" outline={0.025} />
      <Clay position={[-0.05, 0.68, 0.33]} args={[0.7, 0.2, 0.04]} color="#a8dcee" noOutline />
      <Clay position={[-0.05, 0.68, -0.33]} args={[0.7, 0.2, 0.04]} color="#a8dcee" noOutline />
      {wheels.map((w, i) => (
        <mesh key={i} position={w} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.12, 14]} />
          <meshToonMaterial color="#26404a" />
          <Outlines thickness={0.02} color={INK} />
        </mesh>
      ))}
    </group>
  );
}

function Lamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 1.8, 8]} />
        <meshToonMaterial color="#26404a" />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      <mesh position={[0.18, 1.82, 0]}>
        <sphereGeometry args={[0.16, 14, 14]} />
        <meshBasicMaterial color="#fff2b8" />
      </mesh>
    </group>
  );
}

function Fence({ from, to, z }: { from: number; to: number; z: number }) {
  const posts = useMemo(() => {
    const out: number[] = [];
    for (let x = from; x <= to + 0.001; x += 0.5) out.push(Number(x.toFixed(2)));
    return out;
  }, [from, to]);
  const len = to - from;
  return (
    <group position={[0, 0.12, z]}>
      <Clay position={[(from + to) / 2, 0.42, 0]} args={[len, 0.05, 0.04]} color="#f7f4ee" outline={0.012} />
      <Clay position={[(from + to) / 2, 0.2, 0]} args={[len, 0.05, 0.04]} color="#f7f4ee" outline={0.012} />
      {posts.map((x) => (
        <Clay key={x} position={[x, 0.27, 0]} args={[0.09, 0.54, 0.06]} color="#f7f4ee" outline={0.015} />
      ))}
    </group>
  );
}

function Cloud({ x, y, z, s = 1, speed = 0.12, span = 26 }: { x: number; y: number; z: number; s?: number; speed?: number; span?: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime * speed;
    g.current.position.x = ((((x + t + span / 2) % span) + span) % span) - span / 2;
    g.current.position.y = y + Math.sin(state.clock.elapsedTime * 0.4 + x) * 0.15;
  });
  return (
    <group ref={g} position={[x, y, z]} scale={s}>
      <Ball position={[0, 0, 0]} r={0.7} color="#dcecef" />
      <Ball position={[0.85, -0.1, 0.1]} r={0.55} color="#dcecef" />
      <Ball position={[-0.8, -0.15, -0.05]} r={0.5} color="#dcecef" />
    </group>
  );
}

function World({ progress }: { progress: MotionValue<number> }) {
  const { camera, size } = useThree();
  const root = useRef<THREE.Group>(null);
  const house = useRef<THREE.Group>(null);
  const roof = useRef<THREE.Group>(null);
  const neighbours = useRef<THREE.Group>(null);
  const pin = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const furniture = useRef<THREE.Group>(null);
  const pieces = useRef<(THREE.Object3D | null)[]>([]);
  const pv = useRef<THREE.MeshToonMaterial>(null);
  const sheen = useRef<THREE.Mesh>(null);
  const pump = useRef<THREE.MeshToonMaterial>(null);
  const fan = useRef<THREE.Mesh>(null);
  const wallMat = useRef<THREE.MeshToonMaterial>(null);
  const scan1 = useRef<THREE.Mesh>(null);
  const scan2 = useRef<THREE.Mesh>(null);
  const dims = useRef<THREE.Group>(null);
  const flow = useRef<(THREE.Mesh | null)[]>([]);
  const trees = useRef<THREE.Group>(null);
  const look = useRef(new THREE.Vector3(0, 1.2, 0));
  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(1.0, 3.35, 0.5),
        new THREE.Vector3(3.9, 3.0, 0.6),
        new THREE.Vector3(4.55, 1.0, 0.6),
      ),
    [],
  );

  useFrame((state, dt) => {
    const p = clamp(progress.get());
    const t = state.clock.elapsedTime;
    const narrow = size.width < size.height * 0.95;

    // Einstieg: das Modell baut sich in knapp zwei Sekunden auf
    const intro = smooth(0.15, 1.9, t);

    const lage = band(0.1, 0.2, 0.3, 0.36, p);
    const subst = band(0.3, 0.38, 0.5, 0.56, p);
    const technik = band(0.5, 0.58, 0.7, 0.76, p);
    const wohn = band(0.7, 0.78, 0.9, 0.96, p);
    const nb = smooth(0.1, 0.22, p);

    const s = sample(p);
    const k = narrow ? 3.1 : 1.85;
    let tx = s.look[0] + (s.pos[0] - s.look[0]) * k;
    let ty = s.look[1] + (s.pos[1] - s.look[1]) * k;
    const tz = s.look[2] + (s.pos[2] - s.look[2]) * k;
    // Leichte Mausbewegung auf dem Laptop; auf dem Handy bleibt die Kamera ruhig
    if (!narrow) {
      tx += state.pointer.x * 0.9;
      ty += state.pointer.y * 0.5;
    }
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 2.6, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 2.6, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tz, 2.6, dt);
    look.current.x = THREE.MathUtils.damp(look.current.x, s.look[0], 2.6, dt);
    look.current.y = THREE.MathUtils.damp(look.current.y, s.look[1] - (narrow ? 4.2 : 0), 2.6, dt);
    look.current.z = THREE.MathUtils.damp(look.current.z, s.look[2], 2.6, dt);
    camera.lookAt(look.current);

    // Konturen bleiben bei jeder Distanz gleich fein
    outlineScale.v = clamp(camera.position.distanceTo(look.current) / 22, 0.55, 1.6);

    if (root.current) {
      const shift = narrow ? 0 : s.shift;
      root.current.position.x = THREE.MathUtils.damp(root.current.position.x, shift, 2.4, dt);
      root.current.scale.setScalar(0.86 + 0.14 * settle(intro));
      root.current.position.y = -(1 - intro) * 1.2;
    }
    if (house.current) {
      const target = -0.3 + p * 0.6 + Math.sin(t * 0.35) * 0.04 - (1 - intro) * 0.9;
      house.current.rotation.y = THREE.MathUtils.damp(house.current.rotation.y, target, 2.2, dt);
    }
    if (roof.current) {
      const ty2 = 2.2 + wohn * 1.6 + (1 - settle(smooth(0.5, 1.7, t))) * 3.4;
      roof.current.position.y = THREE.MathUtils.damp(roof.current.position.y, ty2, 4, dt);
      roof.current.position.z = THREE.MathUtils.damp(roof.current.position.z, -wohn * 5.4, 3.2, dt);
    }
    if (neighbours.current) neighbours.current.scale.setScalar(0.001 + nb * 0.999);
    if (trees.current) trees.current.scale.setScalar(0.001 + smooth(0.6, 1.8, t) * 0.999);

    // Lage: Markierung federt ein, zwei versetzte Wellen strahlen vom Grundstück ab
    if (pin.current) {
      pin.current.scale.setScalar(settle(lage) + 0.0001);
      pin.current.position.y = 4.3 + Math.sin(t * 2.2) * 0.16;
    }
    [ring1.current, ring2.current].forEach((ring, i) => {
      if (!ring) return;
      const pulse = (t * 0.55 + i * 0.5) % 1;
      ring.scale.setScalar(0.4 + pulse * 4.2);
      (ring.material as THREE.MeshBasicMaterial).opacity = lage * (1 - pulse) * 0.85;
    });

    // Substanz: zwei Scan-Balken wandern über die Fassade, Wand glimmt
    if (wallMat.current) {
      wallMat.current.transparent = true;
      wallMat.current.opacity = 1 - wohn * 0.7;
      wallMat.current.emissive.set(YELLOW);
      wallMat.current.emissiveIntensity = subst * 0.22;
    }
    [scan1.current, scan2.current].forEach((bar, i) => {
      if (!bar) return;
      const m = bar.material as THREE.MeshBasicMaterial;
      const u = (t * 0.5 + i * 0.12) % 1;
      m.opacity = subst * (i === 0 ? 0.6 : 0.25) * Math.sin(Math.PI * u);
      bar.position.y = 0.15 + u * 2.1;
    });

    // Technik: Solarfläche glüht, Lichtreflex läuft darüber, Energie fließt zur Wärmepumpe
    if (pv.current) {
      pv.current.emissive.set("#4f8dff");
      pv.current.emissiveIntensity = technik * (0.75 + Math.sin(t * 3) * 0.12);
    }
    if (sheen.current) {
      const m = sheen.current.material as THREE.MeshBasicMaterial;
      m.opacity = technik * 0.55;
      sheen.current.position.x = -0.8 + ((t * 0.55) % 1) * 1.6;
    }
    if (pump.current) {
      pump.current.emissive.set("#7be0ff");
      pump.current.emissiveIntensity = technik * (0.45 + Math.sin(t * 5) * 0.15);
    }
    if (fan.current) fan.current.rotation.x += dt * (1 + technik * 9);
    flow.current.forEach((dot, i) => {
      if (!dot) return;
      const u = (t * 0.45 + i / 7) % 1;
      curve.getPoint(u, dot.position);
      dot.scale.setScalar(technik * 0.1 * Math.sin(Math.PI * u) + 0.0001);
    });

    // Wohnfläche: Möbel kommen nacheinander, Maßlinien zeichnen sich
    pieces.current.forEach((piece, i) => {
      if (!piece) return;
      const local = smooth(0.05 + i * 0.11, 0.42 + i * 0.11, wohn);
      piece.scale.setScalar(0.001 + settle(local) * 0.999);
    });
    if (furniture.current) furniture.current.visible = wohn > 0.01;
    if (dims.current) {
      dims.current.scale.set(0.001 + smooth(0.1, 0.8, wohn), 1, 1);
      dims.current.visible = wohn > 0.01;
    }
  });

  const setPiece = (i: number) => (el: THREE.Object3D | null) => {
    pieces.current[i] = el;
  };
  const setFlow = (i: number) => (el: THREE.Mesh | null) => {
    flow.current[i] = el;
  };
  const tableLegs: [number, number][] = [
    [-0.33, -0.2],
    [0.33, -0.2],
    [-0.33, 0.2],
    [0.33, 0.2],
  ];

  return (
    <group ref={root}>
      {/* Wolken */}
      <Cloud x={2} y={9.6} z={-9} s={1.5} speed={0.08} span={18} />
      <Cloud x={9} y={8.4} z={-8} s={1.0} speed={0.11} span={18} />

      {/* Grundstück als Modellplatte */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[11, 0.6, 8]} />
        <meshToonMaterial color="#8a5a3c" />
        <Outlines thickness={0.035} color={INK} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[11.02, 0.12, 8.02]} />
        <meshToonMaterial color="#79c455" />
        <Outlines thickness={0.03} color={INK} />
      </mesh>
      {/* Straße */}
      <Clay position={[0, 0.16, 3.3]} args={[11.02, 0.08, 1.4]} color="#4b5863" outline={0.015} />
      <Clay position={[-1.5, 0.22, 3.3]} args={[0.9, 0.04, 0.1]} color={YELLOW} noOutline />
      <Clay position={[1.8, 0.22, 3.3]} args={[0.9, 0.04, 0.1]} color={YELLOW} noOutline />
      <Clay position={[-4.4, 0.22, 3.3]} args={[0.9, 0.04, 0.1]} color={YELLOW} noOutline />
      <Lamp position={[-3.4, 0.2, 2.55]} />
      <Fence from={-5} to={-0.6} z={2.2} />

      {/* Bepflanzung vor dem Haus */}
      <Ball position={[-2.4, 0.4, 1.9]} r={0.38} color="#4cba7d" />
      <Ball position={[-1.9, 0.36, 2.0]} r={0.3} color="#3aa86b" />
      <Ball position={[0.9, 0.36, 1.75]} r={0.3} color="#4cba7d" />
      <Ball position={[-2.15, 0.62, 1.95]} r={0.16} color="#ff7a59" outline={0.015} />
      <Ball position={[0.95, 0.58, 1.78]} r={0.14} color={YELLOW} outline={0.015} />

      <group ref={house} position={[-1.0, 0.12, 0]}>
        {/* Wände als vier dünne Platten, damit das Innere sichtbar wird */}
        <Clay position={[0, 1.1, 1.44]} args={[4, 2.2, 0.12]} color={WALL} matRef={wallMat} />
        <Clay position={[0, 1.1, -1.44]} args={[4, 2.2, 0.12]} color={WALL} />
        <Clay position={[-1.94, 1.1, 0]} args={[0.12, 2.2, 3]} color={WALL} />
        <Clay position={[1.94, 1.1, 0]} args={[0.12, 2.2, 3]} color={WALL} />
        {/* Sockel */}
        <Clay position={[0, 0.12, 1.5]} args={[4.1, 0.24, 0.1]} color="#cfc7b8" outline={0.018} />
        {/* Scan-Balken */}
        <mesh ref={scan1} position={[0, 0.1, 1.53]}>
          <boxGeometry args={[4.1, 0.1, 0.04]} />
          <meshBasicMaterial color={YELLOW} transparent opacity={0} depthWrite={false} />
        </mesh>
        <mesh ref={scan2} position={[0, 0.1, 1.53]}>
          <boxGeometry args={[4.1, 0.34, 0.03]} />
          <meshBasicMaterial color={YELLOW} transparent opacity={0} depthWrite={false} />
        </mesh>
        {/* Fenster, Tür */}
        <Win position={[-1.2, 1.35, 1.52]} />
        <Win position={[0.05, 1.35, 1.52]} />
        <Clay position={[1.3, 0.95, 1.52]} args={[0.78, 1.7, 0.07]} color="#26404a" outline={0.02} />
        <mesh position={[1.55, 0.92, 1.58]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color={YELLOW} />
        </mesh>
        <Clay position={[1.3, 0.05, 1.7]} args={[1.0, 0.1, 0.4]} color="#cfd5d9" outline={0.015} />
        <Win position={[-2.03, 1.3, 0.2]} w={0.7} h={0.8} />

        {/* Boden und Einrichtung (sichtbar, wenn das Dach abgehoben ist) */}
        <Clay position={[0, 0.1, 0]} args={[3.8, 0.1, 2.8]} color="#e0a96a" outline={0.02} />
        <group ref={furniture} position={[0, 0.15, 0]} visible={false}>
          <group ref={setPiece(0)} position={[-1.0, 0, 0.2]}>
            <Clay position={[0, 0.25, 0]} args={[1.3, 0.4, 0.6]} color="#ff7a59" outline={0.02} />
            <Clay position={[0, 0.55, -0.22]} args={[1.3, 0.35, 0.16]} color="#ff7a59" outline={0.02} />
            <Clay position={[-0.55, 0.42, 0]} args={[0.2, 0.2, 0.6]} color="#ff9477" outline={0.015} />
            <Clay position={[0.55, 0.42, 0]} args={[0.2, 0.2, 0.6]} color="#ff9477" outline={0.015} />
          </group>
          <group ref={setPiece(1)} position={[0.1, 0, 0.45]}>
            <Clay position={[0, 0.2, 0]} args={[0.8, 0.08, 0.5]} color="#f4f0e6" outline={0.02} />
            {tableLegs.map(([x, z], i) => (
              <Clay key={i} position={[x, 0.09, z]} args={[0.06, 0.18, 0.06]} color="#f4f0e6" noOutline />
            ))}
          </group>
          <group ref={setPiece(2)} position={[1.2, 0, -1.0]}>
            <Clay position={[0, 0.4, 0]} args={[1.2, 0.8, 0.5]} color="#26404a" outline={0.02} />
            <Clay position={[0, 0.82, 0]} args={[1.24, 0.05, 0.54]} color="#f4f0e6" outline={0.015} />
            <Clay position={[-0.3, 0.55, 0.26]} args={[0.35, 0.3, 0.02]} color="#4b6a74" noOutline />
          </group>
          <group ref={setPiece(3)} position={[0.9, 0, 0.45]}>
            <Clay position={[0, 0.17, 0]} args={[0.5, 0.35, 0.5]} color="#7be0ff" outline={0.02} />
            <Ball position={[0, 0.5, 0]} r={0.2} color="#3aa86b" outline={0.015} />
          </group>
          <group ref={setPiece(4)} position={[-0.1, 0, -0.9]}>
            <Clay position={[0, 0.35, 0]} args={[0.12, 0.7, 1.0]} color={WALL} outline={0.02} />
          </group>
        </group>

        {/* Maßlinie (Wohnfläche) */}
        <group ref={dims} position={[0, 0.4, 2.0]} visible={false}>
          <Clay args={[3.8, 0.035, 0.035]} color={YELLOW} noOutline />
          <Clay position={[-1.9, 0, 0]} args={[0.035, 0.28, 0.035]} color={YELLOW} noOutline />
          <Clay position={[1.9, 0, 0]} args={[0.035, 0.28, 0.035]} color={YELLOW} noOutline />
        </group>

        {/* Dach: Firstkappe, Schornstein, Photovoltaik */}
        <group ref={roof} position={[0, 2.2 + 3.4, 0]}>
          <Prism w={4.7} h={1.7} d={3.5} color={SLATE} />
          <Clay position={[0, 1.7, 0]} args={[0.14, 0.09, 3.56]} color="#26343f" outline={0.015} />
          <Clay position={[-1.0, 1.05, 0.6]} args={[0.34, 0.9, 0.34]} color="#d9d2c5" outline={0.02} />
          <Clay position={[-1.0, 1.54, 0.6]} args={[0.44, 0.1, 0.44]} color="#26343f" outline={0.015} />
          <group position={[0.9, 1.1, 0]} rotation={[0, 0, -Math.atan(1.7 / 2.35)]}>
            <mesh>
              <boxGeometry args={[1.9, 0.07, 2.7]} />
              <meshToonMaterial ref={pv} color="#2a5bd7" />
              <Outlines thickness={0.025} color={INK} />
            </mesh>
            {[-0.63, 0, 0.63].map((x) => (
              <Clay key={x} position={[x, 0.045, 0]} args={[0.025, 0.012, 2.6]} color="#163a8f" noOutline />
            ))}
            {[-0.9, -0.3, 0.3, 0.9].map((z) => (
              <Clay key={z} position={[0, 0.045, z]} args={[1.85, 0.012, 0.025]} color="#163a8f" noOutline />
            ))}
            <mesh ref={sheen} position={[-0.8, 0.055, 0]}>
              <boxGeometry args={[0.16, 0.012, 2.6]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
            </mesh>
          </group>
        </group>

        {/* Einfahrt, Gehweg und Auto */}
        <Clay position={[3.1, 0.08, 2.35]} args={[2.0, 0.08, 2.3]} color="#d4dade" outline={0.015} />
        {[0, 1, 2, 3].map((i) => (
          <Clay key={i} position={[1.3 - i * 0.12, 0.05, 1.85 + i * 0.32]} args={[0.6, 0.06, 0.24]} color="#cfd5d9" outline={0.012} />
        ))}
        <Car position={[3.1, 0.12, 2.75]} rotY={Math.PI / 2} />

        {/* Garage */}
        <group position={[3.3, 0, 0.6]}>
          <Clay position={[0, 0.75, 0]} args={[2.0, 1.5, 2.6]} color={WALL} />
          <Clay position={[0, 1.55, 0]} args={[2.25, 0.14, 2.85]} color="#46566a" outline={0.02} />
          <Clay position={[0, 0.65, 1.32]} args={[1.5, 1.3, 0.05]} color="#26404a" outline={0.02} />
          {[0.25, 0.55, 0.85, 1.15].map((y) => (
            <Clay key={y} position={[0, y, 1.355]} args={[1.46, 0.025, 0.02]} color="#3f6070" noOutline />
          ))}
        </group>

        {/* Wärmepumpe mit Lüfter, an der Außenwand der Garage */}
        <group position={[4.47, 0.55, 0.6]}>
          <mesh>
            <boxGeometry args={[0.32, 0.6, 0.7]} />
            <meshToonMaterial ref={pump} color="#dfe6ea" />
            <Outlines thickness={0.025} color={INK} />
          </mesh>
          <mesh position={[0.17, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.2, 0.025, 8, 24]} />
            <meshToonMaterial color="#26404a" />
          </mesh>
          <mesh ref={fan} position={[0.175, 0.05, 0]}>
            <boxGeometry args={[0.01, 0.34, 0.05]} />
            <meshToonMaterial color="#26404a" />
          </mesh>
        </group>
        {/* Energiefluss von den Modulen zur Wärmepumpe */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <mesh key={i} ref={setFlow(i)} scale={0.0001}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshBasicMaterial color={YELLOW} />
          </mesh>
        ))}
      </group>

      {/* Bäume */}
      <group ref={trees}>
        <Tree x={-3.2} z={-0.2} s={1.0} />
        <Tree x={4.9} z={-1.3} round />
        <Tree x={-2.0} z={-3.2} s={0.9} round />
        <Tree x={2.4} z={-3.2} s={1.05} />
      </group>

      {/* Nachbarhäuser und Lage-Markierung */}
      <group ref={neighbours}>
        <Neighbour x={-4.2} z={-2.3} color="#e5d6c4" rot={0.12} />
        <Neighbour x={4.3} z={-2.5} color="#d4e2ea" rot={-0.1} />
        <Neighbour x={-4.4} z={1.3} color="#efd5cb" rot={-0.08} />
      </group>

      <group ref={pin} position={[-1.0, 4.3, 0]} scale={0.001}>
        <mesh position={[0, 0.25, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.38, 0.9, 16]} />
          <meshToonMaterial color={YELLOW} />
          <Outlines thickness={0.03} color={INK} />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.42, 20, 20]} />
          <meshToonMaterial color={YELLOW} />
          <Outlines thickness={0.03} color={INK} />
        </mesh>
        <mesh position={[0, 0.85, 0.34]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshBasicMaterial color={INK} />
        </mesh>
      </group>
      <mesh ref={ring1} position={[-1.0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1, 56]} />
        <meshBasicMaterial color={YELLOW} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh ref={ring2} position={[-1.0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1, 56]} />
        <meshBasicMaterial color={YELLOW} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <mesh position={[0.25, -0.66, 0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11.6, 8.6]} />
        <meshBasicMaterial color="#04181d" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

export default function HouseScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 32, position: [6.5, 4.4, 9.5], near: 0.1, far: 90 }}
      aria-hidden
    >
      <hemisphereLight args={["#ffffff", "#7aa0a8", 1.1]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[7, 11, 6]} intensity={2.4} />
      <directionalLight position={[-6, 4, -4]} intensity={0.6} color="#9fe3ff" />
      <World progress={progress} />
    </Canvas>
  );
}
