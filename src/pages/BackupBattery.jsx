import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  ArrowLeft, ArrowRight, ShieldAlert, Home, Building2, Wrench, Activity,
  PhoneCall, MessagesSquare, FileClock, Zap, Timer, Repeat, ShieldCheck,
  Check, ChevronRight, BatteryCharging, PlugZap, BellRing, HeartPulse,
} from 'lucide-react';

/* ====================================================================
 * AegisCell Reserve 森护电池组｜内置应急备用电池
 * 断电不断护：约 5 小时续航，跌倒监测 / 紧急呼叫 / 语音陪伴 / 状态记录
 * ==================================================================== */

const IMG = (prompt, size = 'landscape_16_9') =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;

/* ---------- 数字滚动 ---------- */
function CountUp({ to, duration = 1.8, suffix = '', prefix = '', decimals = 0 }) {
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
  return <span>{prefix}{value.toFixed(decimals)}{suffix}</span>;
}

/* ---------- 三大断电场景 ---------- */
const scenarios = [
  {
    icon: Home,
    tag: '家庭停电',
    title: '居家突然断电',
    desc: '老旧小区跳闸、夜间停电、极端天气断电，老人独自在家也不慌。机器人自动切到备用电源，继续盯守老人安全，一键呼叫子女不受影响。',
    image: IMG(
      'photorealistic photo of an elderly chinese woman sitting on a sofa in a dark apartment living room during nighttime power outage, a sleek white humanoid home caregiver robot standing beside her emitting a soft warm green emergency glow from its chest, faint moonlight through window, reassuring realistic documentary photography, shallow depth of field, high detail',
      'landscape_4_3'
    ),
  },
  {
    icon: Building2,
    tag: '养老院断电',
    title: '机构线路故障',
    desc: '养老院配电检修、线路跳闸导致整层断电时，机器人作为「移动安全哨兵」继续巡逻，跌倒识别与护士站告警通道不中断，守住高危老人。',
    image: IMG(
      'photorealistic photo of a white humanoid service robot patrolling a dim corridor of a modern chinese nursing home during a power blackout, green led status strips glowing on the robot body, illuminated green emergency exit sign in background, reflective floor, realistic documentary photography, high detail',
      'landscape_4_3'
    ),
  },
  {
    icon: Wrench,
    tag: '临时维保',
    title: '充电桩维护窗口',
    desc: 'AegisDock 基座检修、线路改造期间，机器人脱离基座照常工作约 5 小时，照护服务零空窗，维保与陪护两不误。',
    image: IMG(
      'photorealistic photo of a maintenance engineer in grey uniform servicing a white robot charging dock station with a screwdriver, a white humanoid caregiver robot standing independently nearby showing a green full battery indicator light, bright clean institutional facility, realistic documentary photography, high detail',
      'landscape_4_3'
    ),
  },
];

/* ---------- 断电后保障的四大关键功能 ---------- */
const keepFunctions = [
  {
    icon: Activity,
    title: '跌倒监测不中断',
    desc: 'AegisEdge Ai5 视觉推理持续在线，识别老人跌倒、长时间不动，立刻声光提示并分级告警。',
    stat: '持续监测',
  },
  {
    icon: PhoneCall,
    title: '紧急呼叫照常可用',
    desc: '一键呼叫家人、网格员或机构值班人员，4G/本地双通道，断电也能第一时间求助。',
    stat: '双通道',
  },
  {
    icon: MessagesSquare,
    title: '语音陪伴不断线',
    desc: 'Qwen3-Omni 端侧对话照常运行，陪老人聊天解闷、安抚情绪，缓解停电时的焦虑。',
    stat: '端侧运行',
  },
  {
    icon: FileClock,
    title: '关键状态持续记录',
    desc: '健康与安全事件本地加密留存，来电恢复后自动同步，照护台账不丢失、可追溯。',
    stat: '本地加密',
  },
];

