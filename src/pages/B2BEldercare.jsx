import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  ArrowLeft, ArrowRight, Building2, Cpu, Radar, BellRing, HeartHandshake,
  BarChart3, Check, ChevronRight, ShieldCheck, Activity, Sparkles,
  Hospital, Home, Stethoscope, Network, Zap, Lock, Eye, MessageCircle,
  Moon, FileText, TrendingDown, Scale, PhoneCall,
} from 'lucide-react';

/* ====================================================================
 * 森卫安护｜B 端养老机构完整解决方案
 * 核心硬件：AegisEdge A15 人形机器人边缘 AI 芯片
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
      // easeOutExpo
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

/* ---------- 四大核心能力数据 ---------- */
const capabilities = [
  {
    no: '01',
    icon: Radar,
    title: '24 小时自主巡护查房',
    subtitle: 'AegisEdge A15 本地视觉导航',
    desc:
      'AegisEdge A15 芯片内置 SLAM 建图与多模态感知单元，机器人按照机构预设路线自主巡逻病房、公共活动区。自动记录老人房间状态、环境温湿度、异常滞留，生成标准化查房日志，实时同步到机构护理后台看板；夜间低光照环境下依然稳定识别，无需人工陪同巡检。',
    points: [
      { icon: Radar, text: 'SLAM 自主建图与路径规划' },
      { icon: FileText, text: '标准化查房日志自动生成' },
      { icon: Moon, text: '夜间低光照稳定识别' },
      { icon: Activity, text: '温湿度 / 异常滞留实时记录' },
    ],
    tags: ['SLAM 建图', '多模态感知', '护理后台同步'],
    accent: 'from-cyan-400 to-blue-500',
    glow: 'rgba(34,211,238,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20caregiver%20robot%20patrolling%20quiet%20nursing%20home%20corridor%20at%20night%20soft%20blue%20light%20cinematic%20futuristic%20depth%20of%20field&image_size=landscape_16_9',
  },
  {
    no: '02',
    icon: BellRing,
    title: '跌倒识别即时报警',
    subtitle: '端侧本地推理 · 毫秒级低延迟',
    desc:
      '依托 AegisEdge A15 的 1280TOPS 端侧 AI 算力，本地实时运行人体姿态识别模型。摄像头捕捉到老人跌倒、长时间躺卧不动等高危场景不等待云端传输，毫秒级触发本地告警。自动向护理站平板、护工手机推送告警 + 现场截图 / 短视频，附带老人位置，大幅缩短急救响应时间。',
    points: [
      { icon: Zap, text: '1280 TOPS 端侧算力本地推理' },
      { icon: Eye, text: '跌倒 / 久卧高危姿态识别' },
      { icon: PhoneCall, text: '护理站平板 + 护工手机双推送' },
      { icon: BellRing, text: '现场截图短视频附带定位' },
    ],
    tags: ['1280 TOPS', '本地推理', '3 秒响应'],
    accent: 'from-rose-400 to-orange-400',
    glow: 'rgba(251,113,133,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20robot%20detecting%20elderly%20person%20fall%20alert%20on%20nurse%20tablet%20screen%20red%20warning%20interface%20dramatic%20cinematic%20lighting&image_size=landscape_16_9',
  },
  {
    no: '03',
    icon: HeartHandshake,
    title: '辅助转移与喂餐喂药 · 老年语音陪伴',
    subtitle: '运动规划单元 + Qwen3-Omni 多模态模型',
    desc:
      'AegisEdge A15 驱动机器人运动规划单元，辅助护工完成老人搀扶、转移助力；定时提醒老人服药、就餐、康复训练。内置 Qwen3-Omni 多模态模型，支持方言、慢速口语对话，陪老人聊天、读报、心理情绪安抚，缓解养老院老人孤独感。',
    points: [
      { icon: HeartHandshake, text: '搀扶转移助力，减轻护工负荷' },
      { icon: Check, text: '服药 / 就餐 / 康复训练定时提醒' },
      { icon: MessageCircle, text: '方言 + 慢速口语自然对话' },
      { icon: Sparkles, text: '聊天读报与情绪安抚陪伴' },
    ],
    tags: ['运动规划', 'Qwen3-Omni', '方言对话', '情绪安抚'],
    accent: 'from-teal-400 to-emerald-400',
    glow: 'rgba(45,212,191,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20white%20humanoid%20robot%20helping%20elderly%20person%20eat%20meal%20and%20chatting%20warm%20sunlit%20nursing%20home%20dining%20room%20cinematic&image_size=landscape_16_9',
  },
  {
    no: '04',
    icon: BarChart3,
    title: '护理数据看板对接，院内数字化打通',
    subtitle: 'AegisEdge A15 安全隔离单元加密上传',
    desc:
      '机器人采集的所有照护数据（巡检记录、告警事件、老人交互日志），通过 AegisEdge A15 安全隔离单元加密上传，可对接养老院现有 HIS / 护理管理系统。管理人员后台可视化看板：床位风险统计、告警趋势、人力负荷报表，辅助机构做运营调度、风险管控。',
    points: [
      { icon: Lock, text: '安全隔离单元加密数据传输' },
      { icon: Network, text: '对接 HIS / 护理管理系统' },
      { icon: BarChart3, text: '床位风险 / 告警趋势可视化' },
      { icon: TrendingDown, text: '人力负荷报表辅助调度' },
    ],
    tags: ['HIS 对接', '加密上传', '可视化看板', '运营调度'],
    accent: 'from-indigo-400 to-purple-400',
    glow: 'rgba(129,140,248,0.18)',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20nursing%20management%20dashboard%20big%20screen%20blue%20data%20visualization%20charts%20bed%20risk%20monitoring%20dark%20control%20room%20cinematic&image_size=landscape_16_9',
  },
];

