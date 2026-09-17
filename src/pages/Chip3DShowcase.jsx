import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Layers, Activity, Cpu, Shield, ChevronRight,
  Zap, Network, Database, Sparkles,
  CircuitBoard,
} from 'lucide-react';

/* ====================================================================
 * AegisEdge Ai5 · 人形机器人边缘 AI 芯片 10 层结构定义
 * 原创概念芯片，非苹果 A15，非马斯克机器人芯片
 * ==================================================================== */
const layers = [
  {
    id: 0, key: 'HEAT_SPREADER', name: '散热顶盖', en: 'Heat Spreader', color: '#9ca3af',
    material: '银色拉丝金属散热顶盖',
    desc: '集成式金属散热顶盖，表面采用细腻拉丝工艺处理，将计算核心高负载产生的热量均匀导散至外部散热模组，保证人形机器人长时间满载算力稳定输出。',
    specs: ['材质: 银色拉丝金属', '导热系数: 400 W/m·K', '覆盖面积: 全芯片顶面'],
    capabilities: ['均匀散热', '拉丝金属质感', '高负载稳定'],
  },
  {
    id: 1, key: 'THERMAL_INTERFACE', name: '导热层', en: 'Thermal Interface Layer', color: '#1e3a8a',
    material: '蓝色半透明导热材料',
    desc: '蓝色半透明导热界面层，填充散热顶盖与封装基板之间的微隙，边缘有微弱发光，强化热传导效率与温度均匀性，避免局部热点。',
    specs: ['材质: 半透明导热凝胶', '导热系数: 250 W/m·K', '厚度: 0.1mm'],
    capabilities: ['微弱发光边缘', '高导热效率', '温度均匀化'],
  },
  {
    id: 2, key: 'PACKAGE_SUBSTRATE', name: '封装基板', en: 'Package Substrate', color: '#0a1228',
    material: '深蓝黑色高密度基板',
    desc: '深蓝黑色高密度有机封装基板，承载计算核心与 HBM，带细密电路走线和网格，提供 9000+ I/O 引脚，支持 PCIe Gen6 与 CXL 互连协议。',
    specs: ['层数: 18 层', 'I/O: 9000+', '协议: PCIe Gen6 / CXL'],
    capabilities: ['细密电路走线', '高密度 I/O', '多协议互连'],
  },
  {
    id: 3, key: 'COMPUTE_CORE', name: 'AI 计算核心', en: 'AI Compute Core', color: '#0ea5e9',
    material: '矩阵式计算单元阵列',
    desc: '人形机器人边缘推理核心，负责视觉识别、语音理解、运动规划和实时决策。',
    specs: ['核心数: 64 阵列', '算力: 1280 TOPS', '精度: INT4 / FP16'],
    capabilities: ['INT4 / FP16 推理', '低延迟响应', '异构计算'],
  },
  {
    id: 4, key: 'HBM_STACKS', name: '高带宽显存', en: 'High-Bandwidth Memory', color: '#7c3aed',
    material: '多层 HBM 堆叠',
    desc: '高速内存堆叠，为 AI 模型权重和传感器数据提供高带宽访问。',
    specs: ['容量: 64 GB', '带宽: 820 GB/s', '工艺: 3DS TSV'],
    capabilities: ['大容量带宽', '低功耗', '实时数据缓存'],
  },
  {
    id: 5, key: 'INTERCONNECT_BUS', name: '互连总线', en: 'Interconnect Bus', color: '#22d3ee',
    material: '高速互连通道',
    desc: '计算核心与内存之间的高速互连通道，使用发光总线连接，单向带宽达 820 GB/s，时延 < 2ms，保障大模型权重与传感器数据的实时搬运。',
    specs: ['带宽: 820 GB/s', '协议: NoC v3', '时延: < 2ms'],
    capabilities: ['发光总线', '高带宽互连', '低时延传输'],
  },
  {
    id: 6, key: 'SENSOR_MODULE', name: '传感器接口', en: 'Sensor Integration Module', color: '#60a5fa',
    material: '多模态传感器接口',
    desc: '连接视觉、语音、距离和姿态传感器，处理机器人多模态输入。',
    specs: ['接口: Camera / Mic / IMU / LiDAR', '同步: 多传感器同步', '采集: 低延迟采集'],
    capabilities: ['多传感器同步', '低延迟采集', '环境感知'],
  },
  {
    id: 7, key: 'SAFETY_ISLAND', name: '安全岛', en: 'Safety Island', color: '#fbbf24',
    material: '独立安全控制区 · 金色边框',
    desc: '独立安全控制区域，负责紧急停止、状态监控和故障保护。',
    specs: ['功能: 功能安全', '监控: 实时监控', '保护: 故障隔离'],
    capabilities: ['功能安全', '实时监控', '故障隔离'],
  },
  {
    id: 8, key: 'SILICON_BASE', name: '硅基底', en: 'Silicon Base', color: '#1f2937',
    material: '深灰硅基底 · 规则晶体纹理',
    desc: '深灰色硅基底，带规则晶体纹理，3nm 工艺晶圆，920 亿晶体管集成，GAA-TFET 架构，能效比较上代提升 2.8 倍，为人形机器人边缘 AI 提供物理基础。',
    specs: ['工艺: 3nm', '晶体管: 920 亿', '架构: GAA-TFET'],
    capabilities: ['规则晶体纹理', '3nm 顶级制程', '高能效比'],
  },
  {
    id: 9, key: 'GOLD_CONTACTS', name: '金触点', en: 'Gold Contacts', color: '#fbbf24',
    material: 'LGA 金色触点阵列',
    desc: '底部 LGA 金色触点阵列，与主板插槽高可靠对接，10,000+ 次插拔寿命，排列整齐，满足工业级人形机器人严苛部署环境。',
    specs: ['触点: 100 阵列', '镀金: 30u"', '寿命: 10K 插拔'],
    capabilities: ['排列整齐', '高可靠对接', '工业级寿命'],
  },
];

