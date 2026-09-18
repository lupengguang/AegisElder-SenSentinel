import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Building2,
  Check,
  X,
  Star,
  Sparkles,
  HeartPulse,
  DoorOpen,
  Cpu,
  Wallet,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronDown,
  RotateCcw,
  MapPin,
  UserCheck,
  Wrench,
} from 'lucide-react';
import Footer from '../components/Footer';

/* ======================================================================
 * BuyingGuide · 购买指南
 * 森卫安护人形陪护机器人 —— 分级智能照护选型指南
 * 白色科技风 + 智能选型器 + 机型卡 + 对照表 + 交付时间线
 * ====================================================================== */

/* ---------- 机型数据（价格以指南口径为准） ---------- */
const models = [
  {
    id: 1,
    code: 'C1',
    name: '基础陪护版',
    tag: '入门款',
    series: 'C',
    accent: 'cyan',
    price: '¥39,800 起',
    priceNote: '',
    config: '简化人形机身 · AegisEdge Ai5 轻量算力版 · 双目视觉跌倒识别 · 手机 APP 告警推送',
    fit: [
      '老人生活基本自理，主要需求：安全告警、用药提醒、日常聊天',
      '预算有限，低成本试水 AI 居家看护',
      '小户型、不需要机器人全屋移动行走',
    ],
    unfit: ['需要搀扶起身、喂药、重度失能照护', '多房间长距离自主巡检'],
    stars: 3,
    scene: '自理老人居家安全守护',
    ability: '跌倒告警、语音提醒',
  },
  {
    id: 2,
    code: 'C2',
    name: '进阶陪护版',
    tag: '主推款 · 推荐首选',
    series: 'C',
    accent: 'cyan',
    featured: true,
    price: '¥96,800 起',
    priceNote: '',
    config: '完整人形本体 · AegisEdge Ai5 标准版 · 360° 环境视觉 · 多模态情感识别 · 自动回充基座',
    fit: [
      '老人行动缓慢，需要全屋跟随陪伴、情绪安抚',
      '子女异地，需要远程视频探视，随时查看家中状况',
      '两居室 / 三居室家庭，室内自主导航漫游',
    ],
    unfit: ['需要物理力控辅助转移、搀扶失能老人'],
    stars: 5,
    scene: '普通家庭全场景陪伴',
    ability: '全屋导航、远程探视',
  },
  {
    id: 3,
    code: 'C3',
    name: '家庭旗舰全护版',
    tag: '顶配款',
    series: 'C',
    accent: 'purple',
    price: '¥168,000 起',
    priceNote: '',
    config: '全尺寸人形本体 · AegisEdge Ai5 满配算力 · 力控柔性关节 · 全身多传感器 · 5 小时断电应急电池',
    fit: [
      '半失能 / 重度失能长者，需要肢体辅助照护',
      '需要持续健康体征监测、夜间全屋安防巡检',
      '追求全功能，对算力、安全冗余要求高',
    ],
    unfit: ['预算有限、仅简单提醒类基础需求'],
    stars: 4,
    scene: '家庭重度失能照护',
    ability: '力控搀扶、体征监测',
  },
  {
    id: 4,
    code: 'B1',
    name: '机构标准版',
    tag: '单房间部署',
    series: 'B',
    accent: 'blue',
    price: '¥128,000 起',
    priceNote: '',
    config: '进阶人形本体 · AegisEdge Ai5 标准版 · 跌倒识别/离床告警 · 一键呼叫护理员 · 定时巡房',
    fit: ['养老院单间独立部署，单房间基础看护，单台独立运行'],
    unfit: ['多机器人集群联网、跨楼层调度'],
    stars: 3,
    scene: '养老单间独立看护',
    ability: '单间监测、离床报警',
  },
  {
    id: 5,
    code: 'B2',
    name: '机构专业照护版',
    tag: '楼层级部署',
    series: 'B',
    accent: 'blue',
    featured: true,
    price: '¥268,000 起',
    priceNote: '',
    config: '全尺寸人形本体 · AegisEdge Ai5 满配算力 · 力控上肢 · 楼层自主导航 · 护理后台对接',
    fit: ['整楼层批量部署，护理减负主力机型', '跨房间自主巡检、递送餐食药品，辅助老人坐姿调整'],
    unfit: ['全院多机协同调度、大屏总控'],
    stars: 5,
    scene: '养老楼层批量部署',
    ability: '楼层巡检、物品递送',
  },
  {
    id: 6,
    code: 'B3',
    name: '机构集群管理旗舰版',
    tag: '全院级',
    series: 'B',
    accent: 'indigo',
    price: '项目询价制',
    priceNote: '含集中充电站与全屋应急供电方案，需信息化系统对接集成',
    config: '旗舰人形本体 · AegisEdge Ai5 满配算力 · 多机集群协同总线 · 可视化大屏平台 · AI 风险分级评估',
    fit: ['大型养老院、CCRC 康养社区，多机器人全院协同', '可视化大屏平台，AI 老人风险分级评估'],
    unfit: ['小规模单间场景（建议 B1 即可，避免过度配置）'],
    stars: 4,
    scene: '大型康养社区',
    ability: '多机集群、全院大屏管控',
  },
];

