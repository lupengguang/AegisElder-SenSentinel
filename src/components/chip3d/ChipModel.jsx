import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* =================================================================
 * AegisEdge A15 · 人形机器人边缘 AI 芯片 3D 爆炸模型
 * 10 层立体封装结构（从顶盖到触点）
 * =================================================================

/* 工具：生成银色拉丝金属纹理（CanvasTexture）*/
function makeBrushedSteelTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  // 银色渐变基底
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#b8bcc4');
  grad.addColorStop(0.5, '#9ca3af');
  grad.addColorStop(1, '#8a8f99');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  // 拉丝细线（水平方向密布）
  for (let i = 0; i < 2400; i++) {
    const y = Math.random() * 512;
    const alpha = 0.04 + Math.random() * 0.14;
    const gray = 110 + Math.random() * 90;
    ctx.strokeStyle = `rgba(${gray},${gray},${gray},${alpha})`;
    ctx.lineWidth = 0.4 + Math.random() * 0.9;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y + (Math.random() - 0.5) * 3);
    ctx.stroke();
  }
  // 细微划痕高光
  for (let i = 0; i < 80; i++) {
    const y = Math.random() * 512;
    ctx.strokeStyle = `rgba(220,225,232,${0.05 + Math.random() * 0.08})`;
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y + (Math.random() - 0.5) * 2);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