/* ---------- 5 小时保障时间轴 ---------- */
const timeline = [
  { t: '0s', title: '无缝切换', desc: '断电瞬间 UPS 式切换，机器人不重启、不宕机' },
  { t: '0–1h', title: '全功能值守', desc: '巡逻、监测、呼叫、陪伴满负荷运行' },
  { t: '1–4h', title: '智能省电', desc: '非关键模块降频，安全功能优先级最高' },
  { t: '≈5h', title: '应急保障窗', desc: '覆盖绝大多数停电与维保窗口，等待来电' },
];

/* ---------- 参数规格（卖点卡） ---------- */
const specs = [
  { icon: Timer, label: '应急续航', value: '约 5 小时', detail: '停电 / 维保连续工作', bar: 100 },
  { icon: Zap, label: '切换时间', value: '< 10 ms', detail: 'UPS 级无缝切换', bar: 8 },
  { icon: Repeat, label: '循环寿命', value: '2000 次', detail: '长寿命电芯设计', bar: 82 },
  { icon: ShieldCheck, label: '安全保护', value: '四重防护', detail: '过充 / 过放 / 短路 / 过温', bar: 100 },
  { icon: BatteryCharging, label: '电池类型', value: '内置锂电', detail: '随基座自动补满', bar: 0 },
  { icon: BellRing, label: '低电提醒', value: '三级预警', detail: '本机 + 家人 + 后台', bar: 0 },
];

/* ---------- 完整产品参数（特斯拉风格规格表） ---------- */
const productShot = IMG(
  'photorealistic studio product photography of a compact emergency backup battery pack for humanoid robot, matte black aluminum rectangular enclosure with exposed glossy green lithium cells row on top, engraved text label on side, green led charge indicator, gold contact terminals, placed on light grey seamless background with soft shadow, three quarter view, premium industrial design catalog shot, ultra sharp high detail',
  'portrait_4_3'
);

const specGroups = [
  {
    name: '电气参数',
    rows: [
      ['产品型号', 'AegisCell Reserve AC-R260'],
      ['电芯类型', '磷酸铁锂 LiFePO4'],
      ['额定容量', '260 Wh'],
      ['标称电压', '25.2 V'],
      ['应急续航', '约 5 小时（安全功能全在线）'],
      ['切换时间', '< 10 ms（UPS 无缝切换）'],
      ['满充时间', '约 2.5 小时（随 AegisDock 基座）'],
    ],
  },
  {
    name: '结构与环境',
    rows: [
      ['循环寿命', '≥ 2000 次（剩余容量 ≥ 80%）'],
      ['工作温度', '-10°C ~ 45°C'],
      ['产品尺寸', '210 × 148 × 62 mm'],
      ['整机重量', '约 2.1 kg'],
      ['安装方式', '机身内置 · 支持热插拔更换'],
    ],
  },
  {
    name: '安全与认证',
    rows: [
      ['电池管理', '智能 BMS · 电压 / 温度实时均衡'],
      ['安全保护', '过充 / 过放 / 过流 / 短路 / 过温'],
      ['低电预警', '三级提醒：本机 + 家人 + 机构后台'],
      ['安规认证', 'CCC · CE · RoHS · UN38.3'],
      ['质保服务', '2 年质保 · 终身电芯健康检测'],
    ],
  },
];