/* ---------- 智能选型器：问答逻辑 ---------- */
const wizard = [
  {
    key: 'care',
    title: '需要照护的长者目前状态？',
    icon: HeartPulse,
    options: [
      { label: '生活基本自理', desc: '仅需安全告警与提醒', value: 'self' },
      { label: '行动缓慢', desc: '需要陪伴与远程探视', value: 'slow' },
      { label: '半失能 / 重度失能', desc: '需要肢体辅助照护', value: 'disabled' },
      { label: '机构集中照护', desc: '养老院 / 康养社区', value: 'facility' },
    ],
  },
  {
    key: 'space',
    title: '使用空间范围？',
    icon: DoorOpen,
    options: [
      { label: '单间 / 小户型', desc: '原地或单间使用', value: 'room' },
      { label: '多居室全屋', desc: '两居 / 三居，全屋漫游', value: 'home' },
      { label: '整楼层', desc: '多个房间跨室巡检', value: 'floor' },
      { label: '全院 / 多楼层', desc: 'CCRC 大型社区', value: 'campus' },
    ],
  },
  {
    key: 'budget',
    title: '预算范围？',
    icon: Wallet,
    options: [
      { label: '5 万以内', desc: '低成本入门', value: 'low' },
      { label: '10 – 20 万', desc: '主流家用 / 单间机构', value: 'mid' },
      { label: '20 – 30 万', desc: '专业楼层部署', value: 'high' },
      { label: '项目预算', desc: '集群采购 / 政府采购', value: 'project' },
    ],
  },
];

/* 推荐打分：每答完一题对 6 款机型打分，取最高分 */
function scoreModel(model, answers) {
  let score = 0;
  const { care, space, budget } = answers;
  // 照护状态
  if (care === 'self') score += model.code === 'C1' ? 3 : model.code === 'C2' ? 2 : model.series === 'B' ? 0 : 1;
  if (care === 'slow') score += model.code === 'C2' ? 3 : model.code === 'C1' ? 1 : model.series === 'B' ? 0 : 2;
  if (care === 'disabled') score += model.code === 'C3' ? 3 : model.code === 'B3' ? 2 : 0;
  if (care === 'facility') score += model.series === 'B' ? 3 : 0;
  // 空间
  if (space === 'room') score += ['C1', 'B1'].includes(model.code) ? 3 : 0;
  if (space === 'home') score += ['C2', 'C3'].includes(model.code) ? 3 : model.code === 'C1' ? 1 : 0;
  if (space === 'floor') score += model.code === 'B2' ? 3 : model.code === 'B1' ? 1 : 0;
  if (space === 'campus') score += model.code === 'B3' ? 3 : 0;
  // 预算
  if (budget === 'low') score += model.code === 'C1' ? 3 : 0;
  if (budget === 'mid') score += ['C2', 'C3', 'B1'].includes(model.code) ? 3 : 0;
  if (budget === 'high') score += model.code === 'B2' ? 3 : model.code === 'C3' ? 2 : 0;
  if (budget === 'project') score += model.code === 'B3' ? 3 : 0;
  return score;
}