/* ---------- 业务价值数据 ---------- */
const valueStats = [
  { icon: Moon, value: 75, suffix: '%', decimals: 0, label: '夜间巡护人力需求降低', desc: '减少夜班护工压力' },
  { icon: Zap, value: 3, suffix: ' 秒', prefix: '≤ ', decimals: 0, label: '安全事件预警响应', desc: '跌倒等高危秒级触达' },
  { icon: FileText, value: 50, suffix: '%', decimals: 0, label: '文书记录工作量减少', desc: '照护台账自动生成' },
  { icon: Scale, value: 60, suffix: '%', decimals: 0, label: '护理综合效率提升', desc: '单楼层人力配置减半' },
];

/* ---------- 适用客户 ---------- */
const customers = [
  { icon: Building2, name: '养老院', desc: '整建制机器人护理编队' },
  { icon: Stethoscope, name: '护理院', desc: '失能老人专业照护辅助' },
  { icon: Home, name: 'CCRC 持续照料社区', desc: '全周期智慧养老社区' },
  { icon: Hospital, name: '康复医院', desc: '康复训练与体征监测' },
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
      {/* 鼠标跟随光晕 */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(380px circle at 50% 50%, ${glow}, transparent 70%)` }}
      />
    </motion.div>
  );
}

export default function B2BEldercare() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // 顶部滚动进度条
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  // Hero 视差
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 160]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const bgY = useTransform(heroProgress, [0, 1], [0, 120]);

  // 返回：有历史则后退，否则回首页
  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  // ESC 键返回
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
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 origin-left z-[60]"
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

      {/* ================= Hero 区 ================= */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
        {/* 背景图 + 遮罩（视差） */}
        <motion.div style={{ y: bgY, scale: heroScale }} className="absolute inset-0 z-0">
          <img
            src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20caregiver%20robot%20standing%20in%20bright%20modern%20elderly%20nursing%20home%20lobby%20with%20seniors%20in%20wheelchairs%20cinematic%20wide%20shot%20blue%20tone%20professional&image_size=landscape_16_9"
            alt="森卫安护人形机器人入驻养老机构"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(37,99,235,0.45),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(168,85,247,0.32),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/70 via-[#050510]/55 to-[#050510]" />
        </motion.div>

        {/* 网格底纹 */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.13] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(96,165,250,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.45) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* 浮动粒子 */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-300"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
              animate={{ y: [0, -46, 0], opacity: [0.12, 0.7, 0.12] }}
              transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: (i % 7) * 0.4, ease: 'easeInOut' }}
            />
          ))}
        </div>

        {/* Hero 内容 */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 px-4 text-center max-w-5xl">
          {/* B 端徽章组 */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 mb-7"
          >
            <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)]">
              <Building2 size={15} />
              B 端
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/25 text-white/90 text-xs font-semibold tracking-[0.35em] px-5 py-2 rounded-full">
              BUSINESS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-5"
          >
            养老机构・智慧照护
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              整体解决方案
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="text-sm md:text-base text-white/70 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            AegisElder SenSentinel 森卫安护，搭载
            <span className="text-cyan-300 font-semibold"> AegisEdge A15 边缘 AI 芯片</span>
            ，人形机器人整建制落地部署，释放护理人力，构建全天候院内安全照护体系。
          </motion.p>

          {/* AegisEdge A15 芯片徽章 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="inline-flex items-center gap-3 bg-white/[0.06] backdrop-blur-xl border border-cyan-400/30 rounded-2xl px-5 py-3 mb-9"
          >
            <motion.span
              animate={{ boxShadow: [
                '0 0 18px rgba(34,211,238,0.35)',
                '0 0 34px rgba(34,211,238,0.65)',
                '0 0 18px rgba(34,211,238,0.35)',
              ] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center"
            >
              <Cpu size={18} className="text-white" />
            </motion.span>
            <div className="text-left">
              <p className="text-xs font-bold text-cyan-200 tracking-wider">AegisEdge A15</p>
              <p className="text-[10px] text-white/45">人形机器人边缘 AI 芯片 · 1280 TOPS 端侧算力</p>
            </div>
            <Link
              to="/chip-3d"
              className="ml-2 text-[10px] text-cyan-300/80 hover:text-cyan-200 border border-cyan-400/30 hover:border-cyan-400/70 rounded-full px-3 py-1.5 transition-all whitespace-nowrap"
            >
              查看 3D 拆解
            </Link>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#capabilities"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-semibold shadow-[0_10px_40px_-8px_rgba(34,211,238,0.6)] hover:shadow-[0_14px_50px_-6px_rgba(34,211,238,0.8)] hover:-translate-y-0.5 transition-all duration-300"
            >
              查看四大核心能力
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#value"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 hover:border-cyan-400/60 hover:bg-white/5 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300"
            >
              业务价值数据
            </a>
          </motion.div>
        </motion.div>

        {/* 滚动指示 */}
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

      {/* ================= 开篇介绍 ================= */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#050510] via-[#080a18] to-[#050510] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-blue-600/12 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden"
          >
            {/* 角标装饰 */}
            <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-purple-400/50 rounded-br-3xl" />

            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck size={22} className="text-cyan-300" />
              <p className="text-xs font-semibold tracking-[0.35em] text-cyan-400 uppercase">
                Overview · 方案概述
              </p>
            </div>

            <p className="text-base md:text-lg text-white/78 leading-[1.95] mb-8">
              面向<span className="text-cyan-300 font-semibold">养老院、护理院、CCRC 养老社区、康复医院</span>
              批量部署森卫安护人形陪护机器人。机器人搭载自研
              <span className="text-cyan-300 font-semibold"> AegisEdge A15 边缘 AI 芯片</span>
              ，本地端侧运行 <span className="text-purple-300 font-semibold">Qwen3-Omni 多模态大模型</span>
              ，无需全程依赖云端。依托芯片强大端侧算力，实现院内实时环境感知、老人姿态识别、语音交互与本地安全决策，将护理人员从查房巡检、体征提醒、风险监测等大量重复性工作中释放，聚焦高难度专业护理操作。
            </p>

            {/* 技术标签 */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: Cpu, text: 'AegisEdge A15 端侧芯片' },
                { icon: Sparkles, text: 'Qwen3-Omni 多模态大模型' },
                { icon: Network, text: '无需全程依赖云端' },
                { icon: Lock, text: '本地安全决策' },
                { icon: Activity, text: '实时环境感知' },
                { icon: MessageCircle, text: '方言语音交互' },
              ].map((tag, i) => {
                const Icon = tag.icon;
                return (
                  <motion.span
                    key={tag.text}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/15 hover:border-cyan-400/50 hover:bg-cyan-500/10 rounded-full px-4 py-2 text-xs text-white/80 transition-all duration-300 cursor-default"
                  >
                    <Icon size={13} className="text-cyan-300" />
                    {tag.text}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* 适用客户条 */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {customers.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  whileHover={{ y: -6 }}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/10 hover:border-blue-400/50 rounded-2xl px-4 py-4 transition-all duration-300 group"
                >
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/25 to-cyan-500/15 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={18} className="text-cyan-300" />
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
      <section id="capabilities" className="relative py-20 md:py-28 bg-[#050510] overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-[480px] h-[480px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-[480px] h-[480px] bg-purple-600/12 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-4">
              Core Capabilities · 四大核心能力
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              一颗 <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">A15</span>，四重守护
            </h2>
            <p className="text-sm text-white/55 max-w-2xl mx-auto">
              从自主巡护到数据闭环，AegisEdge A15 让院内照护的每一个环节都可感知、可响应、可追溯。
            </p>
            <div className="section-divider" />
          </motion.div>

          {/* 能力卡片：交替布局 */}
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
                  {/* 图片侧 */}
                  <TiltCard glow={cap.glow} className="relative rounded-3xl overflow-hidden group/card">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10">
                      <img
                        src={cap.image}
                        alt={cap.title}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent" />
                      {/* 光扫 */}
                      <div className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-[1.4s] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                      {/* 编号水印 */}
                      <span className="absolute top-5 right-6 font-display text-7xl md:text-8xl font-black text-white/10 select-none leading-none">
                        {cap.no}
                      </span>
                      {/* 图标徽章 */}
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.08 }}
                        className={`absolute bottom-5 left-5 w-14 h-14 rounded-2xl bg-gradient-to-br ${cap.accent} flex items-center justify-center shadow-2xl`}
                      >
                        <Icon size={26} className="text-white" />
                      </motion.div>
                    </div>
                  </TiltCard>

                  {/* 文字侧 */}
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
                    <p className="text-xs md:text-sm text-cyan-300/90 font-medium mb-5">{cap.subtitle}</p>
                    <p className="text-sm text-white/62 leading-[1.9] mb-6">{cap.desc}</p>

                    {/* 技术点 */}
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
                            className="flex items-center gap-2.5 text-xs text-white/75 bg-white/[0.04] border border-white/8 rounded-xl px-3.5 py-2.5 hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all duration-300"
                          >
                            <PIcon size={14} className="text-cyan-300 flex-shrink-0" />
                            {p.text}
                          </motion.li>
                        );
                      })}
                    </ul>

                    {/* 标签 */}
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

      {/* ================= 业务价值数据 ================= */}
      <section id="value" className="relative py-20 md:py-28 bg-gradient-to-b from-[#050510] via-[#080a18] to-[#050510] overflow-hidden">
        {/* 背景光晕 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.22),transparent_55%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)',
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
            <p className="text-xs font-semibold tracking-[0.4em] text-blue-400 uppercase mb-4">
              Business Value · 业务价值
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              护理综合效率提升
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent"> +60%</span>
            </h2>
            <p className="text-sm text-white/55">单楼层人力配置减半 —— 让每一次照护投入都更高效</p>
            <div className="section-divider" />
          </motion.div>

          {/* 四项核心指标 */}
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
                  className="group relative bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 rounded-2xl p-6 md:p-7 overflow-hidden transition-all duration-300"
                >
                  {/* hover 顶光 */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/25 to-cyan-500/15 border border-blue-400/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Icon size={20} className="text-cyan-300" />
                  </div>
                  <p className="font-display text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-2 tabular-nums">
                    <CountUp to={s.value} suffix={s.suffix} prefix={s.prefix || ''} decimals={s.decimals} />
                  </p>
                  <p className="text-sm font-semibold text-white/85 mb-1">{s.label}</p>
                  <p className="text-[11px] text-white/40">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* 价值详情列表 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown size={20} className="text-cyan-300" />
              <h3 className="font-display text-lg font-bold">价值落地清单</h3>
            </div>
            <ul className="space-y-4">
              {[
                '夜间巡护人力需求降低 75%，减少夜班护工压力',
                '跌倒等安全事件预警响应缩短至 3 秒内',
                '自动生成照护台账，文书记录工作量减少 50%',
                '降低意外事故风险，减少机构运营纠纷',
              ].map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3.5 text-sm text-white/75 leading-relaxed group/item"
                >
                  <span className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center group-hover/item:scale-125 transition-transform duration-300">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </span>
                  {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ================= 部署流程 + CTA ================= */}
      <section className="relative py-20 md:py-28 bg-[#050510] overflow-hidden">
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
              Deployment · 落地路径
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">四步入驻，整建制交付</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { step: 'STEP 1', title: '院区勘测', desc: 'SLAM 预建图，规划巡护路线与充电桩点位' },
              { step: 'STEP 2', title: '编队部署', desc: '按楼层 / 病区配置机器人编队与护理看板' },
              { step: 'STEP 3', title: '系统对接', desc: '打通 HIS / 护理管理系统，数据加密贯通' },
              { step: 'STEP 4', title: '陪跑运营', desc: '护工培训 + 7×24 远程运维，持续迭代策略' },
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-600/20 via-[#0a0f24] to-purple-600/20 p-10 md:p-14 text-center"
          >
            {/* 旋转装饰环 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-24 -right-24 w-64 h-64 border border-cyan-400/15 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-28 -left-28 w-72 h-72 border border-purple-400/15 rounded-full"
            />

            <Building2 size={30} className="text-cyan-300 mx-auto mb-5" />
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
              为您的机构定制整建制照护方案
            </h3>
            <p className="text-sm text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
              预约院区实地演示，森卫安护解决方案团队将携带 AegisEdge A15 机器人到场，按真实病区场景跑通巡护、告警与看板全流程。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                to="/products?category=%E5%85%BB%E8%80%81%E6%9C%BA%E6%9E%84B%E7%AB%AF"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-semibold shadow-[0_10px_40px_-8px_rgba(34,211,238,0.6)] hover:-translate-y-0.5 transition-all duration-300"
              >
                查看养老机构机器人系列
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
