import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Cpu, Zap, Brain, Shield, Activity, Layers, ArrowRight, Check, Network } from 'lucide-react';

/* AegisEdge A15 芯片详细介绍页 —— 蓝科技风 + 红紫交互背景 + 高斯模糊未来感 */
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
  { step: '02', title: '张量融合', desc: 'AegisEdge A15 NPU 在统一张量空间完成多模态对齐与特征融合' },
  { step: '03', title: '大模型推理', desc: '端侧 70B 稀疏化大模型实时推理，输出动作策略' },
  { step: '04', title: '运动执行', desc: '28 自由度执行器毫秒级响应，全身协调控制输出' },
];

/* ---------- 算力板块（整板背景芯片图 + A15 品牌叠加） ---------- */
const chipImg =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=photorealistic%20top-down%20product%20photograph%20of%20a%20large%20black%20square%20silicon%20AI%20chip%20processor%20on%20dark%20PCB%20board%2C%20golden%20circuit%20traces%2C%20glowing%20cyan%20blue%20signal%20paths%2C%20a%20large%20featureless%20dark%20silicon%20die%20in%20center%20with%20NO%20logos%20NO%20text%20NO%20labels%20NO%20watermarks%2C%20flat%20plan%20view%20no%203D%20perspective%2C%20studio%20macro%20lighting%2C%20high%20contrast%20detail%2C%20ultra%20detailed%204k%20product%20shot%2C%20close%20up%20macro%20composition%20filling%20entire%20frame&image_size=landscape_16_9';

function Chip3DShowcase() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* 背景：扁平化芯片图 */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${chipImg})` }}
        aria-hidden
      />
      {/* 文字可读性遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/75 to-black pointer-events-none" />
      {/* 左右渐变柔化边缘 */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      {/* 顶部/底部柔化 */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      {/* 背景光晕 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[340px] h-[340px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 中心数据光环（叠加背景图） */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-cyan-400/15 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full border border-purple-400/10 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-dashed border-cyan-400/18 pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[520px]">
          {/* 左：文字 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-4">
              Compute · AI 算力底座
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
              顶级 AI 算力
              <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent"> AegisEdge A15 </span>
              的每一寸性能
            </h2>
            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8">
              3nm 制程的精密布局，1280 TOPS 算力的金属脉络，触手可及。
              AegisEdge A15 边缘 AI 芯片参考顶级 H200 级算力密度设计，
              在人形机器人狭窄机身内实现端侧大模型实时推理，
              让视觉识别、语音理解与运动规划同步进行。
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
              查看 AegisEdge A15 完整 3D 拆解
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* 右：叠加在背景芯片图上的 A15 品牌展示 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center"
          >
            {/* 中心 A15 芯片 die 品牌卡（叠在背景图中心） */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-2xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-sm shadow-[0_40px_100px_-20px_rgba(34,211,238,0.35)]"
            >
              {/* die 内部 A15 品牌（叠加在干净芯片中心） */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-display text-6xl md:text-7xl font-black tracking-wider bg-gradient-to-br from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.45)]">
                  A15
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  <p className="text-[10px] tracking-[0.35em] text-cyan-200/70 font-semibold">AEGISEDGE · EDGE AI</p>
                </div>
              </div>

              {/* 内环装饰 */}
              <div className="absolute inset-4 border border-cyan-400/25 rounded-xl" />
              <div className="absolute inset-6 border border-purple-400/20 rounded-lg" />

              {/* die 四角角标 */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-md px-2 py-1">
                <p className="text-[10px] font-black text-cyan-300 leading-none">3nm PROCESS</p>
              </div>
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-md px-2 py-1">
                <p className="text-[10px] font-black text-purple-300 leading-none">1280 TOPS</p>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-md px-2 py-1">
                <p className="text-[10px] font-black text-white/80 leading-none">920 B TRANS.</p>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-md px-2 py-1">
                <p className="text-[10px] font-black text-emerald-300 leading-none">{'< 2ms'}</p>
              </div>
            </motion.div>

            {/* 下方参考说明 */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-[11px] text-white/55 tracking-wider"
            >
              参考 H200 级算力密度设计 · 芯片底图为 AegisEdge A15 实拍渲染
            </motion.p>
          </motion.div>
        </div>

        {/* 底部信息条 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3 text-[10px] text-white/55 tracking-wider"
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span>LIVE · EDGE INFERENCE</span>
          <span className="text-white/25">|</span>
          <span>END-TO-END · 端侧大模型推理</span>
        </motion.div>
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
            <span className="text-xs font-semibold tracking-[0.4em] text-cyan-200">AegisEdge A15 · 下一代机器人芯片</span>
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight mb-6 leading-none">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">AegisEdge A15</span>
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
              查看搭载 AegisEdge A15 的机器人
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
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">AegisEdge A15 已在三类场景落地</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: 'B 端', title: '机构 24h 巡护', desc: '养老院整建制部署，AegisEdge A15 驱动毫秒级跌倒识别与转移辅助', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-400/40' },
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
              查看搭载 AegisEdge A15 的机器人系列
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 新增章节：AegisEdge A15 边缘 AI 架构白皮书 */}
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
              AegisEdge A15 将散热、导热、基板、计算、内存、互连、传感、安全、硅基与触点十层立体协同，实现「感知—计算—执行」端到端闭环。
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
              进入 AegisEdge A15 完整 3D 拆解演示
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 新增章节：A15 vs 上一代代际对比 */}
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
              AegisEdge A15 较上一代的四维跃升
            </h2>
            <p className="text-sm text-white/55 max-w-2xl mx-auto leading-relaxed">
              从算力、延迟、能效到传感器路数，A15 为人形机器人边缘 AI 而生。
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
              「AegisEdge A15 不是一颗更快的芯片，而是为人形机器人重新定义的边缘 AI 架构——
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
