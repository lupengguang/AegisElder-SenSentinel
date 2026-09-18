import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  ArrowLeft, ArrowRight, Zap, BatteryCharging, ShieldCheck, Gauge, Volume2,
  Home as HomeIcon, Building2, Crosshair, Radio, Network, Wrench, Check,
  ChevronRight, Moon, Server, Thermometer, Flame, Clock, Sparkles, Plug,
} from 'lucide-react';

/* ====================================================================
 * AegisDock 森卫基座｜自动归位充电基座
 * 风格：对标特斯拉配件页 · 极简 / 高端 / 参数化 / 干净克制
 * 双款：AegisDock Home ¥4999 · AegisDock Pro ¥12999
 * ==================================================================== */

/* ---------- 数字滚动 ---------- */
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

const IMG = (prompt, size = 'landscape_16_9') =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;

/* ---------- 两款产品数据 ---------- */
const docks = {
  home: {
    key: 'home',
    tag: '家用款',
    name: 'AegisDock Home',
    cn: '森卫基座 · 家用版',
    price: 4999,
    priceSuffix: '',
    icon: HomeIcon,
    accent: 'cyan',
    desc: '适合家庭养老场景，小户型友好，轻量化设计。当森卫安护机器人电量低于设定阈值，自动规划路线返回基座，完成精准对位充电，无需人工插拔。',
    image: IMG(
      'compact round white robot charging dock station on warm wooden floor in cozy minimalist living room, humanoid caregiver robot driving onto the dock automatically, soft afternoon sunlight, tesla style product photography, clean premium minimalist interior, photorealistic 4k',
      'landscape_16_9'
    ),
    specs: [
      { icon: Crosshair, label: '自动对位', value: '红外 + 视觉融合', detail: '厘米级归位精度' },
      { icon: Zap, label: '充电功率', value: '350W', detail: '静音恒功率输出', numeric: 350, max: 700, unit: 'W' },
      { icon: BatteryCharging, label: '待机功耗', value: '< 3W', detail: '低功耗长待机' },
      { icon: ShieldCheck, label: '防护等级', value: 'IP54', detail: '防泼溅防尘' },
      { icon: Wrench, label: '安装方式', value: '即放即用', detail: '无需墙面改造' },
      { icon: Volume2, label: '充电噪音', value: '< 28dB', detail: '夜间不打扰老人' },
    ],
    highlight: {
      icon: Moon,
      title: '夜间自主补能，全天待命',
      desc: '机器人夜间自主回基座补能，保持全天待命；老人无需操作电源，机器人持续提供跌倒监测、陪伴对话、定时提醒等养老陪护服务。',
      points: ['跌倒监测 7×24 在线', '陪伴对话不掉线', '用药提醒准时触达'],
      image: IMG(
        'humanoid caregiver robot resting on white round charging dock in dim peaceful bedroom at night, soft cyan charging indicator glow, elderly person sleeping peacefully nearby, warm quiet atmosphere, cinematic 4k',
        'landscape_16_9'
      ),
    },
  },
  pro: {
    key: 'pro',
    tag: '商用机构款',
    name: 'AegisDock Pro',
    cn: '森卫基座 · 商用机构版',
    price: 12999,
    priceSuffix: '',
    icon: Building2,
    accent: 'slate',
    desc: '面向养老院、康复中心、民政养老驿站批量部署，支持多台 AegisElder 机器人调度管理，具备集群充电、状态云端上报、远程运维能力。',
    image: IMG(
      'row of premium dark graphite robot charging dock stations in modern nursing home hallway, multiple white humanoid caregiver robots lining up charging, blue status lights, institutional clean facility, tesla industrial product photography, cinematic 4k',
      'landscape_16_9'
    ),
    specs: [
      { icon: Crosshair, label: '自动对位', value: '视觉 + UWB 融合', detail: '高精度定位' },
      { icon: Zap, label: '充电功率', value: '700W', detail: '快充模式', numeric: 700, max: 700, unit: 'W' },
      { icon: Network, label: '集群能力', value: '最多 8 台', detail: '联动排班补能', numeric: 8, max: 8, unit: ' 台' },
      { icon: ShieldCheck, label: '防护等级', value: 'IP65', detail: '耐清洁液体擦拭' },
      { icon: Wrench, label: '安装方式', value: '落地固定', detail: '配套管理后台 API' },
      { icon: Server, label: '云端运维', value: '7×24 循环', detail: '电池健康监测上报' },
    ],
    highlight: {
      icon: Building2,
      title: '集群排班，机构全天候看护',
      desc: '养老机构内机器人轮班值守，无需工作人员手动管理电量；后台统一查看所有机器人电量、健康状态，减少运维人力成本，保障机构全天候智能看护。',
      points: ['电量状态后台一屏统览', '电池健康实时监测', '温湿度 / 烟雾环境告警联动'],
      image: IMG(
        'nursing staff monitoring dashboard screens showing multiple humanoid robots battery levels and charging status in modern eldercare facility control room, charging docks visible through glass window, blue tech lighting, cinematic 4k',
        'landscape_16_9'
      ),
    },
  },
};