export default function BackupBattery() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroP, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroP, [0, 0.8], [1, 0]);

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
      className="page-enter bg-[#f6f8f6] text-slate-900 min-h-screen overflow-x-hidden"
    >
      {/* 顶部滚动进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-600 origin-left z-[60]"
        style={{ scaleX: progressScale }}
      />

      {/* 固定返回按钮 */}
      <motion.button
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={handleBack}
        className="fixed top-5 left-5 z-50 group flex items-center gap-2.5 bg-white/80 backdrop-blur-xl border border-slate-200 hover:border-emerald-600 rounded-full pl-3 pr-5 py-2.5 text-xs font-medium text-slate-700 hover:text-slate-900 transition-all duration-300 shadow-sm hover:shadow-lg"
      >
        <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:-translate-x-0.5">
          <ArrowLeft size={13} />
        </span>
        返回
        <kbd className="hidden sm:inline-flex items-center text-[9px] text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 ml-1">ESC</kbd>
      </motion.button>

      {/* ================= HERO（深色 + 能量绿光） ================= */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 text-white">
        {/* 光晕背景 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(16,185,129,0.22),transparent_52%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_85%,rgba(20,184,166,0.12),transparent_45%)] pointer-events-none" />

        {/* 右侧电池组大图 */}
        <motion.div style={{ y: heroY }} className="absolute right-0 top-0 h-full w-[58%] z-0">
          <img
            src={IMG(
              'photorealistic studio product photo of an emergency backup battery module for humanoid robots, six glossy green 21700 lithium cells with plus terminals mounted in a matte black aluminum frame, small green led indicator strips, red and black power cables, dark charcoal gradient background, emerald green rim lighting, sharp reflections on glossy surface, industrial product photography, ultra sharp high detail',
              'portrait_16_9'
            )}
            alt="AegisCell Reserve 应急备用电池组"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        </motion.div>

        {/* 浮动粒子 */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-emerald-400/60 z-[1] pointer-events-none"
            style={{
              width: i % 3 === 0 ? 4 : 2.5,
              height: i % 3 === 0 ? 4 : 2.5,
              left: `${8 + (i * 17) % 55}%`,
              top: `${12 + (i * 29) % 72}%`,
            }}
            animate={{ y: [0, -22, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
          />
        ))}

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-10 h-px bg-emerald-400" />
              <span className="text-[11px] font-semibold tracking-[0.4em] text-emerald-300/90 uppercase">
                AegisCell Reserve · Emergency Battery
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
            >
              断电 5 小时
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-lime-300 to-teal-300">
                智能陪护不中断
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
              className="text-sm md:text-base text-slate-300/90 leading-relaxed mb-8"
            >
              AegisElder SenSentinel 森卫安护内置应急备用电池，在家庭停电、养老院断电或临时维保场景下，
              可连续工作约 <span className="text-emerald-300 font-bold">5 小时</span>，
              持续提供跌倒监测、紧急呼叫、语音陪伴与关键状态记录。
            </motion.p>

            {/* 4 个保障标签 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34 }}
              className="flex flex-wrap gap-2.5 mb-10"
            >
              {['跌倒监测', '紧急呼叫', '语音陪伴', '状态记录'].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 bg-emerald-500/10 border border-emerald-400/25 rounded-full px-4 py-2">
                  <ShieldCheck size={12} />
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.44 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#scenarios"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full text-sm font-bold transition-colors duration-300"
              >
                查看断电保障
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-xs text-slate-400">长效备用电池组 · ¥6,800</span>
            </motion.div>
          </div>
        </motion.div>

        {/* 底部滚动提示 */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-6 h-10 border-2 border-slate-500/60 rounded-full flex justify-center pt-2">
            <motion.div className="w-1 h-2 bg-emerald-400 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* ================= 三大断电场景 ================= */}
      <section id="scenarios" className="relative py-20 md:py-28 bg-[#f6f8f6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-semibold tracking-[0.4em] text-emerald-600 uppercase mb-4">Scenarios · 三大断电场景</p>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight mb-4">
              电可以停，<span className="text-emerald-600">守护不能停</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              无论家里、机构还是维保窗口，备用电池自动接管，机器人始终是老人身边那道安全防线。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.tag}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.13 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-[0_36px_80px_-30px_rgba(16,185,129,0.35)] transition-shadow duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-full px-3.5 py-1.5 text-[11px] font-bold text-emerald-700 border border-emerald-100">
                      <Icon size={12} />
                      {s.tag}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-xl font-black mb-3">{s.title}</h3>
                    <p className="text-[13px] text-slate-500 leading-[1.85]">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 5 小时保障时间轴（深色带） ================= */}
      <section className="relative py-20 md:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.16),transparent_55%)] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-[11px] font-semibold tracking-[0.4em] text-emerald-400 uppercase mb-4">5 Hours Backup · 应急保障窗</p>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight">
              断电后的 <span className="text-emerald-400">5 小时</span>，它这样值守
            </h2>
          </motion.div>

          {/* 电量动画 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-5 mb-16 max-w-2xl"
          >
            <div className="relative w-14 h-8 border-2 border-emerald-400/70 rounded-md p-1">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 rounded-sm"
                initial={{ width: '8%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
              <div className="absolute -right-[7px] top-1/2 -translate-y-1/2 w-[5px] h-4 bg-emerald-400/70 rounded-r-sm" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs text-slate-400">备用电池电量</span>
                <span className="font-display text-2xl font-black text-emerald-300">
                  <CountUp to={5} /> h 续航
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* 时间轴 */}
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="hidden lg:block absolute top-[52px] left-[6%] right-[6%] h-px bg-gradient-to-r from-emerald-400/60 via-emerald-400/25 to-emerald-400/60" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-7 hover:border-emerald-400/40 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="relative z-10 w-5 h-5 rounded-full bg-emerald-400 border-4 border-slate-950 shadow-[0_0_0_2px_rgba(52,211,153,0.4)]" />
                  <span className="font-display text-xl font-black text-emerald-300 tabular-nums">{item.t}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 四大关键功能 ================= */}
      <section className="py-20 md:py-28 bg-[#f6f8f6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[11px] font-semibold tracking-[0.4em] text-emerald-600 uppercase mb-4">Always-On · 断电仍在线的功能</p>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight">四项关键照护，全部保留</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {keepFunctions.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-2xl border border-slate-200/80 p-7 hover:border-emerald-300 hover:shadow-[0_30px_70px_-30px_rgba(16,185,129,0.4)] transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2.5">{f.title}</h3>
                    <p className="text-[13px] text-slate-500 leading-[1.8] mb-4">{f.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
                      <HeartPulse size={11} />
                      {f.stat}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 大数字数据带 */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900 rounded-3xl py-12 px-8">
            {[
              { v: 5, s: ' h', label: '应急连续工作' },
              { v: 10, s: ' ms', prefix: '< ', label: 'UPS 级无缝切换' },
              { v: 4, s: ' 项', label: '关键功能全保留' },
              { v: 2000, s: ' 次', label: '充放循环寿命' },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-black text-emerald-300 mb-1.5 tabular-nums">
                  <CountUp to={m.v} suffix={m.s} prefix={m.prefix || ''} />
                </p>
                <p className="text-xs text-white/50">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 参数规格 ================= */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center gap-3 mb-10">
            <PlugZap size={20} className="text-emerald-600" />
            <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight">电池参数</h3>
            <span className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specs.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -5 }}
                  className="bg-[#f6f8f6] rounded-2xl border border-slate-200/70 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold tracking-wider mb-1.5">{spec.label}</p>
                  <p className="text-xl font-black text-slate-900 mb-1">{spec.value}</p>
                  <p className="text-xs text-slate-400 mb-3">{spec.detail}</p>
                  {spec.bar > 0 && (
                    <div className="h-1.5 rounded-full bg-slate-200/70 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${spec.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* ====== 完整产品参数规格表（左实拍图 + 右分组规格） ====== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 scroll-mt-24"
            id="product-specs"
          >
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold tracking-[0.4em] text-emerald-600 uppercase mb-4">
                Technical Specifications · 产品参数
              </p>
              <h3 className="font-display text-3xl md:text-4xl font-black tracking-tight">
                每一项参数，都为断电时刻负责
              </h3>
            </div>

            <div className="grid lg:grid-cols-[5fr_7fr] gap-8 lg:gap-12 items-start">
              {/* 左：真实产品实拍图 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:sticky lg:top-24"
              >
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200/70 border border-slate-200 shadow-[0_40px_100px_-50px_rgba(15,23,42,0.35)]">
                  <img
                    src={productShot}
                    alt="AegisCell Reserve AC-R260 备用电池组产品实拍"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  {/* 型号角标 */}
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-md border border-white">
                    <p className="text-[9px] font-bold tracking-[0.25em] text-emerald-600 uppercase">Model</p>
                    <p className="text-sm font-black text-slate-900 leading-tight mt-0.5">AC-R260</p>
                  </div>
                  {/* 底部状态条 */}
                  <div className="absolute bottom-0 inset-x-0 bg-white/88 backdrop-blur-md px-6 py-4 flex items-center justify-between border-t border-slate-200/70">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <span className="text-xs font-bold text-slate-800">备用电源就绪</span>
                    </div>
                    <span className="text-xs font-black text-emerald-600 tabular-nums">260 Wh</span>
                  </div>
                </div>

                {/* 图下三枚认证标 */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {['LiFePO4', 'UN38.3', 'BMS 2.0'].map((cert) => (
                    <div
                      key={cert}
                      className="bg-white border border-slate-200 rounded-xl py-3 text-center text-xs font-bold text-slate-600 tracking-wide"
                    >
                      {cert}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 右：三组规格表 */}
              <div className="space-y-8">
                {specGroups.map((group, gi) => (
                  <motion.div
                    key={group.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: gi * 0.12 }}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm"
                  >
                    <div className="flex items-center gap-3 px-6 md:px-7 py-4 border-b border-slate-100 bg-[#f6f8f6]">
                      <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-emerald-400 to-teal-600" />
                      <h4 className="text-sm font-black tracking-wide text-slate-900">{group.name}</h4>
                    </div>
                    <dl>
                      {group.rows.map(([label, value], ri) => (
                        <div
                          key={label}
                          className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 md:px-7 py-3.5 transition-colors duration-200 hover:bg-emerald-50/50 ${
                            ri !== group.rows.length - 1 ? 'border-b border-slate-100' : ''
                          }`}
                        >
                          <dt className="text-xs text-slate-400 font-medium sm:w-32 sm:flex-shrink-0">{label}</dt>
                          <dd className="text-sm font-semibold text-slate-800">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                ))}

                <p className="text-[11px] text-slate-400 leading-relaxed px-2">
                  * 续航数据基于 AegisElder SenSentinel 安全功能优先模式实测，实际时长因环境温度、使用强度与设备配置略有差异。
                </p>
              </div>
            </div>
          </motion.div>

          {/* 安心承诺 + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-10 md:p-14 text-white text-center relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-24 -right-24 w-72 h-72 border border-white/15 rounded-full"
            />
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-28 -left-28 w-80 h-80 border border-white/10 rounded-full"
            />
            <div className="relative z-10">
              <ShieldAlert size={34} className="mx-auto mb-5 text-emerald-100" />
              <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-4">
                给老人多一道「停电也安心」的保障
              </h2>
              <p className="text-sm md:text-base text-emerald-50/90 max-w-2xl mx-auto leading-relaxed mb-8">
                内置应急备用电池随 AegisDock 基座自动补满，无需老人任何操作；
                也可单独选购长效备用电池组（¥6,800）作为冗余配置。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 px-9 py-3.5 bg-white text-emerald-800 rounded-full text-sm font-bold hover:bg-emerald-50 transition-colors duration-300"
                >
                  咨询备用电池组
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-9 py-3.5 border border-white/40 hover:border-white rounded-full text-sm font-semibold transition-colors duration-300"
                >
                  <ArrowLeft size={15} />
                  返回上一页
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
