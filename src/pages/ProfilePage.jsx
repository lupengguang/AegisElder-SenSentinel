import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Wrench,
  MapPin,
  Ticket,
  Headphones,
  Settings,
  LogOut,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Clock,
  Wallet,
  ArrowLeft,
} from 'lucide-react';
import { products } from '../data/products';

/* ======================================================================
 * ProfilePage · 个人中心
 * 白色主题会员中心：左侧用户卡 + 右侧订单区（状态 Tab + 可展开服务时间线）
 * 登录态读取 localStorage('aegis_user')，未登录自动跳转 /login
 * ====================================================================== */

const STAGES = ['下单成功', '工厂智造', '出厂质检', '上门安装', '交付服务'];

const STATUS = {
  pending: { label: '待付款', cls: 'bg-amber-50 text-amber-600 border-amber-200', dot: 'bg-amber-500', action: '立即支付', actionCls: 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' },
  active: { label: '服务中', cls: 'bg-cyan-50 text-cyan-600 border-cyan-200', dot: 'bg-cyan-500', action: '联系管家', actionCls: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' },
  done: { label: '已完成', cls: 'bg-emerald-50 text-emerald-600 border-emerald-200', dot: 'bg-emerald-500', action: '再次购买', actionCls: 'bg-gray-900 text-white' },
};

// 模拟订单：pid 对应 products.js 真实产品；stage = 已完成阶段数
const ORDERS = [
  { no: 'ORD-20260914-011', pid: 5, date: '2026-09-14', status: 'pending', stage: 1, pay: '待支付 · 对公转账' },
  { no: 'ORD-20260912-003', pid: 2, date: '2026-09-12', status: 'active', stage: 3, pay: '分期付款 · 12 期' },
  { no: 'ORD-20260910-004', pid: 4, date: '2026-09-10', status: 'pending', stage: 1, pay: '待支付 · 企业月结' },
  { no: 'ORD-20260905-001', pid: 1, date: '2026-09-05', status: 'active', stage: 5, pay: '微信支付' },
  { no: 'ORD-20260828-006', pid: 3, date: '2026-08-28', status: 'done', stage: 5, pay: '全款 · 银行转账' },
  { no: 'ORD-20260815-002', pid: 7, date: '2026-08-15', status: 'done', stage: 5, pay: '政府采购 · 专项拨款' },
];

const fmt = (n) => `¥${n.toLocaleString('zh-CN')}`;

export default function ProfilePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('全部');
  const [expanded, setExpanded] = useState(null);
  const [hint, setHint] = useState('');

  // 未登录跳转登录页
  useEffect(() => {
    if (!localStorage.getItem('aegis_user')) navigate('/login');
  }, [navigate]);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('aegis_user')) || {};
    } catch {
      return {};
    }
  }, []);
  const displayName = user.name || '森卫用户';
  const email = user.email || 'guest@aegiselder.com';
  const since = user.since || '2026';

  const orders = useMemo(
    () => ORDERS.map((o) => ({ ...o, product: products.find((p) => p.id === o.pid) })).filter((o) => o.product),
    []
  );
  const counts = {
    全部: orders.length,
    待付款: orders.filter((o) => o.status === 'pending').length,
    服务中: orders.filter((o) => o.status === 'active').length,
    已完成: orders.filter((o) => o.status === 'done').length,
  };
  const visible = tab === '全部' ? orders : orders.filter((o) => STATUS[o.status].label === tab);

  const toast = (msg) => {
    setHint(msg);
    setTimeout(() => setHint(''), 1800);
  };

  const logout = () => {
    localStorage.removeItem('aegis_user');
    navigate('/login');
  };

  const menu = [
    { icon: Package, label: '我的订单', active: true },
    { icon: Wrench, label: '服务工单' },
    { icon: MapPin, label: '地址管理' },
    { icon: Ticket, label: '优惠券' },
    { icon: Headphones, label: '专属管家' },
    { icon: Settings, label: '账号设置' },
  ];

  const stats = [
    { icon: Package, label: '累计订单', value: counts.全部, tint: 'bg-cyan-50 text-cyan-600' },
    { icon: Wrench, label: '服务中', value: counts.服务中, tint: 'bg-blue-50 text-blue-600' },
    { icon: Sparkles, label: '会员积分', value: '3,260', tint: 'bg-purple-50 text-purple-600' },
    { icon: Ticket, label: '优惠券', value: 3, tint: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 text-gray-900"
    >
      {/* 全局提示 */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-gray-900 text-white text-xs shadow-xl"
          >
            {hint}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
        {/* 返回 */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-600 transition-colors mb-6"
        >
          <ArrowLeft size={14} /> 返回首页
        </button>

        {/* 欢迎横幅 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-gray-100 p-6 md:p-8 mb-6"
        >
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-cyan-300/20 rounded-full blur-3xl" />
          <h1 className="relative font-display text-2xl md:text-3xl font-bold tracking-tight">
            {displayName}，欢迎回来
          </h1>
          <p className="relative text-sm text-gray-500 mt-2">
            会员自 {since} 年起 · 科技守伴，安护朝夕
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px,1fr] gap-6 items-start">
          {/* ============ 左侧用户卡 ============ */}
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-24"
          >
            {/* 头像 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 blur-[6px] opacity-60" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              </div>
              <h2 className="mt-4 font-semibold text-lg">{displayName}</h2>
              <p className="text-xs text-gray-400 mt-0.5 break-all max-w-full">{email}</p>
              <span className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[11px] font-semibold">
                <Sparkles size={11} /> 黑金会员 · 至尊服务
              </span>
            </div>

            {/* 菜单 */}
            <div className="mt-6 pt-5 border-t border-gray-100 space-y-1">
              {menu.map((m) => (
                <button
                  key={m.label}
                  onClick={() => (m.active ? setTab('全部') : toast(`「${m.label}」功能即将上线`))}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    m.active
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <m.icon size={16} />
                  {m.label}
                  <ChevronRight size={14} className={`ml-auto ${m.active ? 'text-cyan-100' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>

            {/* 退出登录 */}
            <button
              onClick={logout}
              className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} /> 退出登录
            </button>
          </motion.aside>

          {/* ============ 右侧主区 ============ */}
          <div className="min-w-0">
            {/* 统计行 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.tint} mb-3`}>
                    <s.icon size={17} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* 订单区 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* 头部 + Tab */}
              <div className="px-5 md:px-7 pt-6 pb-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-lg md:text-xl font-bold tracking-tight">我的订单</h3>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(counts).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        tab === t ? 'text-white' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {tab === t && (
                        <motion.span
                          layoutId="orderTab"
                          className="absolute inset-0 rounded-full bg-gray-900"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">
                        {t}
                        <span className={`ml-1 ${tab === t ? 'text-cyan-300' : 'text-gray-300'}`}>{counts[t]}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 订单列表 */}
              <div className="p-4 md:p-5 space-y-4">
                <AnimatePresence mode="popLayout">
                  {visible.map((o, idx) => {
                    const st = STATUS[o.status];
                    const isOpen = expanded === o.no;
                    return (
                      <motion.div
                        key={o.no}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                        className="rounded-2xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-500/5 transition-colors"
                      >
                        {/* 单据头 */}
                        <div className="flex items-center justify-between px-4 md:px-5 pt-4 text-xs">
                          <span className="text-gray-400 font-mono">{o.no}</span>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-semibold ${st.cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${o.status === 'active' ? 'animate-pulse' : ''}`} />
                            {st.label}
                          </span>
                        </div>

                        {/* 商品行 */}
                        <div
                          className="flex items-center gap-4 px-4 md:px-5 py-4 cursor-pointer"
                          onClick={() => setExpanded(isOpen ? null : o.no)}
                        >
                          <img
                            src={o.product.images[0]}
                            alt={o.product.name}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm md:text-base truncate">{o.product.name}</p>
                            <p className="text-xs text-gray-400 mt-1 truncate">{o.product.hardware}</p>
                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                              <Clock size={11} /> 下单 {o.date} · {o.pay}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-sm md:text-base">{fmt(o.product.price)}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">含安装调试</p>
                          </div>
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-gray-300 hidden sm:block">
                            <ChevronDown size={18} />
                          </motion.span>
                        </div>

                        {/* 服务进度时间线（可展开） */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="timeline"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="mx-4 md:mx-5 mb-4 p-4 md:p-5 rounded-xl bg-white border border-gray-100">
                                <p className="text-xs font-semibold text-gray-500 mb-4">
                                  服务进度 · 当前阶段
                                  <span className="text-cyan-600 ml-1">
                                    {STAGES[Math.min(o.stage, STAGES.length) - 1]}
                                  </span>
                                </p>
                                <div className="flex">
                                  {STAGES.map((s, i) => {
                                    const done = i < o.stage;
                                    const current = i === o.stage - 1 && o.status !== 'done';
                                    return (
                                      <div key={s} className="flex-1 relative">
                                        {/* 连接线 */}
                                        {i > 0 && (
                                          <div
                                            className={`absolute top-2 right-1/2 w-full h-0.5 ${
                                              i < o.stage ? 'bg-cyan-400' : 'bg-gray-200'
                                            }`}
                                          />
                                        )}
                                        {/* 节点 */}
                                        <div className="relative flex flex-col items-center gap-1.5">
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.07, type: 'spring', stiffness: 300 }}
                                            className={`w-4 h-4 rounded-full flex items-center justify-center z-10 ${
                                              done
                                                ? 'bg-cyan-500'
                                                : 'bg-white border-2 border-gray-200'
                                            }`}
                                          >
                                            {done && <Check size={10} className="text-white" strokeWidth={3} />}
                                          </motion.div>
                                          {current && (
                                            <motion.span
                                              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                                              transition={{ duration: 1.4, repeat: Infinity }}
                                              className="absolute top-0 w-4 h-4 rounded-full bg-cyan-400"
                                            />
                                          )}
                                          <span
                                            className={`text-[10px] md:text-[11px] whitespace-nowrap ${
                                              done ? 'text-gray-700 font-semibold' : 'text-gray-300'
                                            }`}
                                          >
                                            {s}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* 底部操作 */}
                        <div className="flex items-center justify-between px-4 md:px-5 pb-4">
                          <button
                            onClick={() => setExpanded(isOpen ? null : o.no)}
                            className="text-xs text-gray-400 hover:text-cyan-600 transition-colors inline-flex items-center gap-1"
                          >
                            {isOpen ? '收起进度' : '查看服务进度'}
                            <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                              <ChevronDown size={12} />
                            </motion.span>
                          </button>
                          <div className="flex items-center gap-2">
                            {o.status === 'pending' && (
                              <span className="hidden md:inline text-[11px] text-amber-500">请于 24 小时内完成支付</span>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() =>
                                o.status === 'done'
                                  ? navigate(`/product/${o.pid}`)
                                  : toast(o.status === 'pending' ? '演示环境：支付通道模拟成功' : '已为您接入专属服务管家')
                              }
                              className={`px-4 py-1.5 rounded-full text-xs font-semibold ${st.actionCls}`}
                            >
                              {st.action}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
