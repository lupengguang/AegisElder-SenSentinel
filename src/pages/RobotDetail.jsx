import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Cpu, Zap, Brain, Shield, Activity, Layers, ArrowRight, Check, Network, Radar, WifiOff } from 'lucide-react';

/* AegisEdge Ai5 芯片详细介绍页 —— 蓝科技风 + 红紫交互背景 + 高斯模糊未来感 */
/* 算力板块：H200 级扁平化真实芯片照片 */

const specs = [
  { label: '制程工艺', value: '3nm', desc: '台积电 N3B 顶级制程' },
  { label: '晶体管数', value: '920亿', desc: '高密度库 + GAA-TFET' },
  { label: 'AI 算力', value: '1280 TOPS', desc: 'NPU + 张量融合' },
  { label: '内存带宽', value: '820 GB/s', desc: 'LPDDR5X-9600' },
  { label: '功耗', value: '15-65W', desc: '动态可调范围' },
  { label: '推理延迟', value: '< 2 ms', desc: '端到端实时响应' },
];

const pillars = [
  {
    icon: Brain,
    title: '神经网络引擎 NPU v5',
    desc: '全新第三代张量架构，原生支持 Transformer、MoE 与稀疏化推理，单次前向吞吐量较上代提升 4.8×。',
    points: ['原生大模型加速', '稀疏化推理 6×', '混合精度 INT4/FP8'],
  },
  {
    icon: Network,
    title: '多模态融合总线',
    desc: '视觉、语音、触觉、激光雷达数据在芯片内统一张量空间融合，端到端延迟 < 2ms，机器人感知决策一体完成。',
    points: ['6 路模态实时融合', '端到端 < 2ms', '感知决策一体'],
  },
  {
    icon: Layers,
    title: '存算一体内存墙突破',
    desc: 'HBM3 + LPDDR5X 双层内存架构，820 GB/s 带宽彻底击穿内存墙，大模型权重常驻片上无需搬运。',
    points: ['820 GB/s 带宽', '权重常驻片上', '零搬运开销'],
  },
  {
    icon: Shield,
    title: '硬件级安全隔离',
    desc: '内置独立 Secure Enclave，机器人行为决策可追溯、可审计，满足民政监管与机构合规要求。',
    points: ['独立安全飞地', '行为可追溯审计', 'G 端合规就绪'],
  },
];

const pipeline = [
  { step: '01', title: '感知输入', desc: '摄像头 / 麦克风 / 触觉 / 激光雷达 / IMU 多模态原始信号' },
  { step: '02', title: '张量融合', desc: 'AegisEdge Ai5 NPU 在统一张量空间完成多模态对齐与特征融合' },
  { step: '03', title: '大模型推理', desc: '端侧 70B 稀疏化大模型实时推理，输出动作策略' },
  { step: '04', title: '运动执行', desc: '28 自由度执行器毫秒级响应，全身协调控制输出' },
];

/* ---------- 系统架构流程图：感知 → 推理 → 决策 → 执行 ---------- */
const archColumns = [
  {
    no: '01',
    icon: Radar,
    title: '多模态传感器',
    tone: 'from-cyan-500/30 to-cyan-500/5',
    dot: 'bg-cyan-400',
    items: ['摄像头 / 麦克风', '触觉 / 力传感器', '环境传感器'],
  },
  {
    no: '02',
    icon: Cpu,
    title: 'AegisEdge Ai5 芯片',
    tone: 'from-blue-500/30 to-blue-500/5',
    dot: 'bg-blue-400',
    items: ['算力调度', '安全隔离', '数据加密'],
  },
  {
    no: '03',
    icon: Brain,
    title: 'Qwen3-Omni 推理',
    tone: 'from-purple-500/30 to-purple-500/5',
    dot: 'bg-purple-400',
    items: ['风险判断', '对话生成', '情绪识别'],
  },
  {
    no: '04',
    icon: Zap,
    title: '决策输出',
    tone: 'from-pink-500/30 to-pink-500/5',
    dot: 'bg-pink-400',
    items: ['语音交互', '运动控制', '告警推送'],
  },
];

