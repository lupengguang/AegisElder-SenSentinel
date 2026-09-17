import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';

/* 环形扫描线 —— 三层旋转环 */
export function ScanRings() {
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();

  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.4;
    if (r2.current) r2.current.rotation.z -= delta * 0.25;
    if (r3.current) r3.current.rotation.z += delta * 0.55;
  });

  const ringPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * 4.2, 0, Math.sin(a) * 4.2));
    }
    return pts;
  }, []);

  const ringPoints2 = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * 5, 0, Math.sin(a) * 5));
    }
    return pts;
  }, []);

  const ringPoints3 = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * 3.5, 0, Math.sin(a) * 3.5));
    }
    return pts;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      <group ref={r1} rotation={[Math.PI / 2, 0, 0]}>
        <Line points={ringPoints} color="#22d3ee" lineWidth={1.2} transparent opacity={0.45} />
      </group>
      <group ref={r2} rotation={[Math.PI / 2, 0, 0]}>
        <Line points={ringPoints2} color="#7c3aed" lineWidth={1} transparent opacity={0.35} />
      </group>
      <group ref={r3} rotation={[Math.PI / 2, 0, 0]}>
        <Line points={ringPoints3} color="#22d3ee" lineWidth={0.8} transparent opacity={0.5} dashed dashSize={0.08} gapSize={0.12} />
      </group>
    </group>
  );
}

/* 轨道粒子 —— 沿圆环分布的数据节点 */
export function OrbitalParticles() {
  const groupRef = useRef();
  const count = 32;
  const nodes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 4.2 + (i % 3) * 0.3;
      const speed = 0.2 + (i % 5) * 0.05;
      return {
        angle,
        radius,
        speed,
        y: (i % 4) * 0.4 - 0.6,
        scale: 0.04 + (i % 3) * 0.02,
        color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#7c3aed' : '#fbbf24',
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const n = nodes[i];
      const a = n.angle + t * n.speed;
      child.position.set(Math.cos(a) * n.radius, n.y + Math.sin(t * 0.8 + i) * 0.1, Math.sin(a) * n.radius);
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i}>
          <sphereGeometry args={[n.scale, 12, 12]} />
          <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={2.5} />
        </mesh>
      ))}
    </group>
  );
}

