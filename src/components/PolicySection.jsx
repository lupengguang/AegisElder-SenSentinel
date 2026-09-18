import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Landmark, ArrowRight, Building2, Home, ShieldCheck } from 'lucide-react';

/* ======================================================================
 * PolicySection · 首页政策入口板块
 * 深蓝黑科技风 + 青绿色高亮，整卡可点击跳转 /policy
 * ====================================================================== */

const quickRows = [
  { icon: Landmark, badge: 'G 端', label: '民政公益', ratio: '最高 30%' },
  { icon: Building2, badge: 'B 端', label: '养老机构', ratio: '15% – 25%' },
  { icon: Home, badge: 'C 端', label: '家庭用户', ratio: '10% – 15%' },
];

export default function PolicySection() {
  return (
    <section className="relative py-20 md:py-28 bg-black overflow-hidden">
      {/* 背景光晕 + 网格 */}
      <div className="absolute top-0 left-1/4 w-[460px] h-[460px] bg-cyan-600/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-teal-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(45,212,191,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/policy" className="block group">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -6 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-8 md:p-14 hover:border-cyan-400/40 transition-colors duration-300"
          >
            {/* 顶部光条 */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400" />

            <div className="grid lg:grid-cols-[1.5fr,1fr] gap-10 lg:gap-16 items-center">
              {/* 左：文案 */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-white/5 border border-cyan-400/30 rounded-full px-4 py-1.5 mb-6"
                >
                  <ShieldCheck size={13} className="text-cyan-300" />
                  <span className="text-[11px] font-semibold tracking-[0.25em] text-cyan-200 uppercase">
                    Policy · 政策扶持
                  </span>
                </motion.div>

                <h2 className="font-display text-3xl md:text-5xl font-black leading-tight mb-5">
                  <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                    国家优先扶持政策
                  </span>
                </h2>

                <p className="text-base md:text-lg font-semibold text-white/80 mb-4">
                  积极响应国家银发经济战略，森卫安护享受多重政策补贴支持
                </p>

                <p className="text-sm md:text-base text-white/55 leading-relaxed mb-8 max-w-2xl">
                  作为银发经济与 AI 养老领域的创新产品，森卫安护享受国家及地方多层次政策扶持。
                  根据部署地区与客户类型不同，
                  <span className="text-cyan-300 font-semibold">最高可享受 30% 至 15% 的购置补贴优惠</span>。
                </p>

                {/* 跳转按钮 */}
                <span className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-black text-sm font-bold shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/40 group-hover:from-cyan-400 group-hover:to-teal-400 transition-all">
                  查看补贴政策与申请流程
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex"
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </span>
              </div>

              {/* 右：三类客户速览 */}
              <div className="space-y-3">
                {quickRows.map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <motion.div
                      key={row.badge}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-4 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 group-hover:border-cyan-400/30 group-hover:bg-black/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/25 to-emerald-500/25 border border-white/15 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-cyan-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold tracking-[0.25em] text-white/40">{row.badge}</p>
                        <p className="text-sm font-semibold text-white/85">{row.label}</p>
                      </div>
                      <p className="font-display text-base md:text-lg font-black text-teal-300 whitespace-nowrap">
                        {row.ratio}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
