import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ScanLine, Cpu, Gauge, Timer, BatteryCharging, Volume2,
  Move3d, Weight, Hand, CircleDot,
} from 'lucide-react';

/* ====================================================================
 * 森卫安护 · 机器人产品设计展示（首页二屏 + 三屏）
 * Screen 1：头部与颈部近景爆炸结构（白底 · 发布会视觉 · 细线标注）
 * Screen 2：关节细节多卡片网格（正面半身 + 7 关节 + 数据卡）
 * 视觉：白色磨砂外壳 / 黑色机械内构 / 蓝色传感器光点 / 青绿色状态灯带
 * ==================================================================== */

/* ---------- 数字滚动 ---------- */
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

/* ---------- 生成图统一前缀（白壳 / 黑内构 / 蓝传感 / 青灯带） ---------- */
const IMG = (prompt, size = 'landscape_4_3') =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;

/* 二屏主视觉：白黑双机器人对视爆炸图（本地真实图片，置于 public/images/） */
const explodedImg = `${import.meta.env.BASE_URL}images/robot-exploded.jpg`;
const fullBodyImg = IMG(
  'front view half body portrait of sleek humanoid robot standing straight facing camera, smooth white matte armor plates, glossy black oval face visor with single glowing blue eye dot, cyan glowing LED bar on chest, black ribbed mechanical neck joints, arms relaxed at sides, pure white seamless background, official product catalog hero photo, minimalist studio render, ultra detailed 4k',
  'portrait_4_3'
);

const macroStyle =
  'pure white seamless background, white matte robot shell, black mechanical joint parts, glowing blue circular sensor light, cyan status ring, high-end product detail macro photograph, minimalist studio render, ultra sharp 4k';

/* ---------- 爆炸图细线标注（左 5 项，对齐参考图：纯文字 + 细下划线 + 引线） ---------- */
const annotations = [
  { label: 'Head Shell', top: '14%', anchor: 'left-[22%]', lineW: 'w-[7%]' },
  { label: 'Sensor Ring', top: '36%', anchor: 'left-[22%]', lineW: 'w-[8%]' },
  { label: 'Neck Structure', top: '43%', anchor: 'left-[22%]', lineW: 'w-[8%]' },
  { label: 'Shoulder Joint', top: '49%', anchor: 'left-[22%]', lineW: 'w-[10%]' },
  { label: 'Torso Module', top: '63%', anchor: 'left-[28%]', lineW: 'w-[14%]' },
];

/* ---------- 7 关节 + 2 汇总（共 9 卡对齐 3×3 网格） ---------- */
const jointCards = [
  {
    en: 'Shoulder Joint', cn: '肩关节', angle: '120°', icon: CircleDot,
    img: IMG(`close-up of white humanoid robot shoulder ball joint, black mechanical socket, glowing blue circular sensor ring at center, ${macroStyle}`, 'square'),
  },
  {
    en: 'Elbow Joint', cn: '肘关节', angle: '110°', icon: CircleDot,
    img: IMG(`close-up of white humanoid robot elbow joint bent at angle, black mechanical hinge, glowing blue circular sensor, ${macroStyle}`, 'square'),
  },
  {
    en: 'Wrist Freedom', cn: '腕关节', angle: '90°', icon: Move3d,
    img: IMG(`close-up of white humanoid robot wrist joint rotating, black mechanical actuator, glowing blue sensor dot, ${macroStyle}`, 'square'),
  },
  {
    en: 'Hand Tactile Fingers', cn: '触觉灵巧手', angle: '12 DOF', icon: Hand,
    img: IMG(`close-up of humanoid robot dexterous hand with articulated tactile fingers spread open, ${macroStyle}`, 'square'),
  },
  {
    en: 'Hip Joint', cn: '髋关节', angle: '100°', icon: CircleDot,
    img: IMG(`close-up of white humanoid robot hip ball joint and pelvis, black mechanical socket, glowing blue circular sensor ring, ${macroStyle}`, 'square'),
  },
  {
    en: 'Knee Joint', cn: '膝关节', angle: '130°', icon: CircleDot,
    img: IMG(`close-up of white humanoid robot knee joint slightly bent, black mechanical actuator, blue glowing sensor points and cyan ring, white leg armor, ${macroStyle}`, 'square'),
  },
  {
    en: 'Ankle Stability', cn: '踝关节', angle: '双轴稳定', icon: Gauge,
    img: IMG(`close-up of humanoid robot ankle joint and robotic foot with white leg armor, black mechanical stabilizer, blue sensor light, ${macroStyle}`, 'square'),
  },
  {
    en: 'Full Body DOF', cn: '全身自由度', angle: '28 DOF', icon: Cpu, stat: true,
    img: IMG(`full body of sleek white humanoid robot standing in t-pose, black mechanical joints highlighted with blue and cyan glowing nodes, ${macroStyle}`, 'square'),
  },
  {
    en: 'Single Arm Payload', cn: '单臂负载', angle: '5 kg', icon: Weight, stat: true,
    img: IMG(`white humanoid robot arm lifting a small object, black mechanical elbow and wrist, blue sensor glow, ${macroStyle}`, 'square'),
  },
];

