import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Home, Building2, Landmark, LayoutGrid, Cpu, Check, ChevronDown,
  ArrowRight, Plug, AlertTriangle, Star, Sparkles, ShieldCheck,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products, segments } from '../data/products';

/* ======================================================================
 * Products · 分级产品矩阵（白色主题）
 * C 端家庭 / B 端机构 / G 端民政，每端 3 档梯度
 * 场景切换 + 3D 倾斜卡片 + 功能展开
 * ====================================================================== */

const tabs = [
  { key: 'ALL', label: '全部矩阵', icon: LayoutGrid },
  { key: 'C', label: 'C 端 · 家庭', icon: Home },
  { key: 'B', label: 'B 端 · 机构', icon: Building2 },
  { key: 'G', label: 'G 端 · 民政', icon: Landmark },
];

/* 每端主题色（白底适配：深字 + 浅底） */
const themeMap = {
  C: {
    text: 'text-cyan-600',
    chip: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    glow: 'shadow-[0_24px_60px_-18px_rgba(8,145,178,0.35)]',
    bar: 'from-cyan-500 to-blue-500',
    ring: 'hover:border-cyan-300',
    gradIcon: 'from-cyan-50 to-blue-50 border-cyan-200',
  },
  B: {
    text: 'text-blue-600',
    chip: 'bg-blue-50 border-blue-200 text-blue-700',
    glow: 'shadow-[0_24px_60px_-18px_rgba(37,99,235,0.35)]',
    bar: 'from-blue-500 to-indigo-500',
    ring: 'hover:border-blue-300',
    gradIcon: 'from-blue-50 to-indigo-50 border-blue-200',
  },
  G: {
    text: 'text-teal-600',
    chip: 'bg-teal-50 border-teal-200 text-teal-700',
    glow: 'shadow-[0_24px_60px_-18px_rgba(13,148,136,0.35)]',
    bar: 'from-teal-500 to-emerald-500',
    ring: 'hover:border-teal-300',
    gradIcon: 'from-teal-50 to-emerald-50 border-teal-200',
  },
};

const segmentIcon = { C: Home, B: Building2, G: Landmark };