/* ---------- 考量因素 ---------- */
const factors = [
  {
    icon: HeartPulse,
    title: '照护等级优先',
    text: '自理老人 → C1 / B1；行动不便 → C2 / B2；半失能、需要物理肢体辅助 → C3 / B3',
    color: 'cyan',
  },
  {
    icon: MapPin,
    title: '空间条件',
    text: '小户型、单房间可选 C1 / B1；多房间、多层建筑优先 C2 / C3 / B2 / B3',
    color: 'blue',
  },
  {
    icon: Cpu,
    title: '算力与续航',
    text: '基础款无应急电池；C3 / B3 标配断电应急供电，停电依旧持续守护',
    color: 'purple',
  },
  {
    icon: Wrench,
    title: '部署成本',
    text: '家用款开箱 + 简单调试即可使用；B3 旗舰集群版需要信息化系统集成，提供上门实施服务',
    color: 'indigo',
  },
];

/* ---------- 售后交付 ---------- */
const delivery = [
  {
    icon: Truck,
    title: '交付周期',
    lines: ['家用机型：4 周', '机构批量机型：6 – 10 周'],
  },
  {
    icon: ShieldCheck,
    title: '质保政策',
    lines: ['整机 2 年质保', 'AegisEdge Ai5 芯片核心模块 3 年保修'],
  },
  {
    icon: RefreshCw,
    title: '持续服务',
    lines: ['上门安装调试、操作培训', '终身在线 OTA 模型升级'],
  },
];

const accentMap = {
  cyan: {
    text: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    btn: 'from-cyan-500 to-blue-500',
    ring: 'shadow-cyan-500/30',
    dot: 'bg-cyan-500',
  },
  blue: {
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    btn: 'from-blue-500 to-indigo-500',
    ring: 'shadow-blue-500/30',
    dot: 'bg-blue-500',
  },
  purple: {
    text: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    btn: 'from-purple-500 to-fuchsia-500',
    ring: 'shadow-purple-500/30',
    dot: 'bg-purple-500',
  },
  indigo: {
    text: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    btn: 'from-indigo-500 to-blue-600',
    ring: 'shadow-indigo-500/30',
    dot: 'bg-indigo-500',
  },
};

/* 机型卡片 */
function ModelCard({ model, index }) {
  const [open, setOpen] = useState(false);
  const a = accentMap[model.accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8 }}
      className={`relative bg-white rounded-3xl border ${
        model.featured ? 'border-cyan-300 shadow-xl shadow-cyan-500/15' : 'border-gray-200 shadow-lg shadow-gray-200/60'
      } p-7 flex flex-col overflow-hidden group`}
    >
      {model.featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-l from-cyan-500 to-blue-500 text-white text-[11px] font-semibold px-4 py-1.5 rounded-bl-2xl flex items-center gap-1">
            <Sparkles size={12} />
            {model.tag}
          </div>
        </div>
      )}

      {/* 编号 + 系列 */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-12 h-12 rounded-2xl ${a.bg} ${a.border} border flex items-center justify-center font-display font-bold text-lg ${a.text}`}
        >
          {model.code}
        </div>
        {!model.featured && (
          <span className={`text-xs px-3 py-1 rounded-full ${a.bg} ${a.text} font-medium`}>{model.tag}</span>
        )}
      </div>

      <h3 className="font-display text-xl font-bold text-gray-900 mb-1">森卫 {model.code} {model.name}</h3>
      <p className="text-xs text-gray-400 mb-5 leading-relaxed">{model.config}</p>

      {/* 适合 */}
      <div className="mb-3">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mb-2">
          <Check size={14} /> 适合选购
        </p>
        <ul className="space-y-1.5">
          {model.fit.map((f) => (
            <li key={f} className="flex gap-2 text-[13px] text-gray-600 leading-relaxed">
              <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* 不适合（折叠） */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 mb-2 hover:text-rose-600 transition-colors w-fit"
      >
        <X size={14} /> 不适合
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={13} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden space-y-1.5"
          >
            {model.unfit.map((u) => (
              <li key={u} className="flex gap-2 text-[13px] text-gray-500 leading-relaxed">
                <X size={14} className="text-rose-400 shrink-0 mt-0.5" />
                {u}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* 价格 + CTA */}
      <div className="mt-auto pt-6 flex items-end justify-between gap-3">
        <div>
          <p className={`font-display text-2xl font-bold ${model.price === '项目询价制' ? 'text-lg' : ''} ${a.text}`}>
            {model.price}
          </p>
          {model.priceNote && <p className="text-[11px] text-gray-400 mt-1 leading-tight max-w-[160px]">{model.priceNote}</p>}
        </div>
        <Link
          to={`/product/${model.id}`}
          className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r ${a.btn} text-white text-xs font-semibold shadow-lg ${a.ring} hover:scale-105 transition-transform`}
        >
          查看详情 <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

