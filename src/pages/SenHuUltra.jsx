import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Watch,
  Cpu,
  HeartPulse,
  Activity,
  Droplets,
  Thermometer,
  Gauge,
  Mountain,
  Mic,
  Satellite,
  Wifi,
  Signal,
  Timer,
  Zap,
  BatteryCharging,
  ShieldAlert,
  Moon,
  CloudOff,
  Car,
  Hand,
  Crown,
  CircleDot,
  Power,
  HandMetal,
  Lock,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ======================================================================
 * SenHu Ultra 1 · 养老健康监测智能腕表（配套森卫安护机器人）
 * 白色科技风 + 青绿色高亮
 * 图片：public/images/senhu-1.jpg / senhu-2.jpg / senhu-3.jpg（用户上传）
 * ====================================================================== */

const localImg = (name) => `${import.meta.env.BASE_URL}images/${name}`;
const fallbackImg = (prompt, size = 'portrait_4_3') =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;

const onImgError = (prompt, size) => (e) => {
  if (!e.currentTarget.dataset.fb) {
    e.currentTarget.dataset.fb = '1';
    e.currentTarget.src = fallbackImg(prompt, size);
  }
};

/* ---------- 数字滚动 ---------- */
function CountUp({ to, duration = 1.6, suffix = '', prefix = '', decimals = 0 }) {
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

/* ---------- Hero 关键指标 ---------- */
const heroStats = [
  { value: 50, suffix: 'h', label: '常规续航' },
  { value: 100, suffix: 'm', label: '防水等级' },
  { value: 3000, suffix: 'nit', label: '峰值亮度' },
  { value: 64, suffix: 'GB', label: '本地存储' },
];

/* ---------- 外观机身 ---------- */
const bodySpecs = [
  ['表壳', '5 级钛金属 · 原色 / 黑色双色'],
  ['表背', '陶瓷 + 氧化锆复合背板'],
  ['表镜', '蓝宝石耐磨玻璃'],
  ['尺寸', '49 × 44 × 12 mm'],
  ['重量', '原色 63.0g / 黑色 63.1g'],
  ['适配腕围', '130 – 210 mm'],
  ['防护等级', '100 米防水 · IP6X 防尘'],
  ['水上运动', '支持休闲水肺潜水、水上运动'],
];

/* ---------- 屏幕参数 ---------- */
const screenSpecs = [
  ['屏幕类型', '全天候视网膜广视角 OLED · LTPO3 自适应刷新率'],
  ['分辨率', '422 × 514 像素 · 326 PPI'],
  ['显示面积', '1245 mm²'],
  ['亮度', '峰值 3000 尼特 / 最低 1 尼特，强光户外清晰可见'],
  ['刷新率', '最低 1Hz 全天候长亮模式'],
];

/* ---------- A11 芯片能力 ---------- */
const chipAbilities = [
  { title: '端侧语音识别', desc: '本地语音指令与回放，无需联网' },
  { title: '跌倒图像识别', desc: '端侧视觉姿态判断，秒级响应' },
  { title: '心率 AI 分析', desc: 'AI 连续追踪心率趋势与异常' },
  { title: '声纹监测', desc: '识别长者声纹与声音事件' },
  { title: '声音事件识别', desc: '咳嗽、呼救、异常声响本地感知' },
  { title: '本地智能交互', desc: 'Siri 级端侧智能助手体验' },
];

/* ---------- 全组传感器 ---------- */
const sensors = [
  { icon: Activity, title: '心电传感器', desc: '电极式心电采集，移动心电图 + 房颤风险提示' },
  { icon: HeartPulse, title: '第三代光学心率', desc: '全天候高频连续追踪，高/低心率预警、心律不齐提醒、HRV 恢复监测' },
  { icon: Droplets, title: '血氧传感器', desc: '血氧饱和度实时监测' },
  { icon: Thermometer, title: '体温传感器', desc: '腕部体温连续监测，支撑睡眠体征分析' },
  { icon: Gauge, title: '运动姿态传感', desc: '高 g 值加速度计 + 大动态陀螺仪，精准识别跌倒、摔倒、意外瘫倒' },
  { icon: Mountain, title: '环境传感器组', desc: '气压高度计、水深计、水温传感器、指南针、环境光传感器' },
  { icon: Mic, title: '安全硬件', desc: '三麦克风阵列（风噪抑制）、双扬声器、高分贝应急警笛' },
];

/* ---------- 网络与定位 ---------- */
const networks = [
  {
    icon: Satellite,
    title: '多星卫星定位',
    desc: 'L1 级 GPS + 北斗 + GLONASS + 伽利略 + QZSS，户外走失快速定位。',
  },
  {
    icon: Wifi,
    title: '全场景无线连接',
    desc: 'Wi‑Fi 4 双频（2.4G + 5G）、蓝牙 5.3、第二代 UWB 超宽带芯片。',
  },
  {
    icon: Signal,
    title: 'RedCap 5G 独立联网',
    desc: '5G + LTE 全网通蜂窝版，不绑手机也能通话、告警、精准查找设备。',
  },
];

/* ---------- 续航 ---------- */
const batteryModes = [
  { value: 50, unit: '小时', title: '常规模式', desc: '全天候体征监测 + 消息提醒', strong: true },
  { value: 84, unit: '小时', title: '低电量省电模式', desc: '拉长关键安全功能守护窗口' },
  { value: 45, unit: '小时', title: '户外长时训练', desc: '不间断体征记录' },
];

/* ---------- 养老专属功能 ---------- */
const elderFeatures = [
  { icon: ShieldAlert, title: '跌倒识别 + 一键求助', desc: '自动识别跌倒，联动森卫安护机器人上门查看，一键紧急求助。', hot: true },
  { icon: Moon, title: '睡眠与呼吸监测', desc: '睡眠评分 + 睡眠呼吸暂停风险监测，全天候生命体征监测。' },
  { icon: HeartPulse, title: '多维生命体征看板', desc: '心率、血氧、体温、呼吸频率一屏总览，异常自动预警。' },
  { icon: CloudOff, title: '健康数据本地存储', desc: '长期数据本地留存，支持一键同步至社区养老后台。' },
  { icon: Car, title: '车祸 / 摔倒双预警', desc: '车祸检测与意外摔倒双重安全预警，自动呼叫紧急联系人。' },
  { icon: Hand, title: '自定义实体快捷键', desc: '一键呼叫护工、一键开启远程监护，长辈也能轻松操作。' },
];

/* ---------- 机身按键 ---------- */
const buttons = [
  { icon: Crown, title: 'Action 功能键', desc: '可自定义：呼叫护工 / 远程监护 / SOS' },
  { icon: CircleDot, title: '数码表冠', desc: '带触觉反馈，滚动缩放精准操控' },
  { icon: Power, title: '侧边电源键', desc: '电源与快捷功能入口' },
  { icon: HandMetal, title: '手势操控', desc: '单击、双击、抬腕亮腕手势' },
];

export default function SenHuUltra() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white text-gray-900 overflow-x-hidden"
    >
      <Navbar />

      {/* ================= Hero ================= */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/4 w-[480px] h-[480px] bg-emerald-200/50 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-cyan-200/45 rounded-full blur-[140px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.5] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(16,185,129,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.10) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-emerald-600 transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              返回首页
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-5 py-2 mb-7"
            >
              <Watch size={14} className="text-emerald-600" />
              <span className="text-[11px] font-semibold tracking-[0.3em] text-emerald-700 uppercase">
                SenHu · 森护系列
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display text-5xl md:text-7xl font-black leading-tight mb-4 text-gray-900"
            >
              SenHu{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Ultra 1
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="text-base md:text-lg text-gray-700 font-medium mb-3"
            >
              养老健康监测智能腕表
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="text-sm text-gray-500 mb-8 flex items-center gap-2"
            >
              <Lock size={13} className="text-emerald-600" />
              配套森卫安护机器人 · 全 AI 运算端侧运行，健康数据不出手腕
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-end gap-3 mb-9"
            >
              <span className="font-display text-4xl md:text-5xl font-black text-emerald-600">¥399</span>
              <span className="text-xs text-gray-400 mb-2">起 · 与森卫安护机器人联动使用</span>
            </motion.div>

            {/* 关键指标 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="grid grid-cols-4 gap-3 max-w-lg"
            >
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-gray-200 rounded-2xl px-3 py-4 text-center shadow-sm"
                >
                  <p className="font-display text-xl md:text-2xl font-black text-emerald-600">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 右侧主图 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/50 to-cyan-200/40 rounded-[3rem] blur-3xl" />
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-[2.5rem] overflow-hidden border border-gray-200 bg-white aspect-[4/5] shadow-2xl shadow-emerald-900/10"
            >
              <img
                src={localImg('senhu-1.jpg')}
                onError={onImgError(
                  'photorealistic premium smart health watch for elderly care, titanium case 49mm, black fluoroelastomer strap, emerald green glowing health ring display with heart rate and ECG UI widgets on wrist of senior person, dark moody studio background with teal rim light, luxury product photography, ultra sharp high detail, NO text watermark'
                )}
                alt="SenHu Ultra 1 养老健康监测智能腕表"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5 bg-black/55 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 flex items-center gap-3">
                <ShieldAlert size={18} className="text-emerald-300 shrink-0" />
                <p className="text-xs text-white/90 leading-relaxed">
                  跌倒自动识别 · 一键联动森卫安护机器人上门查看
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= 外观与屏幕 ================= */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-emerald-600 uppercase mb-3">Design · 外观与屏幕</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              钛金属机身，<span className="text-emerald-600">轻而坚固</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* 外观 */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={localImg('senhu-2.jpg')}
                  onError={onImgError(
                    'photorealistic premium titanium smartwatch side angle floating on dark reflective surface, sapphire glass screen glowing emerald health UI, ceramic back visible sensors, two color variants natural titanium and black titanium, studio teal lighting, luxury product catalog shot, NO text watermark',
                    'landscape_16_9'
                  )}
                  alt="SenHu Ultra 1 钛金属表身"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 md:p-8">
                <h3 className="font-display text-xl font-bold mb-5 flex items-center gap-2 text-gray-900">
                  <Watch size={18} className="text-emerald-600" />
                  外观与机身
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                  {bodySpecs.map(([k, v]) => (
                    <div key={k} className="border-b border-gray-100 pb-3">
                      <dt className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-1">{k}</dt>
                      <dd className="text-xs md:text-[13px] text-gray-700 leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>

            {/* 屏幕 */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="flex flex-col bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm"
            >
              <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-emerald-100 to-gray-100 relative">
                <img
                  src={localImg('senhu-3.jpg')}
                  onError={onImgError(
                    'extreme close up macro photo of a premium smartwatch OLED display showing emerald green watch face with heart rate ECG blood oxygen widgets, 3000 nits bright screen, sapphire glass reflections, dark studio background, cinematic teal lighting, ultra detailed product photography, NO text watermark',
                    'landscape_16_9'
                  )}
                  alt="SenHu Ultra 1 全天候视网膜 OLED 屏幕"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 md:p-8 flex-1">
                <h3 className="font-display text-xl font-bold mb-5 flex items-center gap-2 text-gray-900">
                  <Zap size={18} className="text-emerald-600" />
                  屏幕参数
                </h3>
                <dl className="space-y-4">
                  {screenSpecs.map(([k, v]) => (
                    <div key={k} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b border-gray-100 pb-4">
                      <dt className="text-[10px] font-bold tracking-[0.2em] text-emerald-600 sm:w-24 shrink-0 pt-0.5">{k}</dt>
                      <dd className="text-xs md:text-[13px] text-gray-700 leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= A11 端侧芯片 ================= */}
      <section className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-emerald-200/50 rounded-full blur-[160px] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-600 uppercase mb-3">Chip · 核心芯片</p>
            <h2 className="font-display text-3xl md:text-5xl font-black mb-4 text-gray-900">
              A11 <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">端侧智能芯片</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              64 位双核处理器 + 4 核神经网络引擎，所有 AI 运算在手腕本地完成；
              搭配自研 W3 无线通信芯片与 64GB 本地存储，健康数据与影像识别结果不出设备。
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {chipAbilities.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-emerald-400 shadow-sm transition-colors"
              >
                <Cpu size={20} className="text-emerald-600 mb-3" />
                <h3 className="text-sm font-bold mb-1.5 text-gray-900">{a.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-3.5 max-w-3xl mx-auto bg-emerald-50 border border-emerald-200 rounded-2xl p-5 md:p-6"
          >
            <Lock size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-emerald-700">隐私保障：</span>
              全部健康数据、影像识别结果本地运算，仅在触发告急事件时联网推送告警信息，
              长者隐私从芯片层开始保护。
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= 全组传感器 ================= */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-emerald-600 uppercase mb-3">Sensors · 全组传感器</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              养老医疗版<span className="text-emerald-600">传感矩阵</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {sensors.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-7 hover:border-emerald-400 shadow-sm transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 border border-emerald-200 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-emerald-600" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold mb-2 text-gray-900">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 网络与定位 ================= */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[460px] h-[460px] bg-cyan-200/40 rounded-full blur-[150px] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-600 uppercase mb-3">Connectivity · 网络与定位</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              走失能定位，<span className="text-cyan-600">断网能求助</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {networks.map((n, i) => {
              const Icon = n.icon;
              return (
                <motion.div
                  key={n.title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white border border-gray-200 rounded-3xl p-7 md:p-8 hover:border-cyan-400 shadow-sm transition-colors overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-70" />
                  <Icon size={24} className="text-cyan-600 mb-5" />
                  <h3 className="font-display text-lg font-bold mb-3 text-gray-900">{n.title}</h3>
                  <p className="text-xs md:text-[13px] text-gray-600 leading-relaxed mb-4">{n.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-xs text-gray-400 mt-7"
          >
            支持国际紧急呼叫、离线 SOS 紧急联络、精准查找绑定设备。
          </motion.p>
        </div>
      </section>

      {/* ================= 续航与充电 ================= */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-emerald-600 uppercase mb-3">Battery · 续航与充电</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              最长 84 小时<span className="text-emerald-600">安心守护</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {batteryModes.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`rounded-3xl p-8 border text-center shadow-sm ${
                  m.strong
                    ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                <p className="font-display text-5xl md:text-6xl font-black text-emerald-600 mb-1">
                  <CountUp to={m.value} />
                  <span className="text-2xl md:text-3xl ml-1">{m.unit}</span>
                </p>
                <h3 className="text-sm font-bold mt-3 mb-1.5 text-gray-900">{m.title}</h3>
                <p className="text-xs text-gray-500">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <BatteryCharging size={20} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">快充 0–80% 仅需 2 小时</h3>
                <p className="text-xs text-gray-500 mt-1">内置大容量锂离子安全电池</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0">
                <Timer size={20} className="text-cyan-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">快充 15 分钟 = 12 小时监测</h3>
                <p className="text-xs text-gray-500 mt-1">晨起短暂补电，足够全天体征守护</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 养老专属功能 ================= */}
      <section className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-[460px] h-[460px] bg-emerald-200/50 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-emerald-600 uppercase mb-3">For Eldercare · 养老专属</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              为森卫安护<span className="text-emerald-600">养老体系</span>而生
            </h2>
            <p className="text-sm text-gray-500 mt-3">腕表 + 机器人 + 社区后台，三位一体的长者安全网络</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {elderFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`relative rounded-2xl p-6 md:p-7 border shadow-sm transition-colors ${
                    f.hot
                      ? 'bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-300'
                      : 'bg-white border-gray-200 hover:border-emerald-400'
                  }`}
                >
                  {f.hot && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
                      机器人联动
                    </span>
                  )}
                  <Icon size={22} className="text-emerald-600 mb-4" />
                  <h3 className="text-sm md:text-base font-bold mb-2 text-gray-900">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 机身按键 ================= */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-600 uppercase mb-3">Controls · 机身按键</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              长辈也能<span className="text-cyan-600">一键上手</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {buttons.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-cyan-400 shadow-sm transition-colors"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-cyan-50 to-emerald-50 border border-emerald-200 flex items-center justify-center mb-3.5">
                    <Icon size={20} className="text-cyan-600" />
                  </div>
                  <h3 className="text-sm font-bold mb-1.5 text-gray-900">{b.title}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.12),transparent_60%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-black mb-5 text-gray-900">
            腕表发现险情，<br />
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              机器人上门守护
            </span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-10 leading-relaxed">
            SenHu Ultra 1 与森卫安护人形陪护机器人深度联动，
            构成「随身监测 + 现场照护」的完整安全闭环。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full text-sm font-bold hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/25"
            >
              查看配套机器人
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-white border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all"
            >
              咨询选购
            </Link>
          </div>
          <p className="text-[11px] text-gray-400 mt-8">
            * 本页面参数为黑客松参赛原型设定，最终规格以量产版本为准。
          </p>
        </motion.div>
      </section>

      <Footer />
    </motion.div>
  );
}