/* ---------- 3D 倾斜 + 功能展开的档位卡片 ---------- */
function TierCard({ product, index }) {
  const theme = themeMap[product.segment];
  const [expanded, setExpanded] = useState(false);
  const featured = product.tier === 2; // 中间档主推高亮

  /* 3D 倾斜（鼠标跟随，弹簧平滑） */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const visibleFeatures = expanded ? product.features : product.features.slice(0, 3);
  const hiddenCount = product.features.length - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      className="[perspective:1200px]"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -8 }}
        className={`group relative h-full rounded-2xl border bg-white overflow-hidden flex flex-col transition-all duration-300 shadow-sm hover:shadow-xl ${theme.ring} ${
          featured ? `border-cyan-300 ${theme.glow} lg:-mt-4 lg:mb-4` : 'border-gray-200'
        }`}
      >
        {/* 顶部渐变条（主推款） */}
        {featured && (
          <div className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r ${theme.bar}`} />
        )}

        {/* 图片区 */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
          {/* 光泽扫过 */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          {/* 档位编号 + 徽章 */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold font-mono backdrop-blur-md ${theme.chip}`}>
              {String(product.tier).padStart(2, '0')}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${theme.chip}`}>
              {product.badge}
            </span>
            {featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30">
                <Sparkles size={10} />
                主推
              </span>
            )}
          </div>
        </div>

        {/* 文案区 */}
        <div className="p-5 flex flex-col flex-1" style={{ transform: 'translateZ(30px)' }}>
          <p className={`text-[10px] tracking-[0.25em] uppercase font-semibold ${theme.text} mb-1.5`}>
            {product.enName}
          </p>
          <h3 className="text-lg font-bold text-gray-900 leading-snug">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{product.positioning}</p>

          {/* 硬件配置 */}
          <div className={`mt-3 flex items-start gap-2 rounded-lg border px-3 py-2 ${theme.gradIcon}`}>
            <Cpu size={14} className={`${theme.text} flex-shrink-0 mt-0.5`} />
            <p className="text-[11px] text-gray-600 leading-relaxed">{product.hardware}</p>
          </div>

          {/* 核心功能 */}
          <div className="mt-4 flex-1">
            <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">核心功能</p>
            <ul className="space-y-2">
              <AnimatePresence initial={false}>
                {visibleFeatures.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-start gap-2 text-[11.5px] text-gray-700 leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                      <Check size={10} className={theme.text} />
                    </span>
                    {f}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            {hiddenCount > 0 && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className={`mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold ${theme.text} hover:opacity-80 transition-opacity`}
              >
                {expanded ? '收起功能' : `展开全部 ${product.features.length} 项功能（+${hiddenCount}）`}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                />
              </button>
            )}
          </div>

          {/* 配套 + 限制 */}
          <div className="mt-4 space-y-1.5">
            <p className="flex items-start gap-1.5 text-[10.5px] text-gray-500 leading-relaxed">
              <Plug size={11} className={`${theme.text} flex-shrink-0 mt-0.5`} />
              {product.accessory}
            </p>
            <p className="flex items-start gap-1.5 text-[10.5px] text-amber-700/80 leading-relaxed">
              <AlertTriangle size={11} className="text-amber-500 flex-shrink-0 mt-0.5" />
              {product.limitation}
            </p>
          </div>

          {/* 价格 + CTA */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-end justify-between gap-3">
            <div>
              {product.priceLabel ? (
                <p className="text-base font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  {product.priceLabel}
                </p>
              ) : (
                <>
                  <p className="text-xl font-bold text-gray-900">
                    ¥{product.price.toLocaleString()}
                    <span className="text-[10px] font-normal text-gray-400 ml-1">起</span>
                  </p>
                  {product.originalPrice && (
                    <p className="text-[10px] text-gray-400 line-through">¥{product.originalPrice.toLocaleString()}</p>
                  )}
                </>
              )}
              <p className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                {product.rating} · {product.reviews} 评价
              </p>
            </div>
            <Link
              to={`/product/${product.id}`}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r ${theme.bar} hover:opacity-90 transition-opacity shadow-lg`}
            >
              查看详情
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- 单个场景分组 ---------- */
function SegmentGroup({ segmentKey, index: groupIndex }) {
  const meta = segments.find((s) => s.key === segmentKey);
  const list = products.filter((p) => p.segment === segmentKey);
  const Icon = segmentIcon[segmentKey];
  const theme = themeMap[segmentKey];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      {/* 分组头 */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center bg-gradient-to-br ${theme.gradIcon}`}>
            <Icon size={22} className={theme.text} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {meta.title}
              <span className={`ml-3 align-middle text-xs font-mono ${theme.text}`}>
                {String(groupIndex + 1).padStart(2, '0')}
              </span>
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1">{meta.subtitle}</p>
          </div>
        </div>
        <Link
          to={meta.link}
          className={`inline-flex items-center gap-1.5 self-start md:self-auto text-xs font-semibold ${theme.text} hover:gap-2.5 transition-all`}
        >
          {meta.linkLabel}
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* 三档卡片 */}
      <div className="grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {list.map((p, i) => (
          <TierCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {/* 梯度连接条 */}
      <div className="hidden md:flex items-center justify-center gap-2 mt-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className={`h-[2px] w-12 rounded-full origin-left bg-gradient-to-r ${theme.bar} opacity-50`}
          />
        ))}
        <ShieldCheck size={14} className={theme.text} />
        <span className="text-[10px] tracking-[0.3em] text-gray-400 uppercase ml-1">梯度进阶 · 按需部署</span>
      </div>
    </motion.section>
  );
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const validKeys = ['ALL', 'C', 'B', 'G'];
  const initial = validKeys.includes(searchParams.get('scene')) ? searchParams.get('scene') : 'ALL';
  const [scene, setScene] = useState(initial);

  useEffect(() => {
    const s = searchParams.get('scene');
    if (validKeys.includes(s)) setScene(s);
    else if (!s) setScene('ALL');
  }, [searchParams]);

  const switchScene = (key) => {
    setScene(key);
    if (key === 'ALL') setSearchParams({});
    else setSearchParams({ scene: key });
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  const visibleSegments = scene === 'ALL' ? ['C', 'B', 'G'] : [scene];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white text-gray-900 overflow-x-hidden"
    >
      <Navbar />

      {/* 背景氛围（浅色） */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[180px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* ===== Hero ===== */}
      <header className="relative pt-32 md:pt-40 pb-10 px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold tracking-[0.45em] text-cyan-600 uppercase mb-5">
            <span className="w-6 h-px bg-cyan-400" />
            Product Matrix
            <span className="w-6 h-px bg-cyan-400" />
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              分级产品矩阵
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            面向家庭、养老机构、民政公益三大场景，3 档梯度产品，
            <br className="hidden md:block" />
            按需灵活部署森卫安护人形陪护机器人。
          </p>

          {/* 数据概览 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex items-center justify-center gap-6 md:gap-10"
          >
            {[
              { num: '3', label: '核心场景' },
              { num: '9', label: '梯度产品' },
              { num: '3', label: 'Ai5 算力档' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-b from-gray-900 to-gray-500 bg-clip-text text-transparent">
                  {s.num}
                </p>
                <p className="text-[10px] md:text-xs text-gray-400 mt-1 tracking-wider">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </header>

      {/* ===== 场景切换 Tab（吸顶） ===== */}
      <div className="sticky top-16 z-30 backdrop-blur-xl bg-white/80 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center gap-2 md:gap-3 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = scene === t.key;
            return (
              <button
                key={t.key}
                onClick={() => switchScene(t.key)}
                className={`relative inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-colors ${
                  active ? 'text-white' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="sceneTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border border-cyan-400 shadow-[0_8px_24px_rgba(6,182,212,0.3)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={14} className="relative z-10" />
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== 产品分组 ===== */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {visibleSegments.map((segKey, i) => (
              <SegmentGroup key={segKey} segmentKey={segKey} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ===== 底部总 CTA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-gray-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 p-8 md:p-12 text-center overflow-hidden mb-10 shadow-sm"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-200/40 rounded-full blur-[120px] pointer-events-none" />
          <h2 className="relative text-2xl md:text-3xl font-bold text-gray-900 mb-3">不确定哪一档最适合？</h2>
          <p className="relative text-sm text-gray-500 max-w-xl mx-auto mb-7">
            告诉我们长者的照护现状、机构规模或民政项目需求，方案顾问将为您推荐最合适的档位组合。
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25"
            >
              预约方案咨询
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/robot-detail"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-cyan-700 border border-cyan-300 bg-white/70 hover:bg-cyan-50 transition-colors"
            >
              了解 AegisEdge Ai5 算力
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  );
}