/* ---------- 算力板块（干净 AI 芯片底图，无叠加框/标签） ---------- */
const chipImg =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=photorealistic%20cinematic%20wide-angle%20shot%20of%20a%20large%20dark%20gray-black%20metal%20AI%20accelerator%20chip%20in%20the%20center%2C%20top-down%20slightly%20angled%20macro%20view%2C%20intricate%20fine%20circuit%20traces%20and%20silicon%20wafer%20texture%20covering%20the%20entire%20frame%2C%20tiny%20glowing%20cyan-teal%20signal%20dots%20and%20blue-violet%20signal%20paths%20flickering%20along%20circuit%20lines%2C%20background%20blurred%20dark%20server%20rack%20room%20with%20rows%20of%20silicon%20wafers%20and%20circuit%20boards%2C%20deep%20dark%20blue-black-purple%20color%20grade%2C%20studio%20quality%20lighting%2C%20volumetric%20atmosphere%2C%20NO%20logos%20NO%20text%20NO%20labels%20NO%20watermarks%20NO%20UI%20overlays%2C%20ultra%20detailed%208k%20product%20photography%2C%20dark%20cinematic%20mood&image_size=landscape_16_9';

function Chip3DShowcase() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* 干净芯片底图，无任何叠加 */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${chipImg})` }}
        aria-hidden
      />
      {/* 基础文字可读性遮罩（深黑渐变） */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/70 to-transparent pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
      {/* 深蓝黑紫氛围光晕（不破坏底图） */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-900/25 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          {/* 左：技术文案 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-4">
              Core Compute · 核心技术底座
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
              AegisEdge Ai5
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                端侧 AI 算力核心
              </span>
            </h2>
            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8">
              3nm 制程的精密布局，1280 TOPS 算力的金属脉络。
              参考顶级 AI 芯片的算力密度设计，
              在人形机器人狭窄机身内实现端侧大模型实时推理，
              让多模态视觉识别、自然语言理解与全身运动规划同步进行。
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Cpu, label: '3nm 工艺' },
                { icon: Zap, label: '1280 TOPS' },
                { icon: Layers, label: '920 亿晶体管' },
                { icon: Activity, label: '< 2ms 延迟' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 text-xs text-white/85"
                  >
                    <Icon size={14} className="text-cyan-300" />
                    {item.label}
                  </span>
                );
              })}
            </div>

            <Link
              to="/chip-3d"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-400/40 rounded-full text-xs text-cyan-200 hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/70 transition-all"
            >
              <Layers size={14} />
              查看 AegisEdge Ai5 完整 3D 拆解
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* 右：纯芯片底图，无任何叠加 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative h-[520px] lg:h-[600px] pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}

export default function RobotDetail() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-enter bg-black text-white"
    >
      <Navbar />

      {/* Hero 区：高斯模糊 + 红紫蓝渐变光晕 */}
      <section ref={heroRef} className="relative h-screen min-h-[680px] overflow-hidden">
        {/* 多层光晕背景 */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.35),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.3),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,rgba(239,68,68,0.25),transparent_50%)]" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </motion.div>

        {/* 网格底纹 */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(96,165,250,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* 浮动粒子 */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {[...Array(28)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-300 rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -40, 0], opacity: [0.15, 0.7, 0.15] }}
              transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>

        {/* Hero 内容 */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <Cpu size={16} className="text-cyan-300" />
            <span className="text-xs font-semibold tracking-[0.4em] text-cyan-200">AegisEdge Ai5 · 下一代机器人芯片</span>
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight mb-6 leading-none">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">AegisEdge Ai5</span>
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl text-white/90">机器人专用芯片</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 max-w-2xl mb-10 leading-relaxed">
            3nm 制程 · 1280 TOPS · 端侧 70B 大模型推理 · 多模态融合延迟 &lt; 2ms —— 为森卫安护人形机器人量身打造
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-all"
            >
              查看搭载 AegisEdge Ai5 的机器人
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#tech-detail"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 text-white rounded-full text-sm font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              深入了解技术
            </a>
          </div>
        </motion.div>

        {/* 滚动指示 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* 3D 芯片动态展示 */}
      <Chip3DShowcase />

      {/* 规格数据条 */}
      <section id="tech-detail" className="relative py-20 md:py-28 bg-gradient-to-b from-black via-[#0a0a1a] to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-4">Specs · 核心规格</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">一颗芯片，定义机器人上限</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {specs.map((spec, idx) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300"
              >
                <p className="text-xs text-gray-400 mb-2">{spec.label}</p>
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-1">
                  {spec.value}
                </p>
                <p className="text-[11px] text-gray-500">{spec.desc}</p>
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 四大技术支柱 */}
      <section className="relative py-20 md:py-28 bg-[#050510] overflow-hidden">
        {/* 红紫蓝背景光晕 */}
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-red-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-purple-400 uppercase mb-4">Pillars · 技术支柱</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">四大核心引擎</h2>
            <p className="text-sm text-white/50">让机器人真正「会想、会看、会动、可信任」</p>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: idx * 0.12 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div className="flex items-start gap-5 mb-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center group-hover:from-cyan-500/40 group-hover:to-purple-500/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={26} className="text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-2">{pillar.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 ml-1">
                    {pillar.points.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-white/70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white"
                        style={{ transitionDelay: `${i * 45}ms` }}
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-125" style={{ transitionDelay: `${i * 45}ms` }}>
                          <Check size={11} className="text-black" strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 端到端推理流水线 */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#050510] to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-red-400 uppercase mb-4">Pipeline · 推理流水线</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">从感知到动作，2 毫秒内完成</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4 md:gap-6 relative">
            {/* 流水线连接线 */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-cyan-500/20 via-purple-500/60 to-red-500/20" />

            {pipeline.map((stage, idx) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full blur-md group-hover:blur-lg transition-all" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/30 backdrop-blur-md flex items-center justify-center">
                    <span className="font-display text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                      {stage.step}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{stage.title}</h3>
                <p className="text-xs text-white/55 leading-relaxed px-2">{stage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 系统架构：感知 → 推理 → 决策 → 执行 全流程本地闭环 */}
      <section className="relative py-20 md:py-28 bg-black overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-4">Architecture · 系统架构</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
              感知 <span className="text-cyan-400">→</span> 推理 <span className="text-blue-400">→</span> 决策 <span className="text-purple-400">→</span> 执行
            </h2>
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-cyan-400/30 rounded-full px-5 py-2 text-xs text-cyan-200">
              <Shield size={13} className="text-cyan-300" />
              全流程本地闭环 · Local-Only Loop
            </div>
            <div className="section-divider" />
          </motion.div>

          {/* 横向流程图 */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0">
            {archColumns.map((col, idx) => {
              const Icon = col.icon;
              return (
                <div key={col.title} className="contents">
                  {/* 阶段列 */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    whileHover={{ y: -6 }}
                    className="flex-1 min-w-0 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-colors duration-300"
                  >
                    {/* 节点头 */}
                    <div className={`relative flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${col.tone} border-b border-white/10`}>
                      <div className="w-9 h-9 rounded-xl bg-black/30 border border-white/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={17} className="text-white" />
                      </div>
                      <h3 className="font-display text-sm md:text-base font-bold text-white leading-tight">{col.title}</h3>
                      <span className="absolute top-2 right-3 text-[10px] font-mono text-white/40">{col.no}</span>
                    </div>
                    {/* 子项 */}
                    <div className="p-3.5 space-y-2.5">
                      {col.items.map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -14 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.15 + 0.2 + i * 0.1 }}
                          className="flex items-center gap-2.5 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white/75 hover:border-cyan-400/40 hover:text-white transition-colors duration-300"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${col.dot} flex-shrink-0`} />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 列间箭头 */}
                  {idx < archColumns.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.25 }}
                      className="flex items-center justify-center py-1 md:py-0 md:px-1.5"
                    >
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
                        className="rotate-90 md:rotate-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/20 text-cyan-300"
                      >
                        <ArrowRight size={16} />
                      </motion.span>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 底部隐私与离线说明 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 grid md:grid-cols-2 gap-4"
          >
            {[
              {
                icon: Shield,
                text: '仅告警事件与脱敏统计数据上传云端，原始音视频数据本地处理，保护长者隐私。',
              },
              {
                icon: WifiOff,
                text: '断网状态下，跌倒识别、本地对话、环境感知功能完全可用。',
              },
            ].map((note, i) => {
              const NoteIcon = note.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3.5 bg-white/[0.03] backdrop-blur-md border border-cyan-400/20 rounded-2xl p-5 hover:border-cyan-400/50 transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/25 to-purple-500/25 border border-white/15 flex items-center justify-center flex-shrink-0">
                    <NoteIcon size={16} className="text-cyan-300" />
                  </div>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed pt-1">{note.text}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 适用场景 */}
      <section className="relative py-20 md:py-28 bg-black overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-blue-400 uppercase mb-4">Scenarios · 适用场景</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">AegisEdge Ai5 已在三类场景落地</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: 'B 端', title: '机构 24h 巡护', desc: '养老院整建制部署，AegisEdge Ai5 驱动毫秒级跌倒识别与转移辅助', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-400/40' },
              { tag: 'C 端', title: '家庭情感陪伴', desc: '端侧 70B 大模型支撑情感对话，隐私不出户、延迟可忽略', color: 'from-teal-500/20 to-emerald-500/20', border: 'border-teal-400/40' },
              { tag: 'G 端', title: '民政公益巡访', desc: '硬件级安全飞地保障行为可追溯，对接监管平台合规留痕', color: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-400/40' },
            ].map((s, idx) => (
              <motion.div
                key={s.tag}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -10 }}
                className={`relative bg-gradient-to-br ${s.color} backdrop-blur-md border ${s.border} rounded-2xl p-8 transition-all duration-300`}
              >
                <span className="inline-block text-xs font-bold tracking-widest bg-white/15 backdrop-blur px-3 py-1 rounded-full mb-4">
                  {s.tag}
                </span>
                <h3 className="font-display text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/30"
            >
              查看搭载 AegisEdge Ai5 的机器人系列
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 新增章节：AegisEdge Ai5 边缘 AI 架构白皮书 */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-black via-[#080812] to-black overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-4">
              Whitepaper · 架构白皮书
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              十层封装，一颗芯片定义机器人感知闭环
            </h2>
            <p className="text-sm text-white/55 max-w-2xl mx-auto leading-relaxed">
              AegisEdge Ai5 将散热、导热、基板、计算、内存、互连、传感、安全、硅基与触点十层立体协同，实现「感知—计算—执行」端到端闭环。
            </p>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                no: '01',
                title: '散热与导热 · 稳定输出基础',
                desc: '银色拉丝金属散热顶盖搭配蓝色半透明导热层，将 65W 满载热量均匀导散，保证人形机器人长时间巡逻与情感陪伴场景下算力不降频。导热层边缘微弱发光，既是工艺标识也是温度可视化的设计语言。',
                points: ['银色拉丝金属顶盖', '蓝色半透明导热层', '边缘发光温度可视化'],
              },
              {
                no: '02',
                title: '计算与内存 · 击穿内存墙',
                desc: '64 阵列矩阵式计算单元 + 4 组多层 HBM3 堆叠，权重常驻片上无需搬运，820 GB/s 带宽彻底击穿内存墙。端侧 70B 级大模型实时推理，为人形机器人的视觉识别、语音理解与运动规划提供算力底座。',
                points: ['64 阵列计算单元', '4 组 HBM3 多层堆叠', '820 GB/s 带宽常驻片上'],
              },
              {
                no: '03',
                title: '互连与传感 · 多模态融合',
                desc: '发光互连总线连接计算核心与 HBM，Sensor Integration Module 原生支持 Camera / Mic / IMU / LiDAR 四路传感器同步采集，在统一张量空间完成多模态对齐，端到端延迟低于 2ms，让机器人「会看、会听、会感知姿态」。',
                points: ['发光互连总线', '四路传感器同步', '统一张量空间融合'],
              },
              {
                no: '04',
                title: '安全与触点 · 工业级可靠',
                desc: 'Safety Island 以金色边框独立围出安全控制区，负责紧急停止、状态监控与故障隔离，与主计算核心物理隔离。底部 LGA 金色触点阵列 10,000+ 次插拔寿命，满足工业级人形机器人严苛部署环境。',
                points: ['金色安全岛独立隔离', 'LGA 金色触点阵列', '10K+ 插拔工业级寿命'],
              },
            ].map((card, idx) => (
              <motion.div
                key={card.no}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-display text-3xl font-bold bg-gradient-to-br from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {card.no}
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-bold leading-tight">{card.title}</h3>
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-5">{card.desc}</p>
                <ul className="space-y-2">
                  {card.points.map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/75">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center">
                        <Check size={10} className="text-black" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA 到 3D 拆解页 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-14"
          >
            <Link
              to="/chip-3d"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-400/40 rounded-full text-sm font-semibold text-cyan-100 hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/70 transition-all"
            >
              <Layers size={16} />
              进入 AegisEdge Ai5 完整 3D 拆解演示
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 新增章节：Ai5 vs 上一代代际对比 */}
      <section className="relative py-20 md:py-28 bg-[#050510] overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-purple-400 uppercase mb-4">
              Generation Leap · 代际跃升
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              AegisEdge Ai5 较上一代的四维跃升
            </h2>
            <p className="text-sm text-white/55 max-w-2xl mx-auto leading-relaxed">
              从算力、延迟、能效到传感器路数，Ai5 为人形机器人边缘 AI 而生。
            </p>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'AI 算力', prev: '420 TOPS', next: '1280 TOPS', gain: '3.0×', icon: Cpu, color: 'from-cyan-400 to-blue-400' },
              { label: '端到端延迟', prev: '6.5 ms', next: '< 2 ms', gain: '3.2× 更低', icon: Zap, color: 'from-amber-400 to-orange-400' },
              { label: '能效比', prev: '2.8 TOPS/W', next: '8.0 TOPS/W', gain: '2.85×', icon: Activity, color: 'from-emerald-400 to-teal-400' },
              { label: '传感器路数', prev: '2 路融合', next: '4 路同步', gain: '2× 多模态', icon: Network, color: 'from-purple-400 to-pink-400' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-20 flex items-center justify-center`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {item.gain}
                    </span>
                  </div>
                  <p className="text-xs text-white/45 mb-3">{item.label}</p>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-[11px] text-white/35 line-through">{item.prev}</span>
                    <ArrowRight size={11} className="text-white/40" />
                    <span className={`font-display text-xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.next}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/40">较上一代提升 {item.gain}</p>
                </motion.div>
              );
            })}
          </div>

          {/* 架构哲学引言 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 max-w-3xl mx-auto text-center"
          >
            <blockquote className="text-sm md:text-base text-white/55 leading-relaxed italic border-l-2 border-cyan-400/50 pl-5 text-left">
              「AegisEdge Ai5 不是一颗更快的芯片，而是为人形机器人重新定义的边缘 AI 架构——
              让感知、计算与安全在单芯片内闭环，让机器人真正具备实时、可信、可部署的智能。」
            </blockquote>
            <p className="text-[11px] text-white/35 mt-3 tracking-widest">— SENWEI 森卫安护 · AegisEdge 架构团队</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