/* 芯片展示图轮播（置于 public/images/，交叉淡入 + Ken Burns 缓推） */
const chipSlides = [
  `${import.meta.env.BASE_URL}images/chip-ai5-1 (1).jpg`,
  `${import.meta.env.BASE_URL}images/chip-ai5-1 (2).jpg`,
  `${import.meta.env.BASE_URL}images/chip-ai5-1 (3).jpg`,
  `${import.meta.env.BASE_URL}images/chip-ai5-1 (4).jpg`,
];

export default function Chip3DShowcase() {
  const [selectedLayer, setSelectedLayer] = useState(3);
  const activeLayer = layers[selectedLayer];

  /* 芯片图自动轮播：6s 切换 */
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % chipSlides.length), 6000);
    return () => clearInterval(t);
  }, [slide]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-enter bg-[#050510] text-white min-h-screen"
    >
      <Navbar />

      {/* 顶部标题区 */}
      <section className="relative pt-28 md:pt-32 pb-6 px-4 text-center border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] md:text-xs font-semibold tracking-[0.5em] text-cyan-400 uppercase mb-3">
            SENWEI · AEGISEDGE Ai5 ARCHITECTURE
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AegisEdge Ai5 芯片结构化拆解
            </span>
          </h1>
          <p className="text-xs md:text-sm text-white/55 max-w-2xl mx-auto">
            人形机器人边缘 AI 芯片 · 10 层立体封装 · 端侧大模型推理专用
          </p>
        </motion.div>
      </section>

      {/* ============================================================
       * 芯片图片展示区（自动轮播，4 张真实芯片图）
       * ============================================================ */}
      <section className="relative px-4 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0a0a18] to-[#050510] aspect-[16/9]">
            <AnimatePresence initial={false}>
              <motion.img
                key={slide}
                src={chipSlides[slide]}
                alt={`AegisEdge Ai5 芯片结构 ${slide + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.2, ease: 'easeInOut' } }}
                draggable={false}
              />
            </AnimatePresence>
            {/* 底部渐变压边，与深色页面衔接 */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050510]/80 to-transparent pointer-events-none" />
            {/* 轮播指示点 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {chipSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`切换到芯片图 ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === slide ? 'w-8 bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.7)]' : 'w-3 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 主体：左导航 + 右详情（静态信息浏览，无 3D） */}
      <section className="relative grid lg:grid-cols-12 gap-4 px-4 lg:px-8 py-6">
        {/* 左侧 10 层结构导航 */}
        <aside className="lg:col-span-5">
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <p className="text-[10px] tracking-[0.3em] text-cyan-400 uppercase mb-3">Layer Stack · 分层导航</p>
            <ul className="space-y-1">
              {layers.map((l) => {
                const active = selectedLayer === l.id;
                return (
                  <li key={l.id}>
                    <button
                      onClick={() => setSelectedLayer(l.id)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-300 ${
                        active
                          ? 'bg-white/10 border border-cyan-400/40'
                          : 'border border-transparent hover:bg-white/5'
                      }`}
                    >
                      <span
                        className="flex-shrink-0 w-2.5 h-2.5 rounded-sm transition-transform duration-300"
                        style={{ backgroundColor: l.color, transform: active ? 'scale(1.35)' : 'scale(1)' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-[11px] font-semibold ${active ? 'text-cyan-300' : 'text-white/80'}`}>
                          {l.en}
                        </p>
                        <p className="text-[9px] text-white/40 truncate">{l.name}</p>
                      </div>
                      <ChevronRight
                        size={12}
                        className={`transition-all ${active ? 'text-cyan-300 translate-x-1' : 'text-white/30'}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* 右侧详情面板 */}
        <aside className="lg:col-span-7">
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5">
            <p className="text-[10px] tracking-[0.3em] text-cyan-400 uppercase mb-3">Selected Layer · 当前层</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: activeLayer.color, boxShadow: `0 0 14px ${activeLayer.color}` }}
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{activeLayer.en}</h3>
                    <p className="text-[10px] text-white/40">{activeLayer.name}</p>
                  </div>
                </div>

                <p className="text-xs text-white/65 leading-relaxed mb-4">{activeLayer.desc}</p>

                {/* 关键能力 */}
                <div className="mb-4">
                  <p className="text-[10px] tracking-[0.2em] text-cyan-400 uppercase mb-2">Capabilities · 关键能力</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLayer.capabilities.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-2.5 py-1 text-[10px] text-cyan-200"
                      >
                        <Sparkles size={9} className="text-cyan-300" />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 技术参数 */}
                <div className="space-y-2">
                  {activeLayer.specs.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-[11px] py-1.5 border-b border-white/5 last:border-0"
                    >
                      <span className="text-white/40">{s.split(':')[0]}</span>
                      <span className="text-cyan-200 font-mono">{s.split(':')[1]?.trim()}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-[10px] text-white/40 mb-1">Material · 材质</p>
                  <p className="text-xs text-purple-200">{activeLayer.material}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 芯片标识 */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/40">Chip ID</span>
                <span className="text-xs font-mono text-cyan-300">AEGISEDGE-Ai5-EDGE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/40">Revision</span>
                <span className="text-xs font-mono text-white/70">vAi5 · 2026</span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* 关键能力栏 */}
      <section className="relative px-4 lg:px-8 pb-16 pt-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Cpu, label: 'AI Compute Core', value: '64 Core · 1280 TOPS' },
              { icon: Database, label: 'High-Bandwidth Memory', value: 'HBM3 · 64GB' },
              { icon: Network, label: 'Interconnect Bus', value: '820 GB/s · <2ms' },
              { icon: Shield, label: 'Safety Island', value: '功能安全 · 故障隔离' },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3"
                >
                  <Icon size={20} className="text-cyan-300 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-white/40">{c.label}</p>
                    <p className="text-xs text-white/85 font-mono">{c.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AegisEdge Ai5 架构白皮书摘要 */}
          <div className="mt-10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <CircuitBoard size={20} className="text-cyan-300" />
              <h3 className="font-display text-lg font-bold">AegisEdge Ai5 架构白皮书</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-xs text-white/65 leading-relaxed">
              <div>
                <p className="text-cyan-300 font-semibold mb-2">边缘 AI 定位</p>
                <p>
                  AegisEdge Ai5 是面向人形机器人场景的原创边缘 AI 芯片，将视觉识别、语音理解、运动规划与实时决策统一收敛至单芯片，端侧完成 70B 级大模型推理，避免云端往返延迟与隐私外泄。
                </p>
              </div>
              <div>
                <p className="text-cyan-300 font-semibold mb-2">十层封装哲学</p>
                <p>
                  从银色拉丝散热顶盖到底部金色 LGA 触点，Ai5 采用十层立体封装：导热层、基板、计算核心、HBM、互连总线、传感器接口、安全岛、硅基底逐层协同，实现「感知—计算—执行」闭环。
                </p>
              </div>
              <div>
                <p className="text-cyan-300 font-semibold mb-2">机器人多模态融合</p>
                <p>
                  Sensor Integration Module 原生支持 Camera / Mic / IMU / LiDAR 四路传感器同步采集，经互连总线进入 AI Compute Core 的统一张量空间，完成多模态对齐与特征融合，端到端延迟低于 2ms。
                </p>
              </div>
              <div>
                <p className="text-cyan-300 font-semibold mb-2">功能安全独立区</p>
                <p>
                  Safety Island 以金色边框独立围出一块安全控制区，负责紧急停止、状态监控与故障隔离，与主计算核心物理隔离，确保人形机器人在异常状态下仍可安全降级运行。
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Link
              to="/robot-detail"
              className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-cyan-300 transition-colors"
            >
              返回 AegisEdge Ai5 芯片介绍页
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
