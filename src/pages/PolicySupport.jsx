import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Landmark,
  Building2,
  Home,
  Flag,
  Wallet,
  Receipt,
  FileCheck2,
  SearchCheck,
  Bot,
  BadgeCheck,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ======================================================================
 * PolicySupport · 国家优先扶持政策
 * 深蓝黑科技风 + 青绿色高亮 + 玻璃拟态卡片
 * ====================================================================== */

const subsidies = [
  {
    badge: 'G 端',
    icon: Landmark,
    title: '民政公益',
    ratio: '最高 30%',
    ratioSize: 'text-3xl md:text-4xl',
    desc: '面向民政局、街道办、社区养老驿站的公益采购，补贴力度最高。',
    basis: ['民政普惠养老专项', '智慧社区建设补贴'],
    accent: 'from-indigo-400 to-purple-400',
    ring: 'hover:border-indigo-400/50',
    glow: 'bg-indigo-500/10',
  },
  {
    badge: 'B 端',
    icon: Building2,
    title: '养老机构',
    ratio: '15% – 25%',
    ratioSize: 'text-3xl md:text-4xl',
    desc: '养老院、护理院智能化升级与设备更新采购，按机构资质阶梯补贴。',
    basis: ['养老机构智能化改造补贴', '设备更新补贴'],
    accent: 'from-cyan-300 to-teal-300',
    ring: 'hover:border-cyan-300/50',
    glow: 'bg-cyan-500/10',
    featured: true,
  },
  {
    badge: 'C 端',
    icon: Home,
    title: '家庭用户',
    ratio: '10% – 15%',
    ratioSize: 'text-3xl md:text-4xl',
    desc: '子女为长辈购置陪护机器人，可申请居家适老化改造与消费补贴。',
    basis: ['居家适老化改造补贴', '银发消费券'],
    accent: 'from-emerald-300 to-teal-300',
    ring: 'hover:border-emerald-300/50',
    glow: 'bg-emerald-500/10',
  },
];

const highlights = [
  {
    icon: Flag,
    title: '国家战略支持',
    text: '纳入银发经济重点产品目录，符合「十四五」养老服务体系规划方向，产品身份获国家级认可。',
    accent: 'text-cyan-300',
    chip: 'from-cyan-500/20 to-teal-500/20 border-cyan-400/30',
  },
  {
    icon: Wallet,
    title: '地方财政补贴',
    text: '一线城市最高 30% 购置补贴，二线城市 15%–20%，各地民政 / 老龄部门按年度专项资金发放。',
    accent: 'text-teal-300',
    chip: 'from-teal-500/20 to-emerald-500/20 border-teal-400/30',
  },
  {
    icon: Receipt,
    title: '税收优惠',
    text: '养老机构采购智能照护设备，符合条件的进项税额可依法抵扣，降低机构实际购置成本。',
    accent: 'text-emerald-300',
    chip: 'from-emerald-500/20 to-green-500/20 border-emerald-400/30',
  },
];

const steps = [
  { icon: FileCheck2, title: '提交申请', desc: '线上或线下提交购置补贴申请，附身份 / 机构资质材料' },
  { icon: SearchCheck, title: '资质审核', desc: '民政与财政部门核验客户类型、产品目录与补贴档位' },
  { icon: Bot, title: '设备部署', desc: '森卫安护机器人上门安装调试，同步开具合规票据' },
  { icon: BadgeCheck, title: '补贴发放', desc: '审核通过后补贴款直达账户，或在购置款中直接扣减' },
];