/* ---------- 归位流程 ---------- */
const returnSteps = [
  { icon: BatteryCharging, title: '低电量感知', desc: '电量低于阈值，Ai5 芯片触发回桩决策' },
  { icon: Radio, title: '路径自主规划', desc: '融合定位解算最优归位路线，主动避让行人' },
  { icon: Crosshair, title: '厘米级对位', desc: '红外 / 视觉 / UWB 多重校准，精准入桩' },
  { icon: Plug, title: '无感补能', desc: '触点自动接通，静音恒功率，温感保护断电' },
];

const accentMap = {
  cyan: {
    text: 'text-cyan-600',
    softBg: 'bg-cyan-50',
    border: 'border-cyan-200',
    bar: 'from-cyan-400 to-blue-500',
    glow: 'rgba(6,182,212,0.25)',
    btn: 'bg-slate-900 hover:bg-cyan-700',
    ring: 'rgba(6,182,212,0.5)',
  },
  slate: {
    text: 'text-slate-800',
    softBg: 'bg-slate-100',
    border: 'border-slate-300',
    bar: 'from-slate-700 to-slate-900',
    glow: 'rgba(15,23,42,0.22)',
    btn: 'bg-slate-900 hover:bg-slate-700',
    ring: 'rgba(15,23,42,0.45)',
  },
};

