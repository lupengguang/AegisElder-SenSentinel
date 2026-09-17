import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  ArrowLeft, ArrowRight, Landmark, Cpu, ShieldAlert, Building2, BarChart3,
  Check, ChevronRight, ShieldCheck, Activity, Sparkles,
  Users, MapPinned, ClipboardList, Lock, Megaphone, BookOpen,
  Smartphone, Database, FileCheck, Heart, FileText,
} from 'lucide-react';

/* ====================================================================
 * 森卫安护｜G 端民政公益板块完整解决方案
 * 核心硬件：AegisEdge Ai5 人形机器人边缘 AI 芯片
 * 适用：民政局、街道社区、养老服务中心、社区养老驿站、公益养老项目
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

/* ---------- 四大核心能力 ---------- */
const capabilities = [
  {
    no: '01',
    icon: ClipboardList,
    title: '社区重点老人常态化智能巡访',
    subtitle: 'AegisEdge Ai5 本地多模态感知',
    desc:
      'AegisEdge Ai5 提供端侧多模态感知能力，机器人在社区养老驿站或入户开展自助探访。自动问询长者身体状况、精神状态、生活困难，生成标准化探访记录；针对独居、失能高危老人定期巡检，减轻社区网格员上门走访压力，解决基层人手不足、走访频次不足的痛点。',
    points: [
      { icon: Users, text: '自动问询身体 / 精神 / 生活状况' },
      { icon: FileText, text: '生成标准化探访记录' },
      { icon: ShieldAlert, text: '独居失能高危老人定期巡检' },
      { icon: Activity, text: '减轻网格员走访频次压力' },
    ],
    tags: ['端侧感知', '标准化记录', '定期巡检', '人力减负'],
    accent: 'from-indigo-500 to-purple-500',
    glow: 'rgba(99,102,241,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20care%20robot%20visiting%20elderly%20person%20at%20home%20community%20worker%20observing%20warm%20bright%20apartment%20cinematic%20public%20service%20scene&image_size=landscape_16_9',
  },
  {
    no: '02',
    icon: ShieldAlert,
    title: '社区长者安全风险预警与分级上报',
    subtitle: 'AegisEdge Ai5 本地视觉推理 · 分级推送',
    desc:
      '依靠 AegisEdge Ai5 本地视觉推理，识别跌倒、长时间独处不动等高危场景。告警信息分级推送：一级险情推送社区网格员、民政应急专员；普通健康提醒留存至民生监管后台。端侧本地预处理数据，仅同步脱敏后的统计信息至政务平台，严格保障居民个人隐私，符合政务数据安全规范。',
    points: [
      { icon: ShieldAlert, text: '跌倒 / 久卧本地视觉识别' },
      { icon: Users, text: '一级险情推网格员 + 应急专员' },
      { icon: ClipboardList, text: '普通提醒留存民生监管后台' },
      { icon: Lock, text: '脱敏统计同步政务平台' },
    ],
    tags: ['本地视觉', '分级上报', '隐私脱敏', '政务合规'],
    accent: 'from-fuchsia-500 to-rose-500',
    glow: 'rgba(217,70,239,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=alert%20notification%20dashboard%20showing%20elderly%20fall%20detection%20robot%20in%20background%20urgent%20red%20and%20blue%20interface%20cinematic%20government%20control%20center&image_size=landscape_16_9',
  },
  {
    no: '03',
    icon: Building2,
    title: '社区养老驿站公共服务，普惠老年群体',
    subtitle: '大模型轻量化本地推理 · 多方言交互',
    desc:
      '部署在社区养老服务站，面向辖区老人提供集中式服务：健康科普、慢病宣教、心理疏导、文娱陪伴、智能教学（教老人使用手机）。AegisEdge Ai5 支持大模型轻量化本地推理，支持多方言交互，降低老年人使用门槛，作为社区养老公共服务的数字化基础设施。',
    points: [
      { icon: BookOpen, text: '健康科普 · 慢病宣教' },
      { icon: Heart, text: '心理疏导 · 文娱陪伴' },
      { icon: Smartphone, text: '智能教学：教老人用手机' },
      { icon: Users, text: '多方言交互，降低使用门槛' },
    ],
    tags: ['健康宣教', '文娱陪伴', '手机教学', '多方言'],
    accent: 'from-violet-500 to-indigo-500',
    glow: 'rgba(139,92,246,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20service%20robot%20teaching%20elderly%20group%20to%20use%20smartphones%20in%20bright%20community%20elderly%20service%20center%20warm%20friendly%20cinematic%20wide%20shot&image_size=landscape_16_9',
  },
  {
    no: '04',
    icon: BarChart3,
    title: '养老民生数据看板，政务平台对接',
    subtitle: 'AegisEdge Ai5 安全隔离单元 · 脱敏加密',
    desc:
      '所有采集数据经过 AegisEdge Ai5 安全隔离单元脱敏加密，可对接民政养老监管平台。后台可视化看板展示辖区老人分布、风险事件统计、服务覆盖率、巡访完成率。为民政部门提供客观民生数据，支撑养老政策评估、财政项目验收、社区养老资源调配。',
    points: [
      { icon: Lock, text: '安全隔离单元脱敏加密' },
      { icon: Database, text: '对接民政养老监管平台' },
      { icon: BarChart3, text: '分布 / 风险 / 覆盖率可视化' },
      { icon: FileCheck, text: '支撑政策评估与项目验收' },
    ],
    tags: ['数据脱敏', '监管对接', '可视化看板', '验收报表'],
    accent: 'from-indigo-500 to-blue-500',
    glow: 'rgba(99,102,241,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=large%20government%20data%20dashboard%20screen%20showing%20elderly%20care%20statistics%20maps%20and%20charts%20dark%20blue%20tech%20interface%20cinematic%20wide%20angle%20control%20room&image_size=landscape_16_9',
  },
];

