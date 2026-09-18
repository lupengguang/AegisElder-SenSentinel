import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  ArrowLeft, ArrowRight, Home, Cpu, Heart, BellRing, Video, ShieldAlert,
  Check, ChevronRight, ShieldCheck, Activity, Sparkles,
  User, Users, Wifi, WifiOff, Smile, MessageCircle, Pill, Navigation,
  Smartphone, MapPinned, Lock, Stethoscope, Clock, HeartHandshake,
} from 'lucide-react';

/* ====================================================================
 * 森卫安护｜C 端家庭用户完整解决方案
 * 核心硬件：AegisEdge Ai5 人形机器人边缘 AI 芯片
 * ==================================================================== */

/* ---------- 数字滚动计数组件 ---------- */
function CountUp({ to, duration = 1.8, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf;
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / (duration * 1000), 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setValue(to * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 150);
    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span className={className}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
}

/* ---------- 四大核心能力 ---------- */
const capabilities = [
  {
    no: '01',
    icon: Heart,
    title: '情感陪伴与对话解闷',
    subtitle: 'AegisEdge Ai5 本地多模态语音',
    desc:
      '依托 AegisEdge Ai5 算力，本地运行 Qwen3-Omni 多模态模型，支持方言识别、慢速口语交互。机器人可以陪老人日常聊天、回忆往事、朗读新闻戏曲、提醒日常起居；具备情绪感知能力，感知老人低落情绪主动安抚。对话全部本地处理，不用上传录音至云端，保护家庭隐私。',
    points: [
      { icon: MessageCircle, text: '日常聊天 · 回忆往事 · 朗读新闻戏曲' },
      { icon: Smile, text: '情绪感知，低落时主动安抚' },
      { icon: Clock, text: '起居作息定时提醒' },
      { icon: Lock, text: '对话本地处理，录音不上云' },
    ],
    tags: ['Qwen3-Omni', '方言识别', '情绪感知', '隐私本地'],
    accent: 'from-teal-400 to-emerald-500',
    glow: 'rgba(45,212,191,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20white%20humanoid%20robot%20chatting%20with%20smiling%20elderly%20grandparent%20on%20cozy%20sofa%20warm%20afternoon%20sunlight%20living%20room%20cinematic%20tender%20moment&image_size=landscape_16_9',
  },
  {
    no: '02',
    icon: BellRing,
    title: '一键紧急呼叫家人 · 自动险情上报',
    subtitle: 'AegisEdge Ai5 内置安全处理单元',
    desc:
      '老人身体不适时，一键触发紧急呼叫。AegisEdge Ai5 芯片内置安全处理单元，自动推送消息 + 实时画面到子女手机 App。即使老人无法手动操作，当系统识别异常险情时，机器人自动发起告警，优先联系紧急联系人，预留紧急医疗通话通道。',
    points: [
      { icon: BellRing, text: '一键紧急呼叫，直达子女手机' },
      { icon: Smartphone, text: '消息 + 实时画面 App 双推送' },
      { icon: ShieldAlert, text: '异常险情自动告警，无需手动' },
      { icon: Stethoscope, text: '预留紧急医疗通话通道' },
    ],
    tags: ['一键呼叫', '自动告警', '实时画面', '医疗通道'],
    accent: 'from-rose-400 to-amber-400',
    glow: 'rgba(251,113,133,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elderly%20person%20pressing%20emergency%20button%20on%20friendly%20robot%20screen%20smartphone%20alert%20notification%20to%20family%20warm%20home%20cinematic%20soft%20light&image_size=landscape_16_9',
  },
  {
    no: '03',
    icon: Video,
    title: '远程视频随时探亲，居家漫游探视',
    subtitle: 'SLAM 室内建图 · 自主避障行走',
    desc:
      '子女通过手机 App 远程操控森卫安护在家内自主移动，机器人摄像头实时传回家中画面。AegisEdge Ai5 内置 SLAM 室内建图，机器人可在居家环境自主避障行走，子女不在家也能“走进房间”看望老人，实现异地远程陪伴探视。',
    points: [
      { icon: Video, text: '手机 App 实时高清视频回传' },
      { icon: Navigation, text: '远程操控机器人居家漫游' },
      { icon: MapPinned, text: 'SLAM 室内建图，自主避障' },
      { icon: HeartHandshake, text: '异地子女“走进房间”探亲' },
    ],
    tags: ['远程视频', '居家漫游', 'SLAM 建图', '自主避障'],
    accent: 'from-cyan-400 to-teal-400',
    glow: 'rgba(34,211,238,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=family%20member%20video%20calling%20elderly%20parent%20through%20screen%20on%20humanoid%20robot%20moving%20through%20cozy%20apartment%20warm%20cinematic%20technology%20lifestyle&image_size=landscape_16_9',
  },
  {
    no: '04',
    icon: ShieldAlert,
    title: '摔倒监测与用药、健康定时提醒',
    subtitle: '本地视觉推理 · 断网依旧判定险情',
    desc:
      'AegisEdge Ai5 本地视觉推理，实时识别居家跌倒、长时间倒地不起等危险情况，本地毫秒级识别，网络断连依旧可以本地判定险情。自定义定时任务：按时推送吃药、血压测量、复诊、喝水休息提醒；记录健康打卡日志，同步给子女。',
    points: [
      { icon: ShieldAlert, text: '跌倒 / 久卧本地毫秒级识别' },
      { icon: WifiOff, text: '断网环境依旧本地判定告警' },
      { icon: Pill, text: '吃药 / 血压 / 复诊 / 喝水提醒' },
      { icon: Activity, text: '健康打卡日志同步子女' },
    ],
    tags: ['本地视觉', '断网告警', '用药提醒', '健康日志'],
    accent: 'from-emerald-400 to-green-500',
    glow: 'rgba(52,211,153,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20home%20care%20robot%20reminding%20elderly%20person%20to%20take%20medicine%20with%20health%20reminder%20interface%20bright%20warm%20bedroom%20cinematic%20caring%20scene&image_size=landscape_16_9',
  },
];

/* ---------- 业务价值 ---------- */
const valueStats = [
  { icon: Heart, value: 98, suffix: '%', decimals: 0, label: '家庭满意度', desc: '真实家庭长期使用反馈' },
  { icon: Clock, value: 7, suffix: ' 天', decimals: 0, label: '无理由上门试用', desc: '满意后再决定留下' },
  { icon: WifiOff, value: 24, suffix: 'h', decimals: 0, label: '断网本地安全守护', desc: '险情判定不依赖云端' },
  { icon: Activity, value: 100, suffix: '%', decimals: 0, label: '影像语音本地计算', desc: '家庭隐私不出户' },
];

/* ---------- 适用家庭 ---------- */
const families = [
  { icon: Home, name: '居家养老家庭', desc: '长者在家安享晚年' },
  { icon: User, name: '独居长者', desc: '24h 安全陪护在岗' },
  { icon: Users, name: '空巢家庭', desc: '情感陪伴缓解孤独' },
  { icon: Smartphone, name: '异地子女家庭', desc: '远程随时掌握状态' },
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

export default function C2CFamily() {
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
      className="page-enter bg-[#050510] text-white min-h-screen overflow-x-hidden"
    >
      {/* 顶部滚动进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-emerald-500 to-cyan-400 origin-left z-[60]"
        style={{ scaleX: progressScale }}
      />

      {/* 固定返回按钮 */}
      <motion.button
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={handleBack}
        className="fixed top-5 left-5 z-50 group flex items-center gap-2.5 bg-black/55 backdrop-blur-xl border border-white/15 hover:border-teal-400/60 rounded-full pl-3 pr-5 py-2.5 text-xs font-medium text-white/85 hover:text-teal-200 transition-all duration-300 hover:shadow-[0_0_28px_rgba(45,212,191,0.35)]"
      >
        <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-teal-400/25 flex items-center justify-center transition-all duration-300 group-hover:-translate-x-0.5">
          <ArrowLeft size={13} />
        </span>
        返回
        <kbd className="hidden sm:inline-flex items-center text-[9px] text-white/35 border border-white/15 rounded px-1.5 py-0.5 ml-1">ESC</kbd>
      </motion.button>

      {/* ================= Hero ================= */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: bgY, scale: heroScale }} className="absolute inset-0 z-0">
          <img
            src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20white%20humanoid%20companion%20robot%20with%20happy%20three%20generation%20family%20elderly%20couple%20grandchild%20in%20warm%20cozy%20sunlit%20living%20room%20cinematic%20wide%20shot%20tender&image_size=landscape_16_9"
            alt="森卫安护机器人陪伴家庭三代人"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(20,184,166,0.4),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_68%,rgba(251,191,36,0.22),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/70 via-[#050510]/55 to-[#050510]" />
        </motion.div>

        {/* 网格底纹 */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(45,212,191,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.45) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* 浮动粒子（暖色 + 青色） */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                backgroundColor: i % 3 === 0 ? '#fcd34d' : '#5eead4',
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
            <span className="inline-flex items-center gap-1.5 bg-teal-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-[0_0_30px_rgba(20,184,166,0.5)]">
              <Home size={15} />
              C 端
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/25 text-white/90 text-xs font-semibold tracking-[0.35em] px-5 py-2 rounded-full">
              CONSUMER
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-5"
          >
            家庭用户・陪伴与安全守护
            <br />
            <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              进家门
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="text-sm md:text-base text-white/70 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            AegisElder SenSentinel 森卫安护人形陪护机器人，搭载
            <span className="text-teal-300 font-semibold"> AegisEdge Ai5 边缘 AI 芯片</span>
            ，把不下班的家庭安全陪护助手带入居家养老场景。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="inline-flex items-center gap-3 bg-white/[0.06] backdrop-blur-xl border border-teal-400/30 rounded-2xl px-5 py-3 mb-9"
          >
            <motion.span
              animate={{ boxShadow: [
                '0 0 18px rgba(45,212,191,0.35)',
                '0 0 34px rgba(45,212,191,0.65)',
                '0 0 18px rgba(45,212,191,0.35)',
              ] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center"
            >
              <Cpu size={18} className="text-white" />
            </motion.span>
            <div className="text-left">
              <p className="text-xs font-bold text-teal-200 tracking-wider">AegisEdge Ai5</p>
              <p className="text-[10px] text-white/45">边缘 AI 芯片 · 本地多模态计算 · 隐私不出户</p>
            </div>
            <Link
              to="/chip-3d"
              className="ml-2 text-[10px] text-teal-300/80 hover:text-teal-200 border border-teal-400/30 hover:border-teal-400/70 rounded-full px-3 py-1.5 transition-all whitespace-nowrap"
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
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full text-sm font-semibold shadow-[0_10px_40px_-8px_rgba(20,184,166,0.6)] hover:shadow-[0_14px_50px_-6px_rgba(20,184,166,0.8)] hover:-translate-y-0.5 transition-all duration-300"
            >
              查看四大核心能力
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#value"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 hover:border-teal-400/60 hover:bg-white/5 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300"
            >
              家庭价值与试用
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
              className="w-1 h-2 bg-teal-300 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ================= 开篇介绍 ================= */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#050510] via-[#07110f] to-[#050510] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-teal-600/12 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-teal-400/50 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-amber-400/50 rounded-br-3xl" />

            <div className="flex items-center gap-3 mb-6">
              <Heart size={22} className="text-teal-300" />
              <p className="text-xs font-semibold tracking-[0.35em] text-teal-400 uppercase">
                Overview · 方案概述
              </p>
            </div>

            <p className="text-base md:text-lg text-white/78 leading-[1.95] mb-8">
              为居家养老的长者家庭配备一位 24 小时在岗的
              <span className="text-teal-300 font-semibold">「机器保姆」</span>
              。森卫安护搭载<span className="text-teal-300 font-semibold"> AegisEdge Ai5 边缘 AI 芯片</span>
              ，在家庭本地端侧运行 <span className="text-emerald-300 font-semibold">Qwen3-Omni 多模态大模型</span>
              ，大部分感知、识别、对话计算在机器人本地完成，不依赖持续云端连接，保护家庭隐私。面向独居老人、空巢家庭，提供全天候情感陪伴、居家跌倒监测、一键紧急呼叫、子女远程探视，让异地子女实时掌握老人居家安全状态，兼顾老人情感需求与家庭安全防护。
            </p>

            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: Cpu, text: 'AegisEdge Ai5 端侧芯片' },
                { icon: Sparkles, text: 'Qwen3-Omni 多模态大模型' },
                { icon: Lock, text: '影像语音本地处理' },
                { icon: Wifi, text: '不依赖持续云端' },
                { icon: Heart, text: '全天候情感陪伴' },
                { icon: ShieldCheck, text: '跌倒监测 · 紧急呼叫' },
              ].map((tag, i) => {
                const Icon = tag.icon;
                return (
                  <motion.span
                    key={tag.text}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/15 hover:border-teal-400/50 hover:bg-teal-500/10 rounded-full px-4 py-2 text-xs text-white/80 transition-all duration-300 cursor-default"
                  >
                    <Icon size={13} className="text-teal-300" />
                    {tag.text}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* 适用家庭 */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {families.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  whileHover={{ y: -6 }}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/10 hover:border-teal-400/50 rounded-2xl px-4 py-4 transition-all duration-300 group"
                >
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/25 to-emerald-500/15 border border-teal-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={18} className="text-teal-300" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white/90">{f.name}</p>
                    <p className="text-[10px] text-white/45">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 四大核心能力 ================= */}
      <section id="capabilities" className="relative py-20 md:py-28 bg-[#050510] overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-[480px] h-[480px] bg-teal-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-[480px] h-[480px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-teal-400 uppercase mb-4">
              Core Capabilities · 四大核心能力
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              一位不下班的 <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">家庭陪护</span>
            </h2>
            <p className="text-sm text-white/55 max-w-2xl mx-auto">
              陪伴、呼叫、探视、守护，AegisEdge Ai5 让居家养老的每一天都安心、温暖、有回应。
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent" />
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
                    <p className="text-xs md:text-sm text-teal-300/90 font-medium mb-5">{cap.subtitle}</p>
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
                            className="flex items-center gap-2.5 text-xs text-white/75 bg-white/[0.04] border border-white/8 rounded-xl px-3.5 py-2.5 hover:border-teal-400/40 hover:bg-white/[0.07] transition-all duration-300"
                          >
                            <PIcon size={14} className="text-teal-300 flex-shrink-0" />
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
      <section id="value" className="relative py-20 md:py-28 bg-gradient-to-b from-[#050510] via-[#07110f] to-[#050510] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.2),transparent_55%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(45,212,191,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.5) 1px, transparent 1px)',
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
            <p className="text-xs font-semibold tracking-[0.4em] text-teal-400 uppercase mb-4">
              Family Value · 家庭价值
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">98%</span>
              {' '}家庭满意度
            </h2>
            <p className="text-sm text-white/55">7 天无理由上门试用 —— 让陪伴先住进家里，再做决定</p>
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
                  className="group relative bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-teal-400/50 rounded-2xl p-6 md:p-7 overflow-hidden transition-all duration-300"
                >
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500/25 to-emerald-500/15 border border-teal-400/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Icon size={20} className="text-teal-300" />
                  </div>
                  <p className="font-display text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent mb-2 tabular-nums">
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
              <HeartHandshake size={20} className="text-teal-300" />
              <h3 className="font-display text-lg font-bold">家庭安心清单</h3>
            </div>
            <ul className="space-y-4">
              {[
                '本地端侧计算，居家影像语音不上传云端，保障家庭隐私',
                '跌倒风险本地识别，断网环境下依旧支持基础安全告警',
                '减轻异地子女心理焦虑，远程随时关注长辈状态',
                '轻量化居家部署，适配普通住宅、小户型环境',
              ].map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3.5 text-sm text-white/75 leading-relaxed group/item"
                >
                  <span className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center group-hover/item:scale-125 transition-transform duration-300">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </span>
                  {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ================= 上门试用流程 + CTA ================= */}
      <section className="relative py-20 md:py-28 bg-[#050510] overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-emerald-400 uppercase mb-4">
              Home Trial · 上门试用
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">四步入家，安心试用</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { step: 'STEP 1', title: '需求沟通', desc: '了解长者居住环境、健康状况与照护重点' },
              { step: 'STEP 2', title: '上门安装', desc: '轻量化部署，SLAM 快速建图，无需改造住宅' },
              { step: 'STEP 3', title: '7 天试用', desc: '全家真实体验陪伴、呼叫、探视与守护' },
              { step: 'STEP 4', title: '无忧售后', desc: '不满意无理由退回，留下即享长期运维' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="relative bg-white/[0.04] border border-white/10 hover:border-emerald-400/50 rounded-2xl p-6 transition-all duration-300"
              >
                <span className="text-[10px] font-black tracking-[0.25em] text-emerald-300/90">{s.step}</span>
                <h3 className="font-display text-lg font-bold mt-2 mb-2">{s.title}</h3>
                <p className="text-xs text-white/55 leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <ChevronRight size={18} className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-emerald-400/50 z-10" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-teal-600/20 via-[#071412] to-emerald-600/20 p-10 md:p-14 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-24 -right-24 w-64 h-64 border border-teal-400/15 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-28 -left-28 w-72 h-72 border border-emerald-400/15 rounded-full"
            />

            <Home size={30} className="text-teal-300 mx-auto mb-5" />
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
              把不下班的陪护助手，请进家门
            </h3>
            <p className="text-sm text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
              预约 7 天免费上门试用，森卫安护家庭顾问将根据长者情况定制陪伴与安全方案，满意后再决定留下。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                to="/products?category=%E5%AE%B6%E5%BA%A5C%E7%AB%AF"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full text-sm font-semibold shadow-[0_10px_40px_-8px_rgba(20,184,166,0.6)] hover:-translate-y-0.5 transition-all duration-300"
              >
                预约 7 天免费上门试用
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 hover:border-teal-400/60 hover:bg-white/5 rounded-full text-sm font-medium transition-all duration-300"
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