export default function AegisDock() {
  const navigate = useNavigate();
  const [model, setModel] = useState('home');
  const dock = docks[model];
  const accent = accentMap[dock.accent];
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

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
      className="page-enter bg-[#f7f7f5] text-slate-900 min-h-screen overflow-x-hidden"
    >
      {/* 顶部滚动进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 via-slate-800 to-cyan-400 origin-left z-[60]"
        style={{ scaleX: progressScale }}
      />

      {/* 固定返回按钮 */}
      <motion.button
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={handleBack}
        className="fixed top-5 left-5 z-50 group flex items-center gap-2.5 bg-white/80 backdrop-blur-xl border border-slate-200 hover:border-slate-900 rounded-full pl-3 pr-5 py-2.5 text-xs font-medium text-slate-700 hover:text-slate-900 transition-all duration-300 shadow-sm hover:shadow-lg"
      >
        <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:-translate-x-0.5">
          <ArrowLeft size={13} />
        </span>
        返回
        <kbd className="hidden sm:inline-flex items-center text-[9px] text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 ml-1">ESC</kbd>
      </motion.button>

      {/* ================= HERO（极简白底） ================= */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white to-[#f7f7f5]">
        {/* 背景充电桩大图（参考图风格，居右） */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src={IMG(
              'minimalist white wall mounted charging station with glossy white rounded panel and thick dark blue grey coiled charging cables, mounted on grey pedestal column, warm wooden slat wall background blurred, soft studio lighting, tesla wall connector style premium product hero shot, photorealistic 4k',
              'landscape_16_9'
            )}
            alt="AegisDock 森卫基座"
            className="absolute right-0 top-0 h-full w-[62%] object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f7f5] via-[#f7f7f5]/70 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full"
        >
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-10 h-px bg-slate-900" />
              <span className="text-[11px] font-semibold tracking-[0.4em] text-slate-500 uppercase">
                AegisDock · Charging Dock
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-black tracking-tight leading-[1.08] mb-6"
            >
              AegisDock
              <br />
              森卫基座
              <br />
              <span className="text-slate-400">自动归位充电基座</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
              className="text-sm md:text-base text-slate-500 leading-relaxed mb-10"
            >
              为 AegisElder SenSentinel 人形陪护机器人打造，
              自动对位、自主补能、全天候值守。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#models"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-700 transition-colors duration-300"
              >
                查看两款基座
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-xs text-slate-400">
                Home ¥4,999 起 · Pro ¥12,999
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* 底部提示 */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-slate-400/60 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-slate-700 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ================= 双款选择与详情 ================= */}
      <section id="models" className="relative py-20 md:py-28 bg-[#f7f7f5]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Tab 切换 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-14"
          >
            <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm border border-slate-200">
              {Object.values(docks).map((d) => {
                const Icon = d.icon;
                const active = model === d.key;
                return (
                  <button
                    key={d.key}
                    onClick={() => setModel(d.key)}
                    className={`relative flex items-center gap-2.5 px-6 md:px-9 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                      active ? 'text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="dockTab"
                        className="absolute inset-0 rounded-full bg-slate-900"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <Icon size={16} className="relative z-10" />
                    <span className="relative z-10">{d.tag} · {d.name.split(' ')[1]}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={dock.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* 产品主区：左文案 + 右产品图 */}
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center gap-1.5 ${accent.softBg} ${accent.text} text-xs font-bold px-3.5 py-1.5 rounded-full border ${accent.border}`}>
                      <dock.icon size={13} />
                      {dock.tag}
                    </span>
                    <span className="text-[11px] tracking-[0.3em] text-slate-400 font-semibold uppercase">{dock.name}</span>
                  </div>

                  <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight mb-3">{dock.cn}</h2>
                  <p className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-6">
                    ¥{dock.price.toLocaleString()}
                  </p>

                  <p className="text-sm md:text-base text-slate-500 leading-[1.9] mb-8">{dock.desc}</p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/products"
                      className={`group inline-flex items-center gap-2 px-7 py-3.5 ${accent.btn} text-white rounded-full text-sm font-semibold transition-colors duration-300`}
                    >
                      咨询选购
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                      href="#specs"
                      className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-300 hover:border-slate-900 rounded-full text-sm font-semibold transition-colors duration-300"
                    >
                      查看参数
                    </a>
                  </div>
                </div>

                {/* 产品图 + 归位脉冲环 */}
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-[2rem] overflow-hidden bg-white shadow-[0_50px_120px_-50px_rgba(15,23,42,0.35)] border border-slate-200/70"
                  >
                    <img src={dock.image} alt={dock.name} className="w-full aspect-[16/10] object-cover" />
                    {/* 对位脉冲环动效 */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/85 backdrop-blur-md rounded-full pl-3 pr-5 py-2 shadow-md border border-white">
                      <span className="relative flex h-3 w-3">
                        <motion.span
                          className="absolute inline-flex h-full w-full rounded-full opacity-60"
                          style={{ backgroundColor: dock.accent === 'cyan' ? '#06b6d4' : '#0f172a' }}
                          animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                        />
                        <span
                          className="relative inline-flex rounded-full h-3 w-3"
                          style={{ backgroundColor: dock.accent === 'cyan' ? '#06b6d4' : '#0f172a' }}
                        />
                      </span>
                      <span className="text-[11px] font-bold text-slate-800 tracking-wide">自动对位进行中</span>
                    </div>
                  </motion.div>

                  {/* 浮动小参数卡 */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-5 -right-3 md:-right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4"
                  >
                    <Gauge size={18} className={accent.text + ' mb-1.5'} />
                    <p className="text-lg font-black text-slate-900 leading-none">
                      {dock.key === 'home' ? '350W' : '700W'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">{dock.key === 'home' ? '静音充电' : '快充模式'}</p>
                  </motion.div>
                </div>
              </div>

              {/* 参数规格网格 */}
              <div id="specs" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles size={18} className="text-slate-400" />
                  <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight">参数规格</h3>
                  <span className="flex-1 h-px bg-slate-200" />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dock.specs.map((spec, i) => {
                    const Icon = spec.icon;
                    return (
                      <motion.div
                        key={spec.label}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.07 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className={`w-10 h-10 rounded-xl ${accent.softBg} flex items-center justify-center mb-4`}>
                          <Icon size={18} className={accent.text} />
                        </div>
                        <p className="text-[11px] text-slate-400 font-semibold tracking-wider mb-1.5">{spec.label}</p>
                        <p className="text-xl font-black text-slate-900 mb-1">{spec.value}</p>
                        <p className="text-xs text-slate-400 mb-3">{spec.detail}</p>
                        {spec.numeric !== undefined && (
                          <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${accent.bar}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(spec.numeric / spec.max) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.1, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                            />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* 场景亮点 */}
              <div className="mt-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative rounded-[2rem] overflow-hidden order-2 lg:order-1"
                >
                  <img src={dock.highlight.image} alt={dock.highlight.title} className="w-full aspect-[16/11] object-cover" />
                </motion.div>

                <div className="order-1 lg:order-2">
                  <div className={`w-12 h-12 rounded-2xl ${accent.softBg} flex items-center justify-center mb-5`}>
                    <dock.highlight.icon size={22} className={accent.text} />
                  </div>
                  <h3 className="font-display text-2xl md:text-4xl font-black tracking-tight mb-4">
                    {dock.highlight.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 leading-[1.9] mb-7">{dock.highlight.desc}</p>
                  <ul className="space-y-3.5">
                    {dock.highlight.points.map((point, i) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="flex items-center gap-3 text-sm text-slate-700"
                      >
                        <span className={`flex-shrink-0 w-5.5 h-5.5 w-5 h-5 rounded-full bg-gradient-to-br ${accent.bar} flex items-center justify-center`}>
                          <Check size={11} className="text-white" strokeWidth={3} />
                        </span>
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= 归位流程（全宽深色带） ================= */}
      <section className="relative py-20 md:py-28 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.14),transparent_55%)] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-4">Auto Return · 自动归位</p>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight">
              四步完成，<span className="text-cyan-400">全程无需人工</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {returnSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-7 hover:border-cyan-400/40 transition-colors duration-300 group"
                >
                  <span className="font-display text-5xl font-black text-white/10 group-hover:text-cyan-400/20 transition-colors mb-4 block">
                    0{i + 1}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} className="text-cyan-300" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
                  {i < 3 && (
                    <ChevronRight size={18} className="hidden lg:block absolute top-1/2 -right-3.5 -translate-y-1/2 text-cyan-400/50 z-10" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* 数据条 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
            {[
              { value: 1, suffix: ' cm', decimals: 0, label: '归位精度', raw: 1 },
              { value: 28, suffix: ' dB', decimals: 0, label: '家用静音', raw: 28 },
              { value: 8, suffix: ' 台', decimals: 0, label: 'Pro 集群联动', raw: 8 },
              { value: 24, suffix: 'h', decimals: 0, prefix: '7×', label: '不间断循环', raw: 24 },
            ].map((s, i) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-black text-cyan-300 mb-1.5 tabular-nums">
                  <CountUp to={s.value} suffix={s.suffix} prefix={s.prefix || ''} decimals={s.decimals} />
                </p>
                <p className="text-xs text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 双款对比 ================= */}
      <section className="py-20 md:py-28 bg-[#f7f7f5]">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-semibold tracking-[0.4em] text-slate-400 uppercase mb-4">Compare · 双款对比</p>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight">Home 与 Pro，按需选择</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left px-6 py-5 text-xs font-bold tracking-wider text-slate-400">规格</th>
                  <th className="text-left px-6 py-5 text-sm font-black text-slate-900">AegisDock Home</th>
                  <th className="text-left px-6 py-5 text-sm font-black text-slate-900 bg-slate-50">AegisDock Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['定价', '¥4,999', '¥12,999'],
                  ['适用场景', '家庭客厅 / 卧室', '养老院 / 康复中心 / 养老驿站'],
                  ['定位技术', '红外 + 视觉融合', '视觉 + UWB 融合'],
                  ['充电功率', '350W 静音', '700W 快充'],
                  ['待机功耗', '< 3W', '< 5W'],
                  ['防护等级', 'IP54', 'IP65'],
                  ['集群联动', '—', '最多 8 台排班'],
                  ['后台 / API', '—', '机构管理后台 + API'],
                  ['环境传感', '温感保护', '温湿度 + 烟雾告警'],
                  ['安装', '即放即用', '落地固定'],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 text-xs font-semibold text-slate-400">{row[0]}</td>
                    <td className="px-6 py-4 text-slate-700">{row[1]}</td>
                    <td className="px-6 py-4 text-slate-700 bg-slate-50/50">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <p className="text-sm text-slate-500 mb-6">自动对位 · 自主补能 · 全天候值守</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 px-9 py-3.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-700 transition-colors duration-300"
              >
                立即咨询 AegisDock
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-9 py-3.5 border border-slate-300 hover:border-slate-900 rounded-full text-sm font-semibold transition-colors duration-300"
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