/* ---------- 底部 3 数据卡 ---------- */
const dataCards = [
  { icon: Timer, value: 2.5, decimals: 1, suffix: 'h', en: 'Continuous Operation', cn: '连续作业' },
  { icon: BatteryCharging, value: 9000, decimals: 0, suffix: ' mAh', en: 'Battery Capacity', cn: '电池容量' },
  { icon: Volume2, value: 35, decimals: 0, suffix: ' dB', en: 'Silent Motion Control', cn: '静音运动控制' },
];

export default function RobotAShowcase() {
  const screen1Ref = useRef(null);

  return (
    <>
      {/* ============================================================
          SCREEN 1 · 头部与颈部近景爆炸结构（白底 · 左侧大留白）
         ============================================================ */}
      <section
        ref={screen1Ref}
        className="relative min-h-screen bg-white overflow-hidden flex items-center"
      >
        {/* 极浅网格底纹 */}
        <div
          className="absolute inset-0 opacity-[0.5] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full grid lg:grid-cols-12 gap-10 items-center py-24">
          {/* 左侧：大留白 + 文案 */}
          <div className="lg:col-span-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-slate-900" />
              <span className="text-[11px] font-semibold tracking-[0.4em] text-slate-900 uppercase">
                Robot A · Exploded View
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-black text-slate-900 leading-[1.12] mb-6"
            >
              机器人
              <br />
              头部与颈部
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                爆炸结构图
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="text-sm text-slate-500 leading-[1.9] mb-9 max-w-md"
            >
              白色磨砂外壳之下，是黑色高刚性机械内构。蓝色环形传感器实时感知环境，
              青绿色状态灯带勾勒运行轮廓 —— 以发布会级精度，呈现每一处机械细节。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="space-y-3.5 max-w-md"
            >
              {[
                { dot: 'bg-slate-900', text: '白色磨砂外壳 · 抗污耐刮涂层' },
                { dot: 'bg-slate-700', text: '黑色机械内构 · 航空铝合金骨架' },
                { dot: 'bg-blue-500', text: '蓝色传感器光点 · 360° 环境感知' },
                { dot: 'bg-teal-400', text: '青绿色状态灯带 · 运行状态可视' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${item.dot} flex-shrink-0`} />
                  <span className="text-xs font-medium text-slate-700 tracking-wide">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 右侧：爆炸图 + 细线标注 */}
          <div className="lg:col-span-8 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[2rem] overflow-hidden bg-white border border-slate-200/70 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.25)]"
            >
              <img
                src={explodedImg}
                alt="机器人 A 头部与颈部爆炸结构"
                className="w-full aspect-[16/9] object-cover"
              />

              {/* 细线标注：纯文字 + 下划线 + 水平引线（对齐参考图） */}
              {annotations.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.12 }}
                  className={`absolute ${a.anchor} flex items-center gap-0`}
                  style={{ top: a.top }}
                >
                  <span className="text-[11px] text-slate-600 font-medium tracking-wide border-b border-slate-400/70 pb-0.5 pr-1.5 whitespace-nowrap">
                    {a.label}
                  </span>
                  <motion.span
                    className={`h-px bg-slate-400/70 origin-left ${a.lineW}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.45 + i * 0.12 }}
                  />
                </motion.div>
              ))}

              {/* 右侧 Torso Module 标注（引线向左指向颈部） */}
              <motion.div
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute right-0 flex items-center gap-0"
                style={{ top: '49%' }}
              >
                <motion.span
                  className="h-px w-[12%] bg-slate-400/70 origin-right"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                />
                <span className="text-[11px] text-slate-600 font-medium tracking-wide border-b border-slate-400/70 pb-0.5 pl-1.5 whitespace-nowrap">
                  Torso Module
                </span>
              </motion.div>
            </motion.div>

            {/* 底部规格条 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 flex flex-wrap items-center justify-between gap-4 px-2"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <ScanLine size={15} />
                <span className="text-[10px] tracking-[0.3em] font-semibold uppercase">Structural Anatomy · 结构解剖</span>
              </div>
              <div className="flex items-center gap-5 text-[11px] text-slate-500">
                <span>头部模组 × 2 片壳</span>
                <span className="w-px h-3 bg-slate-300" />
                <span>颈部 3 轴</span>
                <span className="w-px h-3 bg-slate-300" />
                <span>IP54 防护</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SCREEN 2 · 关节细节多卡片网格（白底 · 发布会细节页）
         ============================================================ */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-slate-900" />
                <span className="text-[11px] font-semibold tracking-[0.4em] text-slate-900 uppercase">
                  Joint Details · 关节细节
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                七大关节，<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">毫米级精密协同</span>
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              黑银蓝科技模组化设计，每一处关节内嵌蓝色传感光点与青绿色状态环，
              细线标注对齐，留白克制 —— 高端人形机器人产品发布会细节页。
            </p>
          </motion.div>

          {/* 网格：左大格（跨 3 行） + 右侧 3×3 */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-5">
            {/* 左：正面半身大卡 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:row-span-3 relative rounded-3xl bg-white border border-slate-200 overflow-hidden group flex flex-col"
            >
              <div className="flex items-center justify-between p-6 pb-0">
                <h3 className="font-display text-2xl md:text-3xl font-black text-slate-900 tracking-tight">森卫安护 A</h3>
                <span className="text-[10px] font-bold tracking-[0.25em] text-slate-400 border border-slate-200 rounded-full px-3 py-1">
                  MODEL A
                </span>
              </div>
              <div className="relative flex-1 flex items-center justify-center p-4 min-h-[420px]">
                <div
                  className="absolute inset-0 opacity-60 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 42%, rgba(34,211,238,0.08), transparent 62%)',
                  }}
                />
                <motion.img
                  src={fullBodyImg}
                  alt="森卫安护 A 正面半身"
                  className="relative max-h-[560px] w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* 节点标注线 */}
                {[
                  { top: '30%', label: '视觉模组' },
                  { top: '52%', label: '胸部状态灯' },
                ].map((n, i) => (
                  <motion.div
                    key={n.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="absolute left-4 flex items-center gap-2"
                    style={{ top: n.top }}
                  >
                    <span className="text-[10px] font-semibold text-slate-600 bg-white/90 border border-slate-200 rounded px-2 py-0.5">{n.label}</span>
                    <span className="w-8 h-px bg-slate-300" />
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-blue-500"
                      animate={{ boxShadow: ['0 0 0 0 rgba(59,130,246,0.45)', '0 0 0 5px rgba(59,130,246,0)', '0 0 0 0 rgba(59,130,246,0)'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4" />
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="tracking-[0.25em] font-semibold">FRONT VIEW · 正面</span>
                  <span>身高 168 cm</span>
                </div>
              </div>
            </motion.div>

            {/* 右：9 张关节卡（3×3） */}
            {jointCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.en}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-3xl bg-white border border-slate-200 hover:border-cyan-400/60 overflow-hidden transition-all duration-300 hover:shadow-[0_24px_60px_-24px_rgba(8,145,178,0.35)]"
                >
                  {/* 图 */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                    <img
                      src={card.img}
                      alt={card.en}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                    {/* 角度徽标 */}
                    <div className={`absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black backdrop-blur-md border ${
                      card.stat
                        ? 'bg-slate-900/85 text-cyan-300 border-slate-700'
                        : 'bg-white/85 text-slate-900 border-slate-200'
                    }`}>
                      <Icon size={11} className={card.stat ? 'text-cyan-300' : 'text-blue-500'} />
                      {card.angle}
                    </div>
                    {/* 青绿状态环（悬停亮起） */}
                    <motion.span
                      aria-hidden
                      className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-teal-400 opacity-70 group-hover:opacity-100"
                      animate={{ boxShadow: ['0 0 0 0 rgba(45,212,191,0.4)', '0 0 0 6px rgba(45,212,191,0)', '0 0 0 0 rgba(45,212,191,0)'] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: (i % 4) * 0.4 }}
                    />
                  </div>
                  {/* 文案 */}
                  <div className="p-4">
                    <p className="text-[11px] font-bold text-slate-900 tracking-wide leading-tight">{card.en}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{card.cn}</p>
                  </div>
                  {/* 顶部 hover 光条 */}
                  <span className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              );
            })}
          </div>

          {/* 底部 3 张数据卡 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-5">
            {dataCards.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.en}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-3xl bg-slate-900 text-white overflow-hidden p-7 md:p-8 group"
                >
                  {/* 背景光晕 */}
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl group-hover:bg-cyan-500/25 transition-colors duration-500" />
                  <div className="relative flex items-start justify-between mb-6">
                    <span className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                      <Icon size={20} className="text-cyan-300" />
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.3em] text-white/35 uppercase">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="relative font-display text-4xl md:text-5xl font-black mb-2 tabular-nums">
                    <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                      <CountUp to={d.value} suffix={d.suffix} decimals={d.decimals} />
                    </span>
                  </p>
                  <p className="relative text-sm font-bold text-white/90">{d.cn}</p>
                  <p className="relative text-[11px] text-white/45 tracking-wide mt-0.5">{d.en}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