/* ---------- 业务价值 ---------- */
const valueStats = [
  { icon: Users, value: 70, suffix: '%', decimals: 0, label: '社区巡访人力减负', desc: '网格员走访频次压力显著降低' },
  { icon: ShieldCheck, value: 95, suffix: '%', decimals: 0, label: '高危长者风险覆盖率', desc: '独居失能老人风险台账全覆盖' },
  { icon: Lock, value: 100, suffix: '%', decimals: 0, label: '数据脱敏合规上报', desc: '符合政务数据安全规范' },
  { icon: MapPinned, value: 200, suffix: '+', decimals: 0, label: '社区落地数量', desc: '支持政府采购招投标' },
];

/* ---------- 适用对象 ---------- */
const clients = [
  { icon: Landmark, name: '民政局', desc: '养老民生监测与政策评估' },
  { icon: Building2, name: '街道社区服务中心', desc: '长者关爱巡访与风险预警' },
  { icon: Heart, name: '社区养老驿站', desc: '普惠型公共服务数字化' },
  { icon: Users, name: '公益养老项目', desc: '惠民政策宣讲与服务留痕' },
];

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

export default function G2CGovernment() {
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
      className="page-enter bg-[#08060f] text-white min-h-screen overflow-x-hidden"
    >
      {/* 顶部滚动进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-400 via-purple-500 to-violet-400 origin-left z-[60]"
        style={{ scaleX: progressScale }}
      />

      {/* 固定返回按钮 */}
      <motion.button
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={handleBack}
        className="fixed top-5 left-5 z-50 group flex items-center gap-2.5 bg-black/55 backdrop-blur-xl border border-white/15 hover:border-indigo-400/60 rounded-full pl-3 pr-5 py-2.5 text-xs font-medium text-white/85 hover:text-indigo-200 transition-all duration-300 hover:shadow-[0_0_28px_rgba(99,102,241,0.35)]"
      >
        <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-indigo-400/25 flex items-center justify-center transition-all duration-300 group-hover:-translate-x-0.5">
          <ArrowLeft size={13} />
        </span>
        返回
        <kbd className="hidden sm:inline-flex items-center text-[9px] text-white/35 border border-white/15 rounded px-1.5 py-0.5 ml-1">ESC</kbd>
      </motion.button>

      {/* ================= Hero ================= */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: bgY, scale: heroScale }} className="absolute inset-0 z-0">
          <img
            src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20service%20robot%20in%20modern%20community%20elderly%20service%20center%20with%20government%20officials%20and%20senior%20citizens%20bright%20official%20hall%20cinematic%20wide%20angle%20public%20service&image_size=landscape_16_9"
            alt="森卫安护机器人服务社区养老驿站"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(99,102,241,0.4),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_68%,rgba(217,70,239,0.22),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08060f]/70 via-[#08060f]/55 to-[#08060f]" />
        </motion.div>

        {/* 网格底纹 */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(129,140,248,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.45) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* 浮动粒子（靛紫 + 品红） */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                backgroundColor: i % 3 === 0 ? '#e879f9' : '#a5b4fc',
              }}
              animate={{ y: [0, -46, 0], opacity: [0.12, 0.7, 0.12] }}
              transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: (i % 7) * 0.4, ease: 'easeInOut' }}
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
            <span className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-[0_0_30px_rgba(79,70,229,0.5)]">
              <Landmark size={15} />
              G 端
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/25 text-white/90 text-xs font-semibold tracking-[0.35em] px-5 py-2 rounded-full">
              GOVERNMENT
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-5"
          >
            民政与社区・普惠养老
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-400 to-violet-300 bg-clip-text text-transparent">
              公共服务方案
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="text-sm md:text-base text-white/70 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            AegisElder SenSentinel 森卫安护人形陪护机器人，搭载
            <span className="text-indigo-300 font-semibold"> AegisEdge Ai5 边缘 AI 芯片</span>
            ，助力社区居家养老服务数字化落地，完善基层长者安全保障体系。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="inline-flex items-center gap-3 bg-white/[0.06] backdrop-blur-xl border border-indigo-400/30 rounded-2xl px-5 py-3 mb-9"
          >
            <motion.span
              animate={{ boxShadow: [
                '0 0 18px rgba(129,140,248,0.35)',
                '0 0 34px rgba(129,140,248,0.65)',
                '0 0 18px rgba(129,140,248,0.35)',
              ] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
            >
              <Cpu size={18} className="text-white" />
            </motion.span>
            <div className="text-left">
              <p className="text-xs font-bold text-indigo-200 tracking-wider">AegisEdge Ai5</p>
              <p className="text-[10px] text-white/45">边缘 AI 芯片 · 端侧安全隔离 · 政务合规</p>
            </div>
            <Link
              to="/chip-3d"
              className="ml-2 text-[10px] text-indigo-300/80 hover:text-indigo-200 border border-indigo-400/30 hover:border-indigo-400/70 rounded-full px-3 py-1.5 transition-all whitespace-nowrap"
            >
              查看 3D 拆解
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#capabilities"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-sm font-semibold shadow-[0_10px_40px_-8px_rgba(79,70,229,0.6)] hover:shadow-[0_14px_50px_-6px_rgba(79,70,229,0.8)] hover:-translate-y-0.5 transition-all duration-300"
            >
              查看四大核心能力
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#value"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 hover:border-indigo-400/60 hover:bg-white/5 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300"
            >
              政务价值与对接
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
              className="w-1 h-2 bg-indigo-300 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ================= 开篇介绍 ================= */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#08060f] via-[#0c0818] to-[#08060f] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-indigo-600/12 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-indigo-400/50 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-fuchsia-400/50 rounded-br-3xl" />

            <div className="flex items-center gap-3 mb-6">
              <Landmark size={22} className="text-indigo-300" />
              <p className="text-xs font-semibold tracking-[0.35em] text-indigo-400 uppercase">
                Overview · 方案概述
              </p>
            </div>

            <p className="text-base md:text-lg text-white/78 leading-[1.95] mb-8">
              面向民政部门、街道社区服务中心、社区养老驿站，打造
              <span className="text-indigo-300 font-semibold">普惠型社区智慧养老公共服务方案</span>
              。森卫安护搭载<span className="text-indigo-300 font-semibold"> AegisEdge Ai5 边缘 AI 芯片</span>
              ，本地端侧运行 <span className="text-purple-300 font-semibold">Qwen3-Omni 多模态大模型</span>
              ，依托端侧算力完成社区老人风险感知、健康随访、重点人群监护。助力基层落实独居、空巢、失能、低保长者关爱巡访，补齐社区养老人力缺口，建立长者安全风险台账，形成「社区驿站 + 入户看护 + 数据监管」一体化养老服务底座，辅助民政单位做养老民生监测、风险预警与服务成效统计。
            </p>

            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: Cpu, text: 'AegisEdge Ai5 端侧芯片' },
                { icon: Sparkles, text: 'Qwen3-Omni 多模态大模型' },
                { icon: Lock, text: '安全隔离单元脱敏加密' },
                { icon: ShieldCheck, text: '政务数据合规对接' },
                { icon: Users, text: '独居失能长者关爱巡访' },
                { icon: BarChart3, text: '民生监测与成效统计' },
              ].map((tag, i) => {
                const Icon = tag.icon;
                return (
                  <motion.span
                    key={tag.text}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/15 hover:border-indigo-400/50 hover:bg-indigo-500/10 rounded-full px-4 py-2 text-xs text-white/80 transition-all duration-300 cursor-default"
                  >
                    <Icon size={13} className="text-indigo-300" />
                    {tag.text}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* 适用对象 */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {clients.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  whileHover={{ y: -6 }}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/10 hover:border-indigo-400/50 rounded-2xl px-4 py-4 transition-all duration-300 group"
                >
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/25 to-purple-500/15 border border-indigo-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={18} className="text-indigo-300" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white/90">{c.name}</p>
                    <p className="text-[10px] text-white/45">{c.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 四大核心能力 ================= */}
      <section id="capabilities" className="relative py-20 md:py-28 bg-[#08060f] overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-[480px] h-[480px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-[480px] h-[480px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-indigo-400 uppercase mb-4">
              Core Capabilities · 四大核心能力
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              普惠型社区养老的 <span className="bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">数字化底座</span>
            </h2>
            <p className="text-sm text-white/55 max-w-2xl mx-auto">
              巡访、预警、服务、监管，AegisEdge Ai5 助力民政把长者安全网织密到基层最后一公里。
            </p>
            <div className="section-divider" />
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              const reverse = idx % 2 === 1;
              return (
                <motion.div
                  key={cap.no}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  <TiltCard glow={cap.glow} className="relative rounded-3xl overflow-hidden group/card">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10">
                      <img
                        src={cap.image}
                        alt={cap.title}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08060f] via-transparent to-transparent" />
                      <div className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-[1.4s] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                      <span className="absolute top-5 right-6 font-display text-7xl md:text-8xl font-black text-white/10 select-none leading-none">
                        {cap.no}
                      </span>
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.08 }}
                        className={`absolute bottom-5 left-5 w-14 h-14 rounded-2xl bg-gradient-to-br ${cap.accent} flex items-center justify-center shadow-2xl`}
                      >
                        <Icon size={26} className="text-white" />
                      </motion.div>
                    </div>
                  </TiltCard>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`font-display text-sm font-black tracking-widest bg-gradient-to-r ${cap.accent} bg-clip-text text-transparent`}>
                        CAPABILITY {cap.no}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 leading-tight">
                      {cap.title}
                    </h3>
                    <p className="text-xs md:text-sm text-indigo-300/90 font-medium mb-5">{cap.subtitle}</p>
                    <p className="text-sm text-white/62 leading-[1.9] mb-6">{cap.desc}</p>

                    <ul className="grid sm:grid-cols-2 gap-2.5 mb-6">
                      {cap.points.map((p, i) => {
                        const PIcon = p.icon;
                        return (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            className="flex items-center gap-2.5 text-xs text-white/75 bg-white/[0.04] border border-white/8 rounded-xl px-3.5 py-2.5 hover:border-indigo-400/40 hover:bg-white/[0.07] transition-all duration-300"
                          >
                            <PIcon size={14} className="text-indigo-300 flex-shrink-0" />
                            {p.text}
                          </motion.li>
                        );
                      })}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {cap.tags.map((t) => (
                        <span
                          key={t}
                          className={`text-[10px] font-semibold tracking-wider bg-gradient-to-r ${cap.accent} bg-opacity-15 text-white/90 border border-white/15 rounded-full px-3 py-1`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 业务价值 ================= */}
      <section id="value" className="relative py-20 md:py-28 bg-gradient-to-b from-[#08060f] via-[#0c0818] to-[#08060f] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.2),transparent_55%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(129,140,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.5) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-indigo-400 uppercase mb-4">
              Government Value · 政务价值
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">巡访人力减负 70%</span>
              {' '}· 风险覆盖 95%
            </h2>
            <p className="text-sm text-white/55">脱敏数据合规上报 · 支撑民政普惠养老采购与公益试点项目申报</p>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {valueStats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-indigo-400/50 rounded-2xl p-6 md:p-7 overflow-hidden transition-all duration-300"
                >
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/25 to-purple-500/15 border border-indigo-400/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Icon size={20} className="text-indigo-300" />
                  </div>
                  <p className="font-display text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent mb-2 tabular-nums">
                    <CountUp to={s.value} suffix={s.suffix} prefix={s.prefix || ''} decimals={s.decimals} />
                  </p>
                  <p className="text-sm font-semibold text-white/85 mb-1">{s.label}</p>
                  <p className="text-[11px] text-white/40">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck size={20} className="text-indigo-300" />
              <h3 className="font-display text-lg font-bold">政务合规与项目交付清单</h3>
            </div>
            <ul className="space-y-4">
              {[
                '脱敏数据上报，符合政务隐私与数据安全法规',
                '补齐基层网格员人手短板，提升独居老人关爱频次',
                '可纳入民政普惠养老采购、公益试点项目申报',
                '完整服务台账，自动产出项目验收报表',
              ].map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3.5 text-sm text-white/75 leading-relaxed group/item"
                >
                  <span className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover/item:scale-125 transition-transform duration-300">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </span>
                  {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ================= 部署对接流程 + CTA ================= */}
      <section className="relative py-20 md:py-28 bg-[#08060f] overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-purple-400 uppercase mb-4">
              Deployment · 部署对接
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">四步落地，对接政务监管</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { step: 'STEP 1', title: '需求勘测', desc: '走访辖区长者分布、驿站场地与民政监管需求' },
              { step: 'STEP 2', title: '机器人部署', desc: '驿站集中部署 + 重点老人入户，SLAM 快速建图' },
              { step: 'STEP 3', title: '政务平台对接', desc: 'Ai5 安全隔离单元脱敏加密，对接监管平台' },
              { step: 'STEP 4', title: '运营陪跑', desc: '完整服务台账自动产出，支撑项目验收' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="relative bg-white/[0.04] border border-white/10 hover:border-purple-400/50 rounded-2xl p-6 transition-all duration-300"
              >
                <span className="text-[10px] font-black tracking-[0.25em] text-purple-300/90">{s.step}</span>
                <h3 className="font-display text-lg font-bold mt-2 mb-2">{s.title}</h3>
                <p className="text-xs text-white/55 leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <ChevronRight size={18} className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-purple-400/50 z-10" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-indigo-600/20 via-[#0c0818] to-purple-600/20 p-10 md:p-14 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-24 -right-24 w-64 h-64 border border-indigo-400/15 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-28 -left-28 w-72 h-72 border border-purple-400/15 rounded-full"
            />

            <Landmark size={30} className="text-indigo-300 mx-auto mb-5" />
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
              携手民政，共建普惠养老服务底座
            </h3>
            <p className="text-sm text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
              联系森卫安护政务合作团队，获取民政试点合作方案，支持政府采购招投标与公益试点项目申报。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                to="/products?category=%E6%B0%91%E6%94%BF%E5%85%AC%E7%9B%8AG%E7%AB%AF"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-sm font-semibold shadow-[0_10px_40px_-8px_rgba(79,70,229,0.6)] hover:-translate-y-0.5 transition-all duration-300"
              >
                获取民政试点合作方案
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 hover:border-indigo-400/60 hover:bg-white/5 rounded-full text-sm font-medium transition-all duration-300"
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
