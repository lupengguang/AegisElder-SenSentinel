import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  ArrowLeft, ArrowRight, Cpu, Brain, Mic, Image as ImageIcon, FileText, Video,
  Zap, Shield, Layers, Network, Building2, Home, Landmark,
  Check, ChevronRight, Activity, Lock, Database, Heart, Users,
  Sparkles, Radio, Eye, MessageSquare,
} from 'lucide-react';

/* ====================================================================
 * 森卫安护｜Qwen3-Omni 多模态大模型 · AI 大脑内核
 * 与 AegisEdge A15 边缘芯片协同，支撑 B/C/G 三类客户差异化部署
 * 风格：深色科技风 + 白底卡片，主色深蓝 / 青绿 / 暖白，金色强调
 * ==================================================================== */

/* ---------- 数字滚动计数组件 ---------- */
function CountUp({ to, duration = 1.8, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
}

/* ---------- 3D 倾斜卡片 ---------- */
function TiltCard({ children, glow, className = '' }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 160, damping: 16 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 160, damping: 16 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={className}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(380px circle at 50% 50%, ${glow}, transparent 70%)` }}
      />
    </motion.div>
  );
}

/* ---------- 第一部分：Qwen3-Omni 四大模态能力 ---------- */
const modalityCards = [
  {
    icon: FileText,
    title: '文本理解与生成',
    desc: '原生理解中文长文本，生成护理记录、健康问询、政策宣讲文案，支持结构化输出。',
    accent: 'from-cyan-400 to-blue-500',
    glow: 'rgba(34,211,238,0.18)',
  },
  {
    icon: Eye,
    title: '图像与视频理解',
    desc: '实时识别跌倒、久卧、表情与环境异常，毫秒级视觉推理，断网依旧本地判定。',
    accent: 'from-teal-400 to-emerald-500',
    glow: 'rgba(20,184,166,0.18)',
  },
  {
    icon: Mic,
    title: '音频与语音交互',
    desc: '多方言语音识别与合成，支持慢速口语、情绪感知，老人对话门槛降至最低。',
    accent: 'from-violet-400 to-indigo-500',
    glow: 'rgba(139,92,246,0.18)',
  },
  {
    icon: Radio,
    title: '实时跨模态推理',
    desc: '统一张量空间融合文本/图像/音频/视频，端到端 < 2ms 输出动作策略与告警。',
    accent: 'from-amber-400 to-orange-500',
    glow: 'rgba(251,191,36,0.18)',
  },
];

/* ---------- 第三部分：B/C/G 差异化部署 ---------- */
const deployments = [
  {
    tag: 'B 端',
    code: 'BUSINESS',
    model: '14B Qwen3-Omni',
    title: '养老机构 · 机构级照护协同',
    icon: Building2,
    accent: { from: 'from-blue-500', to: 'to-cyan-400', text: 'text-cyan-300', bg: 'bg-blue-500/15', border: 'border-blue-400/40', glow: 'rgba(59,130,246,0.18)' },
    desc: '面向养老院、护理院、CCRC 社区与康复医院，处理院内巡检、老人交互、风险识别与护理协同。',
    points: [
      '机构级多任务并发处理',
      '跌倒识别与护理协同告警',
      '护理对话与健康问询记录',
      '与机构信息系统无缝对接',
    ],
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20caregiver%20robot%20patrolling%20corridor%20of%20modern%20nursing%20home%20night%20shift%20nurse%20station%20screen%20showing%20alert%20cinematic%20blue%20tech%20wide%20shot&image_size=landscape_16_9',
  },
  {
    tag: 'C 端',
    code: 'CONSUMER',
    model: '7B Qwen3-Omni',
    title: '家庭用户 · 隐私优先陪护',
    icon: Home,
    accent: { from: 'from-teal-500', to: 'to-emerald-400', text: 'text-emerald-300', bg: 'bg-teal-500/15', border: 'border-teal-400/40', glow: 'rgba(20,184,166,0.18)' },
    desc: '面向独居老人、空巢家庭与异地子女家庭，强调家庭隐私、低联网依赖、易用性与日常陪伴。',
    points: [
      '轻量化家庭日常陪护',
      '居家跌倒本地监测',
      '一键紧急呼叫子女',
      '影像语音不出户隐私优先',
    ],
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20white%20humanoid%20robot%20companion%20in%20cozy%20warm%20living%20room%20with%20elderly%20person%20smartphone%20remote%20family%20visit%20notification%20cinematic%20tender%20sunlight&image_size=landscape_16_9',
  },
  {
    tag: 'G 端',
    code: 'GOVERNMENT',
    model: '26B Qwen3-Omni',
    title: '民政公益 · 普惠与风险研判',
    icon: Landmark,
    accent: { from: 'from-indigo-500', to: 'to-purple-500', text: 'text-indigo-300', bg: 'bg-indigo-500/15', border: 'border-indigo-400/40', glow: 'rgba(99,102,241,0.18)' },
    desc: '面向民政部门、街道社区、养老服务中心与公益养老项目，提供更强的跨场景理解、数据分析与公益服务能力。',
    points: [
      '社区多场景统一理解',
      '重点人群风险分级研判',
      '民政公益宣教与培训',
      '脱敏数据与政务协同',
    ],
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20service%20robot%20interacting%20with%20elderly%20in%20bright%20community%20elderly%20service%20center%20government%20data%20dashboard%20on%20wall%20cinematic%20wide%20angle%20public%20welfare&image_size=landscape_16_9',
  },
];

/* ---------- 底部对比表 ---------- */
const compareRows = [
  {
    client: 'B 端养老机构',
    model: '14B Qwen3-Omni',
    position: '机构级照护协同',
    ability: '巡检 · 跌倒识别 · 护理记录 · 系统对接',
    scene: '养老院 · 护理院 · CCRC 社区',
    accent: 'text-cyan-300',
  },
  {
    client: 'C 端家庭用户',
    model: '7B Qwen3-Omni',
    position: '家庭隐私陪护',
    ability: '日常陪伴 · 居家跌倒监测 · 紧急呼叫',
    scene: '独居老人 · 空巢家庭',
    accent: 'text-emerald-300',
  },
  {
    client: 'G 端民政公益',
    model: '26B Qwen3-Omni',
    position: '社区普惠与风险研判',
    ability: '社区巡访 · 健康宣教 · 风险分级 · 数据上报',
    scene: '街道社区 · 养老服务中心',
    accent: 'text-indigo-300',
  },
];

export default function QwenOmniBrain() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 160]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const bgY = useTransform(heroProgress, [0, 1], [0, 120]);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleBack(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-enter bg-[#05070f] text-white min-h-screen overflow-x-hidden"
    >
      {/* 顶部滚动进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 origin-left z-[60]"
        style={{ scaleX: progressScale }}
      />

      {/* 固定返回按钮 */}
      <motion.button
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={handleBack}
        className="fixed top-5 left-5 z-50 group flex items-center gap-2.5 bg-black/55 backdrop-blur-xl border border-white/15 hover:border-cyan-400/60 rounded-full pl-3 pr-5 py-2.5 text-xs font-medium text-white/85 hover:text-cyan-200 transition-all duration-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.35)]"
      >
        <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-cyan-400/25 flex items-center justify-center transition-all duration-300 group-hover:-translate-x-0.5">
          <ArrowLeft size={13} />
        </span>
        返回
        <kbd className="hidden sm:inline-flex items-center text-[9px] text-white/35 border border-white/15 rounded px-1.5 py-0.5 ml-1">ESC</kbd>
      </motion.button>

      {/* ================= Hero ================= */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: bgY, scale: heroScale }} className="absolute inset-0 z-0">
          <img
            src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20AI%20brain%20neural%20network%20core%20connecting%20four%20modalities%20voice%20audio%20image%20video%20text%20data%20streams%20glowing%20cyan%20blue%20purple%20dark%20background%20cinematic%204k%20technology%20concept%20art&image_size=landscape_16_9"
            alt="Qwen3-Omni 统一 AI 大脑连接四模态"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.35),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_65%,rgba(251,191,36,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070f]/70 via-[#05070f]/55 to-[#05070f]" />
        </motion.div>

        {/* 网格底纹 */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.45) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* 浮动粒子 */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                backgroundColor: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#22d3ee' : '#a5b4fc',
              }}
              animate={{ y: [0, -50, 0], opacity: [0.1, 0.75, 0.1] }}
              transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: (i % 7) * 0.35, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 px-4 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 mb-7"
          >
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              <Brain size={15} />
              AI 大脑
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/25 text-white/90 text-xs font-semibold tracking-[0.3em] px-5 py-2 rounded-full">
              QWEN3-OMNI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-5"
          >
            Qwen3-Omni 多模态大模型
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              森卫安护的 AI 大脑内核
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="text-sm md:text-base text-white/70 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            从语音、视觉、文本到实时环境理解，Qwen3-Omni 为养老人形机器人提供端侧智能决策能力，
            与 AegisEdge A15 边缘芯片协同，支撑 B/C/G 三类客户差异化部署。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-9"
          >
            {[
              { icon: Mic, label: '语音' },
              { icon: ImageIcon, label: '图像' },
              { icon: FileText, label: '文本' },
              { icon: Video, label: '视频' },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-xl border border-cyan-400/30 rounded-full px-4 py-2.5"
                >
                  <Icon size={15} className="text-cyan-300" />
                  <span className="text-xs font-semibold text-white/85">{m.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#part1"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-semibold text-black shadow-[0_10px_40px_-8px_rgba(34,211,238,0.6)] hover:-translate-y-0.5 transition-all duration-300"
            >
              探索 AI 大脑架构
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#deploy"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-amber-400/50 hover:border-amber-400 hover:bg-amber-400/10 rounded-full text-sm font-medium text-amber-100 transition-all duration-300"
            >
              查看 B/C/G 部署方案
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-cyan-300 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ================= Part 1: Qwen3-Omni 原生全模态大模型 ================= */}
      <section id="part1" className="relative py-20 md:py-28 bg-gradient-to-b from-[#05070f] via-[#07121a] to-[#05070f] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[420px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-4">
              Part 01 · Native Multimodal
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
              Qwen3-Omni：<span className="bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">原生全模态大模型</span>
            </h2>
            <p className="text-sm md:text-base text-white/62 max-w-3xl mx-auto leading-relaxed">
              Qwen3-Omni 原生支持文本、图像、视频、音频，并具备跨模态理解与实时推理能力。
              作为森卫安护人形机器人的认知内核，它在统一张量空间内融合四类模态输入，
              输出可执行的陪护动作、风险告警与对话回应。
            </p>
          </motion.div>

          {/* 模态融合概念图 + 四卡片 */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <TiltCard glow="rgba(34,211,238,0.18)" className="relative rounded-3xl overflow-hidden group/img">
              <div className="relative aspect-[16/10] rounded-3xl border border-white/10 overflow-hidden">
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20multimodal%20AI%20model%20fusion%20diagram%20text%20image%20audio%20video%20converging%20into%20central%20neural%20core%20glowing%20cyan%20teal%20gold%20streams%20dark%20tech%20background%20cinematic%204k%20concept&image_size=landscape_16_9"
                  alt="Qwen3-Omni 模态融合示意图"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070f]/80 via-transparent to-transparent" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/15 rounded-full px-3.5 py-1.5">
                  <Sparkles size={13} className="text-amber-300" />
                  <span className="text-[11px] font-semibold text-white/85">模态融合张量空间</span>
                </div>
              </div>
            </TiltCard>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <Brain size={22} className="text-cyan-300" />
                <p className="text-xs font-semibold tracking-[0.3em] text-cyan-400 uppercase">Four Modalities</p>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">四种模态，一个认知内核</h3>
              <p className="text-sm text-white/62 leading-[1.9] mb-6">
                Qwen3-Omni 打破单模态边界，将老人的语音、表情、环境画面、健康文本统一编码为同一表征空间，
                让机器人像真人护工一样「听其言、观其行、知其情」。
              </p>
              <div className="flex flex-wrap gap-2">
                {['文本', '图像', '视频', '音频', '跨模态', '实时推理'].map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="text-[11px] font-semibold bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 rounded-full px-3.5 py-1.5"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* 四大能力卡片 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {modalityCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 rounded-2xl p-6 md:p-7 overflow-hidden transition-all duration-300"
                >
                  <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.accent} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{card.title}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= Part 2: Qwen3-Omni × AegisEdge A15 协同架构 ================= */}
      <section className="relative py-20 md:py-28 bg-[#05070f] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-amber-400 uppercase mb-4">
              Part 02 · Edge Synergy
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
              Qwen3-Omni <span className="text-amber-300">×</span> AegisEdge A15
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-amber-300 bg-clip-text text-transparent">端侧养老 AI 架构</span>
            </h2>
            <p className="text-sm md:text-base text-white/62 max-w-3xl mx-auto leading-relaxed">
              Qwen3-Omni 负责多模态理解与智能决策，AegisEdge A15 负责端侧算力调度与安全可靠执行。
              二者通过片上互连总线协同推理，实现「认知—决策—执行」毫秒级闭环。
            </p>
          </motion.div>

          {/* 分层架构图 */}
          <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* 背景网格 */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {/* 上层：Qwen3-Omni 认知层 */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative z-10 bg-gradient-to-r from-cyan-500/15 to-blue-500/10 border border-cyan-400/40 rounded-2xl p-6 md:p-8 mb-6"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                  <Brain size={30} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black tracking-[0.25em] text-cyan-300">COGNITIVE LAYER</span>
                    <span className="text-[10px] bg-cyan-400/20 text-cyan-200 px-2 py-0.5 rounded-full">认知层</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-1">Qwen3-Omni 认知层</h3>
                  <p className="text-xs text-white/60">多模态理解 · 智能决策 · 对话生成 · 风险研判</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['文本', '图像', '视频', '音频', '推理'].map((t) => (
                    <span key={t} className="text-[10px] bg-cyan-400/15 border border-cyan-400/30 text-cyan-200 rounded-full px-2.5 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 中间：发光协同连线 */}
            <div className="relative z-10 flex items-center justify-center my-2">
              <div className="flex flex-col items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 h-3 rounded-full bg-gradient-to-b from-cyan-400 to-amber-400"
                    animate={{ opacity: [0.2, 1, 0.2], scaleY: [0.6, 1.2, 0.6] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                  />
                ))}
                <div className="flex items-center gap-2 my-1">
                  <motion.span
                    animate={{ boxShadow: ['0 0 12px rgba(34,211,238,0.5)', '0 0 24px rgba(251,191,36,0.7)', '0 0 12px rgba(34,211,238,0.5)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-amber-500/20 border border-white/20 text-[10px] font-semibold text-white/80 whitespace-nowrap"
                  >
                    协同推理总线 · {'< 2ms'}
                  </motion.span>
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 h-3 rounded-full bg-gradient-to-b from-amber-400 to-indigo-400"
                    animate={{ opacity: [0.2, 1, 0.2], scaleY: [0.6, 1.2, 0.6] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15 + 0.1, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </div>

            {/* 下层：AegisEdge A15 芯片层 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative z-10 bg-gradient-to-r from-indigo-500/15 to-purple-500/10 border border-indigo-400/40 rounded-2xl p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)]">
                  <Cpu size={30} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black tracking-[0.25em] text-indigo-300">EDGE CHIP LAYER</span>
                    <span className="text-[10px] bg-indigo-400/20 text-indigo-200 px-2 py-0.5 rounded-full">芯片层</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-1">AegisEdge A15 边缘芯片层</h3>
                  <p className="text-xs text-white/60">算力调度 · 安全隔离 · 传感融合 · 执行控制</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['NPU', 'HBM', '安全飞地', '传感融合'].map((t) => (
                    <span key={t} className="text-[10px] bg-indigo-400/15 border border-indigo-400/30 text-indigo-200 rounded-full px-2.5 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* 协同价值三卡 */}
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {[
              { icon: Zap, title: '毫秒级闭环', desc: '认知到执行端到端 < 2ms，实时响应老人需求与险情', color: 'text-amber-300' },
              { icon: Lock, title: '端侧隐私', desc: '多模态数据本地处理，仅脱敏统计上云，符合政务合规', color: 'text-cyan-300' },
              { icon: Shield, title: '安全可靠', desc: 'A15 独立安全飞地隔离决策，行为可追溯可审计', color: 'text-indigo-300' },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/[0.03] border border-white/10 hover:border-white/25 rounded-2xl p-6 transition-all duration-300"
                >
                  <Icon size={22} className={`${v.color} mb-3`} />
                  <h4 className="font-bold mb-1.5">{v.title}</h4>
                  <p className="text-xs text-white/55 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= Part 3: B/C/G 差异化部署 ================= */}
      <section id="deploy" className="relative py-20 md:py-28 bg-gradient-to-b from-[#05070f] via-[#07121a] to-[#05070f] overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-teal-400 uppercase mb-4">
              Part 03 · Differentiated Deployment
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
              面向三类客户的 <span className="bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">差异化模型部署</span>
            </h2>
            <p className="text-sm md:text-base text-white/62 max-w-2xl mx-auto">
              根据客户场景算力与隐私需求，森卫安护提供 7B / 14B / 26B 三档 Qwen3-Omni 端侧部署方案。
            </p>
          </motion.div>

          <div className="space-y-8 md:space-y-10">
            {deployments.map((dep, idx) => {
              const Icon = dep.icon;
              const reverse = idx % 2 === 1;
              return (
                <motion.div
                  key={dep.code}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  <TiltCard glow={dep.accent.glow} className="relative rounded-3xl overflow-hidden group/card">
                    <div className="relative aspect-[16/10] rounded-3xl border border-white/10 overflow-hidden">
                      <img
                        src={dep.image}
                        alt={dep.title}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent" />
                      <div className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-[1.4s] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                      <div className="absolute top-5 left-5 flex items-center gap-2">
                        <span className={`${dep.accent.bg} ${dep.accent.text} text-xs font-bold px-3 py-1.5 rounded-full`}>{dep.tag}</span>
                        <span className="bg-black/50 backdrop-blur text-white/80 text-[10px] font-semibold tracking-widest px-2.5 py-1.5 rounded-full">{dep.code}</span>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.08 }}
                        className={`absolute bottom-5 left-5 w-14 h-14 rounded-2xl bg-gradient-to-br ${dep.accent.from} ${dep.accent.to} flex items-center justify-center shadow-2xl`}
                      >
                        <Icon size={26} className="text-white" />
                      </motion.div>
                    </div>
                  </TiltCard>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`font-display text-sm font-black tracking-widest ${dep.accent.text}`}>{dep.model}</span>
                      <span className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 leading-tight">{dep.title}</h3>
                    <p className="text-sm text-white/62 leading-[1.9] mb-6">{dep.desc}</p>

                    <ul className="grid sm:grid-cols-2 gap-2.5 mb-6">
                      {dep.points.map((p, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.15 + i * 0.08 }}
                          className={`flex items-center gap-2.5 text-xs text-white/75 bg-white/[0.04] border ${dep.accent.border} rounded-xl px-3.5 py-2.5 hover:bg-white/[0.07] transition-all duration-300`}
                        >
                          <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${dep.accent.from} ${dep.accent.to} flex items-center justify-center`}>
                            <Check size={11} className="text-white" strokeWidth={3} />
                          </span>
                          {p}
                        </motion.li>
                      ))}
                    </ul>

                    <Link
                      to={dep.code === 'BUSINESS' ? '/b2b-eldercare' : dep.code === 'CONSUMER' ? '/c2c-family' : '/g2c-government'}
                      className={`inline-flex items-center gap-2 text-sm font-semibold ${dep.accent.text} group/link`}
                    >
                      <span className="bg-gradient-to-r from-current to-current bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover/link:bg-[length:100%_2px] pb-0.5">
                        查看{dep.tag}完整方案
                      </span>
                      <ArrowRight size={15} className="group-hover/link:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= Part 4: 对比表 ================= */}
      <section className="relative py-20 md:py-28 bg-[#05070f] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_55%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-amber-400 uppercase mb-4">
              Comparison · 部署对比
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              森卫安护 Qwen3-Omni <span className="bg-gradient-to-r from-cyan-300 to-amber-300 bg-clip-text text-transparent">模型部署对比</span>
            </h2>
            <p className="text-sm text-white/55">按客户类型匹配模型规格，精准匹配场景算力与隐私需求</p>
          </motion.div>

          {/* 表格 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.05] border-b border-white/10">
                  {['客户类型', '模型版本', '核心定位', '重点能力', '典型场景'].map((h) => (
                    <th key={h} className="text-left px-5 py-4 text-xs font-bold tracking-wider text-cyan-300 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <motion.tr
                    key={row.client}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.04] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className={`font-bold ${row.accent}`}>{row.client}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center bg-white/[0.06] border border-white/15 rounded-full px-2.5 py-1 text-xs font-mono">
                        {row.model}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-white/80">{row.position}</td>
                    <td className="px-5 py-4 text-white/60 text-xs leading-relaxed max-w-[220px]">{row.ability}</td>
                    <td className="px-5 py-4 text-white/60 text-xs">{row.scene}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* 关键指标 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { icon: Layers, value: 3, suffix: ' 档', label: '模型规格', desc: '7B / 14B / 26B' },
              { icon: Zap, value: 2, suffix: 'ms', decimals: 0, label: '端到端延迟', desc: '认知到执行闭环' },
              { icon: Lock, value: 100, suffix: '%', label: '端侧处理', desc: '隐私数据不出端' },
              { icon: Users, value: 3, suffix: ' 类', label: '客户覆盖', desc: 'B / C / G 全场景' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 rounded-2xl p-6 text-center transition-all duration-300"
                >
                  <Icon size={22} className="text-amber-300 mx-auto mb-3" />
                  <p className="font-display text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-300 to-amber-300 bg-clip-text text-transparent mb-1 tabular-nums">
                    <CountUp to={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                  </p>
                  <p className="text-sm font-semibold text-white/85">{s.label}</p>
                  <p className="text-[11px] text-white/40">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-20 md:py-24 bg-[#05070f] overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[340px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-600/20 via-[#07121a] to-amber-600/15 p-10 md:p-14 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-24 -right-24 w-64 h-64 border border-cyan-400/15 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-28 -left-28 w-72 h-72 border border-amber-400/15 rounded-full"
            />

            <Brain size={32} className="text-cyan-300 mx-auto mb-5" />
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
              为你的场景，匹配最合适的 AI 大脑
            </h3>
            <p className="text-sm text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
              无论是机构、家庭还是民政公益，森卫安护都能基于 Qwen3-Omni 与 AegisEdge A15 提供端到端养老 AI 方案。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-semibold text-black shadow-[0_10px_40px_-8px_rgba(34,211,238,0.6)] hover:-translate-y-0.5 transition-all duration-300"
              >
                探索守护方案
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 hover:border-cyan-400/60 hover:bg-white/5 rounded-full text-sm font-medium transition-all duration-300"
              >
                <ArrowLeft size={15} />
                返回上一页
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