export default function PolicySupport() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white overflow-x-hidden"
    >
      <Navbar />

      {/* ================= Hero ================= */}
      <section className="relative pt-36 md:pt-44 pb-16 md:pb-20 overflow-hidden">
        {/* 背景光晕 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-cyan-600/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-teal-600/12 rounded-full blur-[140px]" />
        </div>
        {/* 网格底纹 */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(45,212,191,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.35) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-white/55 hover:text-cyan-300 transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            返回首页
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-cyan-400/30 rounded-full px-5 py-2 mb-7"
          >
            <Landmark size={14} className="text-cyan-300" />
            <span className="text-[11px] font-semibold tracking-[0.3em] text-cyan-200 uppercase">
              Policy Support · 扶持政策
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
              国家优先扶持政策
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="text-base md:text-xl text-white/70 font-medium mb-5"
          >
            积极响应国家银发经济战略，森卫安护享受多重政策补贴支持
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="max-w-3xl text-sm md:text-base text-white/55 leading-relaxed"
          >
            森卫安护人形陪护机器人，作为银发经济与 AI
            养老领域的创新产品，享受国家及地方多层次政策扶持。根据部署地区与客户类型不同，
            <span className="text-cyan-300 font-semibold"> 最高可享受 30% 至 15% 的购置补贴优惠。</span>
          </motion.p>
        </div>
      </section>

      {/* ================= 补贴比例对比表 ================= */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-black via-[#060b10] to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-teal-400 uppercase mb-3">
              Subsidies · 补贴比例
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              三类客户，<span className="text-cyan-300">阶梯式</span>购置补贴
            </h2>
            <p className="text-sm text-white/50">按客户类型与部署地区匹配补贴档位，政策依据公开透明</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {subsidies.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.badge}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  whileHover={{ y: -8 }}
                  className={`group relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-8 overflow-hidden transition-all duration-300 ${s.ring}`}
                >
                  {/* 顶部光条 */}
                  <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${s.accent}`} />
                  {/* hover 光晕 */}
                  <div className={`absolute -top-16 -right-16 w-40 h-40 ${s.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {s.featured && (
                    <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 text-black">
                      主力区间
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${s.accent} bg-opacity-20 border border-white/15 flex items-center justify-center`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.3em] text-white/40">{s.badge}</p>
                      <p className="text-base font-bold">{s.title}</p>
                    </div>
                  </div>

                  <p className={`font-display ${s.ratioSize} font-black bg-gradient-to-r ${s.accent} bg-clip-text text-transparent mb-3`}>
                    {s.ratio}
                  </p>
                  <p className="text-xs text-white/55 leading-relaxed mb-6">{s.desc}</p>

                  <div className="pt-5 border-t border-white/10">
                    <p className="text-[10px] font-bold tracking-[0.25em] text-white/35 mb-3">政策依据</p>
                    <ul className="space-y-2">
                      {s.basis.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-white/70">
                          <CheckCircle2 size={13} className="text-teal-300 shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 三个政策亮点 ================= */}
      <section className="relative py-16 md:py-24 bg-[#050510] overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-[460px] h-[460px] bg-teal-600/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-[460px] h-[460px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-3">
              Highlights · 政策亮点
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              国家级、地方级、税收级，<span className="text-teal-300">三重红利叠加</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  whileHover={{ y: -8 }}
                  className={`bg-gradient-to-br ${h.chip} backdrop-blur-xl border rounded-3xl p-7 md:p-8 transition-all duration-300`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-black/30 border border-white/15 flex items-center justify-center mb-5">
                    <Icon size={22} className={h.accent} />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3">{h.title}</h3>
                  <p className="text-xs md:text-[13px] text-white/65 leading-relaxed">{h.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 申请流程四步 ================= */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#050510] via-[#060b10] to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-emerald-400 uppercase mb-3">
              Process · 申请流程
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">四步完成补贴申请</h2>
            <p className="text-sm text-white/50 mt-3">流程清晰可追溯，森卫安护政策专员全程协助办理</p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-stretch md:items-start gap-4 md:gap-0">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="contents">
                  <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: idx * 0.14 }}
                    className="flex-1 relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center mx-0 md:mx-2 hover:border-cyan-400/40 transition-colors duration-300 group"
                  >
                    <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/25 to-emerald-500/25 blur-md group-hover:blur-lg transition-all" />
                      <span className="relative w-14 h-14 rounded-full bg-black/40 border border-white/20 flex items-center justify-center">
                        <Icon size={24} className="text-cyan-300" />
                      </span>
                    </div>
                    <p className="text-[10px] font-mono tracking-[0.3em] text-teal-400/70 mb-1.5">STEP 0{idx + 1}</p>
                    <h3 className="font-display text-base font-bold mb-2">{step.title}</h3>
                    <p className="text-xs text-white/55 leading-relaxed">{step.desc}</p>
                  </motion.div>

                  {idx < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.14 + 0.2 }}
                      className="flex items-center justify-center py-1 md:py-0 md:pt-16"
                    >
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
                        className="rotate-90 md:rotate-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/15 text-cyan-300"
                      >
                        <ArrowRight size={14} />
                      </motion.span>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 温馨提示 + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14 text-center"
          >
            <p className="text-[11px] text-white/35 mb-8 max-w-2xl mx-auto leading-relaxed">
              * 补贴比例与适用范围以各地最新发布的政策文件为准，森卫安护政策团队将根据您所在城市与客户类型，
              提供一对一补贴申报指导。本页面政策信息为黑客松原型演示用途。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-black rounded-full text-sm font-bold hover:from-cyan-400 hover:to-teal-400 transition-all shadow-lg shadow-cyan-500/25"
              >
                查看可享补贴的机型
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/5 border border-white/20 text-white/85 rounded-full text-sm font-semibold hover:bg-white/10 transition-all"
              >
                咨询政策专员
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