/* 工具：生成硅基底晶体纹理 */
function makeSiliconCrystalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(0, 0, 512, 512);
  // 规则晶体网格
  ctx.strokeStyle = 'rgba(34,211,238,0.18)';
  ctx.lineWidth = 0.6;
  const step = 32;
  for (let i = 0; i <= 512; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  // 晶格节点高光
  ctx.fillStyle = 'rgba(34,211,238,0.35)';
  for (let i = 0; i <= 512; i += step) {
    for (let j = 0; j <= 512; j += step) {
      ctx.beginPath();
      ctx.arc(i, j, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  // 散布晶团
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 2 + Math.random() * 4;
    ctx.fillStyle = `rgba(96,165,250,${0.05 + Math.random() * 0.1})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/* 工具：生成封装基板电路走线纹理 */
function makeSubstrateCircuitTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0a1228';
  ctx.fillRect(0, 0, 512, 512);
  // 细密电路走线
  ctx.strokeStyle = 'rgba(96,165,250,0.25)';
  ctx.lineWidth = 0.8;
  // 横向走线
  for (let i = 0; i < 24; i++) {
    const y = (i / 24) * 512 + Math.random() * 8;
    ctx.beginPath();
    ctx.moveTo(0, y);
    // 折线走线
    let x = 0;
    while (x < 512) {
      const nx = x + 20 + Math.random() * 40;
      const ny = y + (Math.random() - 0.5) * 30;
      ctx.lineTo(nx, ny);
      x = nx;
    }
    ctx.stroke();
  }
  // 纵向走线
  for (let i = 0; i < 24; i++) {
    const x = (i / 24) * 512 + Math.random() * 8;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    let y = 0;
    while (y < 512) {
      const nx = x + (Math.random() - 0.5) * 30;
      const ny = y + 20 + Math.random() * 40;
      ctx.lineTo(nx, ny);
      y = ny;
    }
    ctx.stroke();
  }
  // 焊盘节点
  ctx.fillStyle = 'rgba(251,191,36,0.4)';
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
  // 细密网格
  ctx.strokeStyle = 'rgba(96,165,250,0.08)';
  ctx.lineWidth = 0.3;
  for (let i = 0; i <= 512; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/* 通用层壳：可悬停高亮、可爆炸位移、可选发光边框 */
function LayerShell({
  position,
  size,
  thickness,
  color,
  emissive,
  emissiveIntensity = 0.3,
  metalness = 0.6,
  roughness = 0.4,
  opacity = 1,
  transparent = false,
  map = null,
  emissiveMap = null,
  showEdges = false,
  edgeColor = '#22d3ee',
  edgeIntensity = 1.2,
  index,
  explodedY,
  hoveredLayer,
  setHoveredLayer,
  setSelectedLayer,
}) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = position[1] + explodedY;
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, target, Math.min(1, delta * 4));
    const lift = hoveredLayer === index ? 0.12 : 0;
    ref.current.position.y += lift;
  });

  const isHovered = hoveredLayer === index;
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(size[0], thickness, size[2])), [size[0], thickness, size[2]]);

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredLayer(index); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHoveredLayer(null); document.body.style.cursor = 'default'; }}
      onClick={(e) => { e.stopPropagation(); setSelectedLayer(index); }}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size[0], thickness, size[2]]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={isHovered ? emissiveIntensity * 2.2 : emissiveIntensity}
          emissiveMap={emissiveMap}
          metalness={metalness}
          roughness={roughness}
          transparent={transparent}
          opacity={opacity}
          map={map}
        />
      </mesh>
      {showEdges && (
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial
            color={edgeColor}
            transparent
            opacity={isHovered ? Math.min(1, edgeIntensity) : edgeIntensity * 0.55}
          />
        </lineSegments>
      )}
    </group>
  );
}

/* L3 · AI Compute Core：8x8 矩阵式计算单元阵列 + 青蓝色发光核群 */
function ComputeCoreArray({ y, size, hoveredLayer, setHoveredLayer, setSelectedLayer, index }) {
  const cells = useMemo(() => {
    const arr = [];
    const grid = 8;
    const spacing = size[0] / grid;
    const offset = size[0] / 2 - spacing / 2;
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        arr.push({ x: -offset + i * spacing, z: -offset + j * spacing, key: `${i}-${j}` });
      }
    }
    return arr;
  }, [size]);

  const groupRef = useRef();
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // 核心呼吸式发光
    groupRef.current.children.forEach((child, i) => {
      if (i === 0) return; // 跳过基底板
      const pulse = 0.8 + Math.sin(t * 1.5 + i * 0.15) * 0.3;
      child.material.emissiveIntensity = (hoveredLayer === index ? 2.8 : 1.4) * pulse;
    });
  });

  return (
    <group
      ref={groupRef}
      position={[0, y, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredLayer(index); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHoveredLayer(null); document.body.style.cursor = 'default'; }}
      onClick={(e) => { e.stopPropagation(); setSelectedLayer(index); }}
    >
      {/* 基底板 */}
      <mesh>
        <boxGeometry args={[size[0], 0.08, size[2]]} />
        <meshStandardMaterial color="#0a0a14" metalness={0.7} roughness={0.5} />
      </mesh>
      {/* 64 个发光核心 */}
      {cells.map((c) => (
        <mesh key={c.key} position={[c.x, 0.08, c.z]}>
          <boxGeometry args={[0.16, 0.06, 0.16]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#22d3ee"
            emissiveIntensity={1.4}
            metalness={0.3}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

/* L4 · HBM 多层堆叠：4 组多层清晰边缘和间距 */
function HBMStacks({ y, size, hoveredLayer, setHoveredLayer, setSelectedLayer, index }) {
  const layers = 6;
  const positions = useMemo(() => {
    const half = size[0] / 2 - 0.22;
    return [
      { x: -half, z: -half * 0.6, key: 'tl' },
      { x: half, z: -half * 0.6, key: 'tr' },
      { x: -half, z: half * 0.6, key: 'bl' },
      { x: half, z: half * 0.6, key: 'br' },
    ];
  }, [size]);

  const groupRef = useRef();
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, gi) => {
      child.children.forEach((layer, li) => {
        if (layer.material) {
          const pulse = 0.5 + Math.sin(t * 2 + gi * 0.5 + li * 0.3) * 0.2;
          layer.material.emissiveIntensity = (hoveredLayer === index ? 1.2 : 0.6) * pulse;
        }
      });
    });
  });

  return (
    <group
      ref={groupRef}
      position={[0, y, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredLayer(index); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHoveredLayer(null); document.body.style.cursor = 'default'; }}
      onClick={(e) => { e.stopPropagation(); setSelectedLayer(index); }}
    >
      {positions.map((p) => (
        <group key={p.key} position={[p.x, 0, p.z]}>
          {/* 堆栈基座 */}
          <mesh position={[0, -0.04, 0]}>
            <boxGeometry args={[0.42, 0.04, 0.22]} />
            <meshStandardMaterial color="#0a0a14" metalness={0.7} roughness={0.5} />
          </mesh>
          {/* 多层 HBM（清晰间距）*/}
          {Array.from({ length: layers }).map((_, l) => (
            <mesh key={l} position={[0, l * 0.08, 0]}>
              <boxGeometry args={[0.4, 0.05, 0.2]} />
              <meshStandardMaterial
                color="#1a1030"
                emissive="#7c3aed"
                emissiveIntensity={0.6}
                metalness={0.5}
                roughness={0.4}
              />
            </mesh>
          ))}
          {/* 堆栈顶部 TSV 通孔发光 */}
          <mesh position={[0, layers * 0.08 + 0.02, 0]}>
            <boxGeometry args={[0.36, 0.02, 0.18]} />
            <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* L5 · Interconnect Bus：连接 Compute Core ↔ HBM 的发光总线 */
function InterconnectBus({ y, size, hoveredLayer, setHoveredLayer, setSelectedLayer, index }) {
  const groupRef = useRef();
  // 4 条总线，从中心向 4 组 HBM 方向辐射
  const buses = useMemo(() => {
    const half = size[0] / 2 - 0.22;
    return [
      { from: [0, 0, 0], to: [-half, 0, -half * 0.6], key: 'tl' },
      { from: [0, 0, 0], to: [half, 0, -half * 0.6], key: 'tr' },
      { from: [0, 0, 0], to: [-half, 0, half * 0.6], key: 'bl' },
      { from: [0, 0, 0], to: [half, 0, half * 0.6], key: 'br' },
    ];
  }, [size]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      if (child.material) {
        const pulse = 1.2 + Math.sin(t * 3 + i * 0.7) * 0.6;
        child.material.emissiveIntensity = (hoveredLayer === index ? 2.4 : 1.2) * pulse;
      }
    });
  });

  return (
    <group
      ref={groupRef}
      position={[0, y, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredLayer(index); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHoveredLayer(null); document.body.style.cursor = 'default'; }}
      onClick={(e) => { e.stopPropagation(); setSelectedLayer(index); }}
    >
      {/* 互连基板 */}
      <mesh>
        <boxGeometry args={[size[0], 0.04, size[2]]} />
        <meshStandardMaterial color="#0a0a18" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* 4 条发光总线（细 boxGeometry）*/}
      {buses.map((b) => {
        const dx = b.to[0] - b.from[0];
        const dz = b.to[2] - b.from[2];
        const len = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dz, dx);
        return (
          <mesh
            key={b.key}
            position={[(b.from[0] + b.to[0]) / 2, 0.05, (b.from[2] + b.to[2]) / 2]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[len, 0.02, 0.04]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={1.2}
              metalness={0.3}
              roughness={0.2}
            />
          </mesh>
        );
      })}
      {/* 中心互连枢纽 */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.04, 16]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#22d3ee" emissiveIntensity={2} metalness={0.5} roughness={0.2} />
      </mesh>
      {/* 走线网格细节 */}
      {Array.from({ length: 10 }).map((_, i) => (
        <group key={i}>
          <mesh position={[0, 0.03, (i - 4.5) * 0.24]}>
            <boxGeometry args={[size[0] * 0.9, 0.008, 0.02]} />
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={hoveredLayer === index ? 1.5 : 0.5} />
          </mesh>
          <mesh position={[(i - 4.5) * 0.24, 0.03, 0]}>
            <boxGeometry args={[0.02, 0.008, size[2] * 0.9]} />
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={hoveredLayer === index ? 1.5 : 0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* L6 · Sensor Integration Module：4 个边缘传感器接口（Camera / Mic / IMU / LiDAR）*/
function SensorModule({ y, size, hoveredLayer, setHoveredLayer, setSelectedLayer, index }) {
  const sensors = useMemo(() => {
    const half = size[0] / 2 - 0.25;
    return [
      { x: -half, z: 0, color: '#22d3ee', label: 'CAM' },     // Camera 视觉
      { x: half, z: 0, color: '#a78bfa', label: 'MIC' },      // Microphone 语音
      { x: 0, z: -half, color: '#60a5fa', label: 'IMU' },     // IMU 姿态
      { x: 0, z: half, color: '#fbbf24', label: 'LIDAR' },    // LiDAR 距离
    ];
  }, [size]);

  const groupRef = useRef();
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      if (child.material) {
        const pulse = 0.8 + Math.sin(t * 2 + i * 1.2) * 0.4;
        child.material.emissiveIntensity = (hoveredLayer === index ? 2.4 : 1.2) * pulse;
      }
    });
  });

  return (
    <group
      ref={groupRef}
      position={[0, y, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredLayer(index); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHoveredLayer(null); document.body.style.cursor = 'default'; }}
      onClick={(e) => { e.stopPropagation(); setSelectedLayer(index); }}
    >
      {/* 传感器基板 */}
      <mesh>
        <boxGeometry args={[size[0], 0.05, size[2]]} />
        <meshStandardMaterial color="#0a1228" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* 4 个传感器模块 */}
      {sensors.map((s) => (
        <group key={s.label} position={[s.x, 0.05, s.z]}>
          {/* 模块主体 */}
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.32, 0.16, 0.32]} />
            <meshStandardMaterial
              color="#1e293b"
              emissive={s.color}
              emissiveIntensity={1.2}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* 传感器镜头/接口发光点 */}
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
            <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={2.5} />
          </mesh>
          {/* 接口引脚 */}
          {Array.from({ length: 4 }).map((_, p) => (
            <mesh key={p} position={[(p - 1.5) * 0.06, 0.02, 0.1]}>
              <cylinderGeometry args={[0.012, 0.012, 0.06, 6]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.18} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/* L7 · Safety Island：独立安全控制区，金色边框强调 */
function SafetyIsland({ y, size, hoveredLayer, setHoveredLayer, setSelectedLayer, index }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    // 安全岛呼吸式金色发光
    const t = performance.now() / 1000;
    ref.current.children.forEach((child) => {
      if (child.material && child.material.emissive) {
        const pulse = 0.6 + Math.sin(t * 1.2) * 0.3;
        child.material.emissiveIntensity = (hoveredLayer === index ? 2 : 1) * pulse;
      }
    });
  });

  // 金色边框几何
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.9, 0.1, 0.9)), []);

  return (
    <group
      ref={ref}
      position={[size[0] / 2 - 0.55, y, size[2] / 2 - 0.55]}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredLayer(index); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHoveredLayer(null); document.body.style.cursor = 'default'; }}
      onClick={(e) => { e.stopPropagation(); setSelectedLayer(index); }}
    >
      {/* 安全岛基板（深色填充）*/}
      <mesh>
        <boxGeometry args={[0.88, 0.08, 0.88]} />
        <meshStandardMaterial color="#1a1006" emissive="#92400e" emissiveIntensity={0.8} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* 金色边框 */}
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial color="#fbbf24" transparent opacity={hoveredLayer === index ? 1 : 0.85} />
      </lineSegments>
      {/* 安全岛核心处理器 */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#451a03" emissive="#fbbf24" emissiveIntensity={1.2} metalness={0.8} roughness={0.25} />
      </mesh>
      {/* 4 个监控节点 */}
      {[[0.25, 0.25], [-0.25, 0.25], [0.25, -0.25], [-0.25, -0.25]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.14, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.04, 8]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}

/* L9 · Gold Contacts：底部金色触点阵列 */
function GoldContacts({ y, size, hoveredLayer, setHoveredLayer, setSelectedLayer, index }) {
  const pins = useMemo(() => {
    const arr = [];
    const grid = 10;
    const spacing = size[0] / grid;
    const offset = size[0] / 2 - spacing / 2;
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        arr.push({ x: -offset + i * spacing, z: -offset + j * spacing });
      }
    }
    return arr;
  }, [size]);

  return (
    <group
      position={[0, y, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredLayer(index); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHoveredLayer(null); document.body.style.cursor = 'default'; }}
      onClick={(e) => { e.stopPropagation(); setSelectedLayer(index); }}
    >
      {/* 触点基板 */}
      <mesh>
        <boxGeometry args={[size[0], 0.04, size[2]]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* 100 个金色触点 */}
      {pins.map((p, i) => (
        <mesh key={i} position={[p.x, -0.06, p.z]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 6]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.95}
            roughness={0.18}
            emissive="#92400e"
            emissiveIntensity={hoveredLayer === index ? 0.4 : 0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

/* 整个 AegisEdge A15 芯片 3D 爆炸模型 */
export default function ChipModel({
  explodeFactor,
  hoveredLayer,
  setHoveredLayer,
  selectedLayer,
  setSelectedLayer,
}) {
  const groupRef = useRef();
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // 共享纹理
  const steelTex = useMemo(() => makeBrushedSteelTexture(), []);
  const siliconTex = useMemo(() => makeSiliconCrystalTexture(), []);
  const substrateTex = useMemo(() => makeSubstrateCircuitTexture(), []);

  const baseSize = [3.2, 1, 3.2];
  const spacing = 0.5;
  const e = explodeFactor;

  // 10 层基础 Y（聚合状态，从上到下）
  const baseY = [
    0.40,  // L0 Heat Spreader
    0.28,  // L1 Thermal Interface Layer
    0.16,  // L2 Package Substrate
    0.02,  // L3 AI Compute Core
    -0.12, // L4 HBM Stacks
    -0.26, // L5 Interconnect Bus
    -0.40, // L6 Sensor Module
    -0.52, // L7 Safety Island (与 L8 同层，放在一角)
    -0.62, // L8 Silicon Base
    -0.80, // L9 Gold Contacts
  ];

  // 各层爆炸位移（从上到下递增，L0 最高 L9 最低）
  const explodeOffset = [
    e * spacing * 4.5,  // L0
    e * spacing * 3.5,  // L1
    e * spacing * 2.5,  // L2
    e * spacing * 1.5,  // L3
    e * spacing * 0.5,  // L4
    -e * spacing * 0.5, // L5
    -e * spacing * 1.5, // L6
    -e * spacing * 1.5, // L7 (与 L6 同步，但放在一角)
    -e * spacing * 2.5, // L8
    -e * spacing * 3.5, // L9
  ];

  return (
    <group ref={groupRef}>
      {/* ============ L0 · Heat Spreader 银色拉丝金属散热顶盖 ============ */}
      <LayerShell
        index={0}
        position={[0, baseY[0], 0]}
        explodedY={explodeOffset[0]}
        size={baseSize}
        thickness={0.16}
        color="#9ca3af"
        emissive="#4b5563"
        emissiveIntensity={0.15}
        metalness={0.95}
        roughness={0.22}
        map={steelTex}
        showEdges
        edgeColor="#cbd5e1"
        edgeIntensity={0.6}
        hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer}
        setSelectedLayer={setSelectedLayer}
      />
      {/* 散热顶盖上的拉丝细节条 */}
      <group position={[0, baseY[0] + explodeOffset[0] + 0.1, 0]}>
        {Array.from({ length: 11 }).map((_, i) => (
          <mesh key={i} position={[(i - 5) * 0.28, 0, 0]}>
            <boxGeometry args={[0.04, 0.18, 2.9]} />
            <meshStandardMaterial color="#6b7280" metalness={0.95} roughness={0.25} />
          </mesh>
        ))}
      </group>

      {/* ============ L1 · Thermal Interface Layer 蓝色半透明导热层 ============ */}
      <LayerShell
        index={1}
        position={[0, baseY[1], 0]}
        explodedY={explodeOffset[1]}
        size={[3.1, 1, 3.1]}
        thickness={0.06}
        color="#1e3a8a"
        emissive="#22d3ee"
        emissiveIntensity={0.6}
        metalness={0.2}
        roughness={0.2}
        opacity={0.55}
        transparent
        showEdges
        edgeColor="#22d3ee"
        edgeIntensity={1.5}
        hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer}
        setSelectedLayer={setSelectedLayer}
      />
      {/* 导热层发光网格 */}
      <group position={[0, baseY[1] + explodeOffset[1], 0]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`h${i}`} position={[0, 0.01, (i - 3.5) * 0.36]}>
            <boxGeometry args={[2.9, 0.005, 0.015]} />
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5} transparent opacity={0.7} />
          </mesh>
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`v${i}`} position={[(i - 3.5) * 0.36, 0.01, 0]}>
            <boxGeometry args={[0.015, 0.005, 2.9]} />
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5} transparent opacity={0.7} />
          </mesh>
        ))}
      </group>

      {/* ============ L2 · Package Substrate 深蓝黑色封装基板 ============ */}
      <LayerShell
        index={2}
        position={[0, baseY[2], 0]}
        explodedY={explodeOffset[2]}
        size={[3.0, 1, 3.0]}
        thickness={0.14}
        color="#0a1228"
        emissive="#1e3a8a"
        emissiveIntensity={0.25}
        metalness={0.4}
        roughness={0.55}
        map={substrateTex}
        showEdges
        edgeColor="#3b82f6"
        edgeIntensity={0.8}
        hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer}
        setSelectedLayer={setSelectedLayer}
      />

      {/* ============ L3 · AI Compute Core 矩阵式计算单元阵列 ============ */}
      <ComputeCoreArray
        y={baseY[3] + explodeOffset[3]}
        size={[2.6, 1, 2.6]}
        hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer}
        setSelectedLayer={setSelectedLayer}
        index={3}
      />

      {/* ============ L4 · High-Bandwidth Memory 多层 HBM 堆叠 ============ */}
      <HBMStacks
        y={baseY[4] + explodeOffset[4]}
        size={[2.8, 1, 2.8]}
        hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer}
        setSelectedLayer={setSelectedLayer}
        index={4}
      />

      {/* ============ L5 · Interconnect Bus 高速互连总线 ============ */}
      <InterconnectBus
        y={baseY[5] + explodeOffset[5]}
        size={[2.8, 1, 2.8]}
        hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer}
        setSelectedLayer={setSelectedLayer}
        index={5}
      />

      {/* ============ L6 · Sensor Integration Module 传感器接口 ============ */}
      <SensorModule
        y={baseY[6] + explodeOffset[6]}
        size={[2.6, 1, 2.6]}
        hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer}
        setSelectedLayer={setSelectedLayer}
        index={6}
      />

      {/* ============ L7 · Safety Island 独立安全控制区 ============ */}
      <SafetyIsland
        y={baseY[7] + explodeOffset[7]}
        size={[2.6, 1, 2.6]}
        hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer}
        setSelectedLayer={setSelectedLayer}
        index={7}
      />

      {/* ============ L8 · Silicon Base 硅基底（规则晶体纹理）============ */}
      <LayerShell
        index={8}
        position={[0, baseY[8], 0]}
        explodedY={explodeOffset[8]}
        size={[2.4, 1, 2.4]}
        thickness={0.12}
        color="#1f2937"
        emissive="#0ea5e9"
        emissiveIntensity={0.25}
        metalness={0.5}
        roughness={0.5}
        map={siliconTex}
        showEdges
        edgeColor="#60a5fa"
        edgeIntensity={0.7}
        hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer}
        setSelectedLayer={setSelectedLayer}
      />
      {/* 硅基底上的光路纹理 */}
      <group position={[0, baseY[8] + explodeOffset[8] + 0.07, 0]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, 0, (i - 2) * 0.4]}>
            <boxGeometry args={[2.2, 0.005, 0.04]} />
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.8} />
          </mesh>
        ))}
      </group>

      {/* ============ L9 · Gold Contacts 底部金色触点阵列 ============ */}
      <GoldContacts
        y={baseY[9] + explodeOffset[9]}
        size={[2.0, 1, 2.0]}
        hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer}
        setSelectedLayer={setSelectedLayer}
        index={9}
      />
    </group>
  );
}
