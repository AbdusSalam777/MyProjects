import React, { useEffect, useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import {
  scrollState,
  pointerState,
  prefersReducedMotion,
  isLowPowerDevice,
} from "../lib/motionState";

const VIOLET = "#6E5BFF";
const CYAN = "#22D3EE";
const FLAME = "#FF6B3D";
const BONE = "#EDECF2";
const MUTED = "#8B8B9B";
const GREEN = "#7EE787";

/* -------------------------------------------------------------------------- */
/*  Canvas textures                                                            */
/*                                                                            */
/*  Everything in this scene is drawn with the 2D canvas API and uploaded as a */
/*  texture. That keeps real, readable code in the hero without shipping a     */
/*  font atlas or fetching anything from a CDN.                                */
/* -------------------------------------------------------------------------- */

const MONO = '600 26px "JetBrains Mono", ui-monospace, Menlo, monospace';

/** The code shown on the editor panel, tokenised for syntax colours. */
const CODE_LINES = [
  [
    { t: "const", c: VIOLET },
    { t: " developer", c: BONE },
    { t: " = ", c: MUTED },
    { t: "{", c: FLAME },
  ],
  [
    { t: "  name", c: CYAN },
    { t: ": ", c: MUTED },
    { t: "'Abdus Salam'", c: GREEN },
    { t: ",", c: MUTED },
  ],
  [
    { t: "  stack", c: CYAN },
    { t: ": [", c: MUTED },
    { t: "'React'", c: GREEN },
    { t: ", ", c: MUTED },
    { t: "'Node'", c: GREEN },
    { t: ", ", c: MUTED },
    { t: "'Mongo'", c: GREEN },
    { t: "],", c: MUTED },
  ],
  [
    { t: "  available", c: CYAN },
    { t: ": ", c: MUTED },
    { t: "true", c: FLAME },
    { t: ",", c: MUTED },
  ],
  [
    { t: "  ship", c: CYAN },
    { t: ": () ", c: MUTED },
    { t: "=>", c: VIOLET },
    { t: " deploy(", c: BONE },
    { t: "'on time'", c: GREEN },
    { t: "),", c: MUTED },
  ],
  [{ t: "}", c: FLAME }],
];

function roundRect(ctx, x, y, w, h, r) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Draws a syntax-highlighted editor window. */
function makeEditorTexture() {
  const w = 1024;
  const h = 660;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  // Body
  ctx.fillStyle = "#0b0b13";
  roundRect(ctx, 0, 0, w, h, 26);
  ctx.fill();

  // Border
  ctx.strokeStyle = "rgba(110,91,255,0.45)";
  ctx.lineWidth = 3;
  roundRect(ctx, 1.5, 1.5, w - 3, h - 3, 26);
  ctx.stroke();

  // Title bar
  ctx.fillStyle = "#12121c";
  roundRect(ctx, 1.5, 1.5, w - 3, 64, 26);
  ctx.fill();
  ctx.fillStyle = "#12121c";
  ctx.fillRect(1.5, 40, w - 3, 26);

  // Traffic lights
  [
    ["#FF5F57", 40],
    ["#FEBC2E", 70],
    ["#28C840", 100],
  ].forEach(([colour, x]) => {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(x, 33, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Filename
  ctx.font = '500 22px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillStyle = MUTED;
  ctx.textBaseline = "middle";
  ctx.fillText("developer.js", 140, 34);

  // Gutter
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  ctx.fillRect(1.5, 66, 72, h - 68);

  // Code
  ctx.font = MONO;
  ctx.textBaseline = "middle";
  const startY = 118;
  const lineHeight = 52;

  CODE_LINES.forEach((tokens, i) => {
    const y = startY + i * lineHeight;

    // Line number
    ctx.fillStyle = "rgba(139,139,155,0.5)";
    ctx.font = '400 20px "JetBrains Mono", ui-monospace, monospace';
    ctx.fillText(String(i + 1), 30, y);

    // Tokens
    ctx.font = MONO;
    let x = 96;
    tokens.forEach((token) => {
      ctx.fillStyle = token.c;
      ctx.fillText(token.t, x, y);
      x += ctx.measureText(token.t).width;
    });

    // Caret on the last line
    if (i === CODE_LINES.length - 1) {
      ctx.fillStyle = CYAN;
      ctx.fillRect(x + 6, y - 17, 3, 34);
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Draws a single glowing code symbol. */
function makeSymbolTexture(symbol, colour) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.font = 'bold 120px "JetBrains Mono", ui-monospace, Menlo, monospace';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Glow, then a crisp pass on top.
  ctx.shadowColor = colour;
  ctx.shadowBlur = 34;
  ctx.fillStyle = colour;
  ctx.fillText(symbol, size / 2, size / 2 + 4);
  ctx.shadowBlur = 0;
  ctx.fillText(symbol, size / 2, size / 2 + 4);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/* -------------------------------------------------------------------------- */
/*  Scene pieces                                                               */
/* -------------------------------------------------------------------------- */

/** The editor panel, plus a wireframe cage suggesting structure behind it. */
function CodePanel({ animate }) {
  const group = useRef();
  const cage = useRef();

  const texture = useMemo(() => makeEditorTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;

    // Follow the pointer, damped.
    const targetY = pointerState.x * 0.34;
    const targetX = pointerState.y * 0.22;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      3,
      dt
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      3,
      dt
    );

    // Idle bob
    if (animate) {
      group.current.position.y = Math.sin(t * 0.6) * 0.09;
      if (cage.current) {
        cage.current.rotation.y = t * 0.12;
        cage.current.rotation.x = t * 0.06;
      }
    }

    // Scroll pushes the panel away.
    const p = scrollState.heroProgress;
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      -p * 3.5,
      4,
      dt
    );
    const s = 1 - p * 0.18;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 4, dt));
  });

  return (
    <group ref={group}>
      {/* Wireframe cage */}
      <mesh ref={cage} position={[0, 0, -1.4]}>
        <icosahedronGeometry args={[2.6, 1]} />
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.14} />
      </mesh>

      {/* Glow behind the panel */}
      <mesh position={[0, 0, -0.06]} scale={1.06}>
        <planeGeometry args={[4.5, 2.9]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.18} />
      </mesh>

      {/* Editor */}
      <mesh>
        <planeGeometry args={[4.5, 2.9]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

const SYMBOLS = [
  { s: "</>", c: CYAN, pos: [-3.6, 1.5, 0.6], scale: 0.95 },
  { s: "{ }", c: VIOLET, pos: [3.5, 1.7, 0.2], scale: 0.85 },
  { s: "=>", c: FLAME, pos: [3.9, -1.3, 0.8], scale: 0.7 },
  { s: "( )", c: CYAN, pos: [-3.9, -1.5, 0.3], scale: 0.7 },
  { s: "[ ]", c: GREEN, pos: [-2.9, -0.2, -1.6], scale: 0.6 },
  { s: ";", c: FLAME, pos: [2.6, 0.4, -1.8], scale: 0.55 },
  { s: "&&", c: VIOLET, pos: [-2.2, 2.3, -1.2], scale: 0.55 },
  { s: "//", c: MUTED, pos: [2.1, -2.2, -1.0], scale: 0.5 },
];

/** Code symbols drifting around the panel. Sprites so they always face front. */
function FloatingSymbols({ animate }) {
  const textures = useMemo(
    () => SYMBOLS.map((item) => makeSymbolTexture(item.s, item.c)),
    []
  );
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);

  return SYMBOLS.map((item, i) => (
    <Float
      key={item.s}
      speed={animate ? 1.5 + (i % 3) * 0.3 : 0}
      rotationIntensity={0}
      floatIntensity={animate ? 1.4 : 0}
    >
      <sprite position={item.pos} scale={item.scale}>
        <spriteMaterial
          map={textures[i]}
          transparent
          depthWrite={false}
          opacity={0.9}
          toneMapped={false}
        />
      </sprite>
    </Float>
  ));
}

/** Binary/hex dust for depth. */
function Dust({ count, animate }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current || !animate) return;
    ref.current.rotation.y += Math.min(delta, 0.1) * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#9D8FFF"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */

export default function HeroScene() {
  const reduced = useMemo(() => prefersReducedMotion(), []);
  const lowPower = useMemo(() => isLowPowerDevice(), []);

  const animate = !reduced;
  const dustCount = lowPower ? 120 : 380;

  return (
    <Canvas
      frameloop={reduced ? "demand" : "always"}
      dpr={[1, lowPower ? 1.5 : 2]}
      camera={{ position: [0, 0, 6.4], fov: 45 }}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[-5, -2, 4]} intensity={20} color={CYAN} distance={16} />
        <pointLight position={[5, 3, 2]} intensity={16} color={FLAME} distance={16} />

        <CodePanel animate={animate} />
        {!lowPower && <FloatingSymbols animate={animate} />}
        <Dust count={dustCount} animate={animate} />
      </Suspense>
    </Canvas>
  );
}