/* 技术标注 —— 半透明引线 + 标签（AegisEdge A15 · 10 层）*/
export function TechAnnotations({ hoveredLayer, selectedLayer }) {
  const annotations = [
    { idx: 0, label: 'HEAT SPREADER', desc: '银色拉丝金属散热顶盖', pos: [3.4, 1.6, 0], anchor: [2, 0.4, 0] },
    { idx: 1, label: 'THERMAL INTERFACE', desc: '蓝色半透明导热层', pos: [-3.6, 1.2, 0], anchor: [-1.8, 0.28, 0] },
    { idx: 2, label: 'PACKAGE SUBSTRATE', desc: '深蓝黑封装基板 · 走线网格', pos: [3.6, 0.85, 0], anchor: [1.8, 0.16, 0] },
    { idx: 3, label: 'AI COMPUTE CORE', desc: '矩阵式计算单元阵列', pos: [-3.8, 0.4, 0], anchor: [-1.7, 0.02, 0] },
    { idx: 4, label: 'HBM STACKS', desc: '多层高带宽显存堆叠', pos: [3.6, 0, 0], anchor: [1.5, -0.12, 0] },
    { idx: 5, label: 'INTERCONNECT BUS', desc: '高速互连总线', pos: [-3.8, -0.4, 0], anchor: [-1.7, -0.26, 0] },
    { idx: 6, label: 'SENSOR MODULE', desc: '视觉/语音/姿态传感器接口', pos: [3.6, -0.8, 0], anchor: [1.5, -0.4, 0] },
    { idx: 7, label: 'SAFETY ISLAND', desc: '独立安全控制区 · 金色边框', pos: [-3.8, -1.2, 0], anchor: [-1.5, -0.52, 0] },
    { idx: 8, label: 'SILICON BASE', desc: '深灰硅基底 · 晶体纹理', pos: [3.6, -1.6, 0], anchor: [1.4, -0.62, 0] },
    { idx: 9, label: 'GOLD CONTACTS', desc: '底部金色触点阵列', pos: [-3.6, -2.0, 0], anchor: [-1.4, -0.8, 0] },
  ];

  return (
    <group>
      {annotations.map((a) => {
        const isActive = hoveredLayer === a.idx || selectedLayer === a.idx;
        return (
          <group key={a.idx}>
            <Line
              points={[new THREE.Vector3(...a.anchor), new THREE.Vector3(...a.pos)]}
              color={isActive ? '#22d3ee' : '#475569'}
              lineWidth={isActive ? 1.5 : 0.8}
              transparent
              opacity={isActive ? 0.9 : 0.45}
            />
            <Billboard position={a.pos}>
              <Text
                fontSize={0.12}
                color={isActive ? '#22d3ee' : '#94a3b8'}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.004}
                outlineColor="#000"
              >
                {a.label}
              </Text>
              <Text
                position={[0, -0.16, 0]}
                fontSize={0.075}
                color="#64748b"
                anchorX="center"
                anchorY="middle"
              >
                {a.desc}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
}

/* 顶部环境光柱 */
export function AmbientBeams() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });
  return (
    <group ref={ref}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[Math.cos((i / 4) * Math.PI * 2) * 3, 1.5, Math.sin((i / 4) * Math.PI * 2) * 3]} rotation={[0, (i / 4) * Math.PI * 2, 0]}>
          <planeGeometry args={[0.4, 3]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/* =================================================================
 * SignalFlow · 信号流向组件
 * 显示数据在 Compute Core ↔ HBM ↔ Sensor Module ↔ Safety Island
 * 之间流动的发光路径与粒子流
 * =================================================================
 */
export function SignalFlow({ visible = false }) {
  const groupRef = useRef();
  const particleRefs = useRef([]);

  // 信号回路节点（匹配 ChipModel 聚合状态坐标）
  const nodes = useMemo(() => [
    new THREE.Vector3(0, 0.05, 0),          // AI Compute Core
    new THREE.Vector3(1.18, -0.12, -0.84),   // HBM 右上堆栈
    new THREE.Vector3(1.3, -0.40, 0),       // Sensor 视觉接口
    new THREE.Vector3(0.75, -0.52, 0.75),   // Safety Island
    new THREE.Vector3(0, 0.05, 0),          // 回到 Compute Core
  ], []);

  const segColors = useMemo(() => ['#22d3ee', '#a78bfa', '#60a5fa', '#fbbf24'], []);

  // 计算各段长度与累计距离
  const segInfo = useMemo(() => {
    const info = [];
    let total = 0;
    for (let i = 0; i < nodes.length - 1; i++) {
      const len = nodes[i].distanceTo(nodes[i + 1]);
      info.push({ from: nodes[i], to: nodes[i + 1], len, startT: total, color: segColors[i] });
      total += len;
    }
    info.total = total;
    return info;
  }, [nodes, segColors]);

  // 流动粒子（每段分配多个）
  const particleCount = 16;

  useFrame((state) => {
    if (!visible || !segInfo.total) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < particleCount; i++) {
      const ref = particleRefs.current[i];
      if (!ref) continue;
      const phase = (t * 0.25 + i / particleCount) % 1;
      const dist = phase * segInfo.total;
      // 定位所在段
      let seg = segInfo[0];
      for (let s = 0; s < segInfo.length; s++) {
        if (dist >= segInfo[s].startT && dist <= segInfo[s].startT + segInfo[s].len) {
          seg = segInfo[s];
          break;
        }
      }
      const localT = (dist - seg.startT) / Math.max(seg.len, 0.0001);
      const pos = seg.from.clone().lerp(seg.to, localT);
      ref.position.copy(pos);
      // 颜色与发光
      if (ref.material) {
        ref.material.color.set(seg.color);
        ref.material.emissive.set(seg.color);
      }
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {/* 路径线段 */}
      {segInfo.map((s, i) => (
        <Line
          key={`seg-${i}`}
          points={[s.from, s.to]}
          color={s.color}
          lineWidth={2}
          transparent
          opacity={0.75}
        />
      ))}
      {/* 流动粒子 */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <mesh
          key={`p-${i}`}
          ref={(el) => (particleRefs.current[i] = el)}
        >
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshStandardMaterial
            color={segColors[i % segColors.length]}
            emissive={segColors[i % segColors.length]}
            emissiveIntensity={3.2}
          />
        </mesh>
      ))}
      {/* 节点高亮光晕 */}
      {nodes.slice(0, -1).map((n, i) => (
        <mesh key={`node-${i}`} position={n.toArray()}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color={segColors[i]}
            emissive={segColors[i]}
            emissiveIntensity={2.2}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}
    </group>
  );
}