/* 星级（滚动点亮） */
function Stars({ count, delayBase = 0 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.2, scale: 0.6, rotate: -30 }}
          whileInView={{ opacity: i <= count ? 1 : 0.2, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delayBase + i * 0.12, type: 'spring', stiffness: 300, damping: 15 }}
        >
          <Star
            size={17}
            className={i <= count ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}
          />
        </motion.span>
      ))}
    </div>
  );
}

export default function BuyingGuide() {
  const navigate = useNavigate();
  const [seriesTab, setSeriesTab] = useState('C');

  /* 选型器状态 */
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const recommendation = useMemo(() => {
    if (!done) return null;
    const ranked = [...models]
      .map((m) => ({ m, s: scoreModel(m, answers) }))
      .sort((a, b) => b.s - a.s);
    return ranked[0].m;
  }, [done, answers]);

  const choose = (key, value) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step < wizard.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 220);
    } else {
      setTimeout(() => setDone(true), 220);
    }
  };

  const resetWizard = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  const filteredModels = models.filter((m) => m.series === seriesTab);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-gray-900 overflow-x-hidden"
    >
      {/* ============ Hero ============ */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* 浅色科技氛围 */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/70 via-white to-white pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-cyan-200/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -top-20 right-0 w-[420px] h-[420px] bg-purple-200/30 rounded-full blur-[140px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#0891b2 1px, transparent 1px), linear-gradient(90deg, #0891b2 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cyan-200 shadow-sm text-xs text-cyan-700 font-medium mb-7"
          >
            <UserCheck size={13} />
            森卫安护 · 分级智能照护选型指南
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            三步匹配
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              最合适的照护机型
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto"
          >
            森卫安护人形陪护机器人，面向家庭养老与专业养老机构，提供分级式智能照护方案。
            本指南帮助您根据<strong className="text-gray-700">使用场景、照护需求、预算</strong>，快速匹配最合适机型。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#wizard"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform"
            >
              <Sparkles size={16} /> 开始智能选型
            </a>
            <a
              href="#models"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-semibold hover:border-cyan-300 hover:text-cyan-600 transition-colors"
            >
              浏览全部机型
            </a>
          </motion.div>

          {/* 返回 */}
          <Link
            to="/"
            className="absolute -top-20 left-4 sm:left-8 inline-flex items-center gap-2 text-xs text-gray-400 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft size={14} /> 返回首页
          </Link>
        </div>
      </section>

      {/* ============ 智能选型器 ============ */}
      <section id="wizard" className="py-20 md:py-28 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.35em] text-cyan-600 uppercase mb-3">Smart Matcher</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">30 秒智能选型</h2>
            <p className="text-sm text-gray-500">回答三个问题，为您推荐最合适的森卫机型</p>
          </motion.div>

          <div className="bg-white rounded-[2rem] border border-gray-200 shadow-2xl shadow-gray-300/40 p-7 md:p-12 relative overflow-hidden">
            {/* 顶部进度 */}
            {!done && (
              <div className="flex items-center justify-center gap-3 mb-10">
                {wizard.map((w, i) => (
                  <div key={w.key} className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: i === step ? 1.15 : 1,
                        backgroundColor: i <= step ? '#0891b2' : '#fff',
                        color: i <= step ? '#fff' : '#9ca3af',
                        borderColor: i <= step ? '#0891b2' : '#d1d5db',
                      }}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold`}
                    >
                      {i < step || answers[w.key] ? <Check size={16} /> : i + 1}
                    </motion.div>
                    {i < wizard.length - 1 && (
                      <div className="w-10 md:w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          initial={{ width: '0%' }}
                          animate={{ width: i < step ? '100%' : '0%' }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="text-center mb-8">
                    {(() => {
                      const Icon = wizard[step].icon;
                      return (
                        <div className="inline-flex w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 items-center justify-center mb-4">
                          <Icon size={26} className="text-cyan-600" />
                        </div>
                      );
                    })()}
                    <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900">{wizard[step].title}</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {wizard[step].options.map((opt, i) => (
                      <motion.button
                        key={opt.value}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => choose(wizard[step].key, opt.value)}
                        className={`text-left p-5 rounded-2xl border-2 transition-colors ${
                          answers[wizard[step].key] === opt.value
                            ? 'border-cyan-500 bg-cyan-50/60'
                            : 'border-gray-200 hover:border-cyan-300 bg-white'
                        }`}
                      >
                        <p className="text-sm font-semibold text-gray-900 mb-1">{opt.label}</p>
                        <p className="text-xs text-gray-400">{opt.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 12 }}
                    className="inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 items-center justify-center mb-5 shadow-lg shadow-cyan-500/40"
                  >
                    <Sparkles size={28} className="text-white" />
                  </motion.div>
                  <p className="text-xs text-gray-400 mb-2">根据您的选择，我们推荐</p>
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-2">
                    <span className={`bg-gradient-to-r ${accentMap[recommendation.accent].btn} bg-clip-text text-transparent`}>
                      森卫 {recommendation.code}
                    </span>{' '}
                    {recommendation.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">{recommendation.scene}</p>
                  <p className={`font-display text-2xl font-bold ${accentMap[recommendation.accent].text} mb-7`}>
                    {recommendation.price}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    <button
                      onClick={() => navigate(`/product/${recommendation.id}`)}
                      className={`inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r ${accentMap[recommendation.accent].btn} text-white text-sm font-semibold shadow-lg ${accentMap[recommendation.accent].ring} hover:scale-105 transition-transform`}
                    >
                      查看机型详情 <ArrowRight size={15} />
                    </button>
                    <button
                      onClick={resetWizard}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-semibold hover:border-cyan-300 hover:text-cyan-600 transition-colors"
                    >
                      <RotateCcw size={14} /> 重新选型
                    </button>
                  </div>
                  {/* 匹配摘要 */}
                  <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto text-center">
                    {wizard.map((w) => {
                      const opt = w.options.find((o) => o.value === answers[w.key]);
                      return (
                        <div key={w.key} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <p className="text-[11px] text-gray-400 mb-1">{w.title.replace('？', '')}</p>
                          <p className="text-xs font-semibold text-gray-700">{opt?.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ============ 机型详解（C/B Tab） ============ */}
      <section id="models" className="py-20 md:py-28 bg-gradient-to-b from-gray-50/60 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-xs font-semibold tracking-[0.35em] text-cyan-600 uppercase mb-3">Product Lines</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">六大机型 · 分级详解</h2>
            <p className="text-sm text-gray-500">家用家庭版 C 系列 · 养老机构商用版 B 系列</p>
          </motion.div>

          {/* Tab */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-full bg-gray-100 border border-gray-200 relative">
              {[
                { key: 'C', label: '家用家庭版', sub: 'C 系列 · 居家养老', icon: Home },
                { key: 'B', label: '机构商用版', sub: 'B 系列 · 养老院/康养中心', icon: Building2 },
              ].map((t) => {
                const Icon = t.icon;
                const active = seriesTab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setSeriesTab(t.key)}
                    className={`relative z-10 flex items-center gap-2.5 px-6 md:px-9 py-3 rounded-full text-sm font-semibold transition-colors ${
                      active ? 'text-white' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="guideTab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Icon size={16} className="relative z-10" />
                    <span className="relative z-10">
                      {t.label}
                      <span className={`hidden md:inline ml-2 text-[11px] font-normal ${active ? 'text-cyan-100' : 'text-gray-400'}`}>
                        {t.sub}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredModels.map((m, i) => (
                <ModelCard key={m.code} model={m} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* 适用人群提示条 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 max-w-4xl mx-auto flex items-start gap-3 p-5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100"
          >
            {seriesTab === 'C' ? <Home size={18} className="text-cyan-600 shrink-0 mt-0.5" /> : <Building2 size={18} className="text-blue-600 shrink-0 mt-0.5" />}
            <p className="text-[13px] text-gray-600 leading-relaxed">
              {seriesTab === 'C'
                ? '适用人群：居家独居老人、半失能家庭、需要远程看护子女。'
                : '适用范围：养老单间、楼层、全院 CCRC 康养社区。'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ 快速选型对照表 ============ */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.35em] text-cyan-600 uppercase mb-3">Comparison</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">快速选型对照表</h2>
            <p className="text-sm text-gray-500">一张表看懂六款机型的定位差异</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/60 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <th className="px-6 py-5 text-sm font-semibold">机型</th>
                    <th className="px-6 py-5 text-sm font-semibold">核心场景</th>
                    <th className="px-6 py-5 text-sm font-semibold">核心能力</th>
                    <th className="px-6 py-5 text-sm font-semibold text-center">推荐指数</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((m, i) => (
                    <motion.tr
                      key={m.code}
                      initial={{ opacity: 0, x: -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => navigate(`/product/${m.id}`)}
                      className="border-t border-gray-100 cursor-pointer group transition-colors hover:bg-cyan-50/40"
                    >
                      <td className="px-6 py-5">
                        <span className="flex items-center gap-2">
                          <span className={`w-9 h-9 rounded-xl ${accentMap[m.accent].bg} ${accentMap[m.accent].text} flex items-center justify-center text-xs font-bold`}>
                            {m.code}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors">
                            {m.name}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-5 text-[13px] text-gray-600">{m.scene}</td>
                      <td className="px-6 py-5 text-[13px] text-gray-600">{m.ability}</td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <Stars count={m.stars} delayBase={i * 0.07} />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ 选购关键考量 ============ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.35em] text-cyan-600 uppercase mb-3">Key Factors</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">选购关键考量因素</h2>
            <p className="text-sm text-gray-500">四个维度，避免错配与过度配置</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {factors.map((f, i) => {
              const Icon = f.icon;
              const a = accentMap[f.color];
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl border border-gray-200 p-7 shadow-lg shadow-gray-200/50"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-13 h-13 w-[52px] h-[52px] rounded-2xl ${a.bg} ${a.border} border flex items-center justify-center mb-5`}
                  >
                    <Icon size={24} className={a.text} />
                  </motion.div>
                  <p className="text-[11px] font-bold text-gray-300 mb-1">0{i + 1}</p>
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{f.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 售后与交付 ============ */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.35em] text-cyan-600 uppercase mb-3">Delivery & Service</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">售后与交付说明</h2>
            <p className="text-sm text-gray-500">从交付到终身升级，全程无忧</p>
          </motion.div>

          <div className="relative">
            {/* 连接线 */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-200" />
            <div className="grid md:grid-cols-3 gap-8">
              {delivery.map((d, i) => {
                const Icon = d.icon;
                return (
                  <motion.div
                    key={d.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.15 }}
                    className="relative text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      className="relative z-10 w-20 h-20 mx-auto rounded-full bg-white border-2 border-cyan-200 shadow-lg shadow-cyan-500/15 flex items-center justify-center mb-6"
                    >
                      <Icon size={30} className="text-cyan-600" />
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </motion.div>
                    <h3 className="font-display text-lg font-bold text-gray-900 mb-3">{d.title}</h3>
                    {d.lines.map((line) => (
                      <p key={line} className="text-[13px] text-gray-500 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 底部 CTA ============ */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2.5rem] overflow-hidden p-10 md:p-16 text-center bg-gradient-to-br from-gray-900 via-[#0b1526] to-[#141028]"
          >
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                准备好为长者选择
                <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">最合适的守护者</span>
                了吗？
              </h2>
              <p className="text-sm md:text-base text-white/60 mb-9 max-w-2xl mx-auto">
                浏览完整分级产品矩阵，或联系我们获取一对一选型咨询与上门勘测服务。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform"
                >
                  查看全部产品 <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
                >
                  联系选型顾问
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
