import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Code2, Cpu, Palette, Layout, Bot, Sparkles, Heart, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

/* ======================================================================
 * About · 关于我们 / 团队介绍
 * AegisElder 森卫安护 —— 人形养老陪护机器人
 * 深蓝黑紫科技风 + 毛玻璃卡片 + 滚动揭示
 * ====================================================================== */

const members = [
  {
    name: '陆鹏光',
    role: '全栈独立开发者',
    subtitle: '机器人 · 硬件 · 软件工程师',
    avatarPrompt:
      'professional%20tech%20portrait%20photograph%20of%20a%20young%20Chinese%20male%20engineer%20in%20dark%20tech%20workshop%2C%20short%20hair%2C%20confident%20look%2C%20dark%20tech%20jacket%2C%20blue%20side%20lighting%2C%20cinematic%20headshot%2C%20soft%20bokeh%20background%20with%20circuit%20board%2C%208k',
    tags: ['全栈开发', '机器人硬件', '嵌入式', 'ROS 2'],
    accent: 'from-cyan-400 to-blue-500',
    desc:
      '独立开发人，精通机器人整机硬件架构、嵌入式固件与云边协同系统。从 28 自由度执行器选型到端侧 AI 推理部署，全链路打通。',
    icons: [Code2, Cpu, Bot],
  },
  {
    name: '王宇欣',
    role: '机器人总设计师',
    subtitle: 'AIGC 资深设计师 · 前端开发',
    avatarPrompt:
      'professional%20tech%20portrait%20photograph%20of%20a%20young%20Chinese%20female%20designer%20in%20dark%20studio%2C%20modern%20hair%2C%20confident%20gentle%20look%2C%20dark%20tech%20blazer%2C%20purple%20side%20lighting%2C%20cinematic%20headshot%2C%20soft%20bokeh%20background%20with%20AIGC%20neural%20network%20visuals%2C%208k',
    tags: ['AIGC 设计', '前端交互', '产品美学', 'GSAP 动效'],
    accent: 'from-purple-400 to-fuchsia-500',
    desc:
      'AIGC 视觉专家与机器人产品设计师，负责 AegisElder 品牌视觉、陪护机器人情感化设计与交互体验。前端 GSAP 动效让 AI 温度可触。',
    icons: [Palette, Layout, Sparkles],
  },
];

const values = [
  { icon: Heart, title: '以爱为根', text: '养老产品，守护的是最柔软的生命尊严。' },
  { icon: ShieldCheck, title: '安全第一', text: '多重冗余架构，险情零盲区响应。' },
  { icon: Cpu, title: '端侧智能', text: '数据不出设备，隐私即安全。' },
  { icon: Users, title: '陪伴共生', text: '人机不是替代，而是温柔的并肩。' },
];

/* 三屏真实写实背景图（工作室 / 研发机器人 / 实验室测试） */
const bgWorkshop =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=photorealistic%20cinematic%20wide%20shot%20of%20a%20modern%20robotics%20startup%20workshop%20at%20night%2C%20open%20space%20tech%20studio%20with%20dark%20concrete%20floor%2C%20large%20desks%20with%20dual%20monitors%20glowing%20blue%2C%20hanging%20cyan%20and%20purple%20neon%20accent%20lights%2C%20glass%20meeting%20rooms%2C%20robot%20parts%20and%203D%20printers%20on%20shelves%2C%20silicon%20chips%20under%20magnifier%20lamps%2C%20moody%20dark%20blue-black%20color%20grade%2C%20volumetric%20light%20rays%2C%20NO%20people%2C%20NO%20text%20NO%20logos%2C%20ultra%20detailed%208k%20architectural%20photography&image_size=landscape_16_9';

const bgRobotDev =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=photorealistic%20close-up%20cinematic%20scene%20of%20engineers%20developing%20a%20humanoid%20elder-care%20robot%20on%20a%20dark%20workbench%2C%20only%20hands%20and%20arms%20visible%20soldering%20and%20connecting%20cables%20to%20an%20open%20robot%20torso%20with%20exposed%20circuit%20boards%2C%20glowing%20cyan%20LED%20joints%2C%20oscilloscope%20and%20laptop%20screens%20showing%20code%20and%20sensor%20waveforms%2C%20fine%20metal%20servo%20parts%20scattered%2C%20dark%20blue-black-purple%20moody%20lighting%2C%20shallow%20depth%20of%20field%2C%20NO%20faces%20NO%20text%20NO%20logos%2C%20ultra%20detailed%208k%20documentary%20photography&image_size=landscape_16_9';

const bgLabTest =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=photorealistic%20cinematic%20wide%20shot%20of%20a%20friendly%20white-and-silver%20humanoid%20caregiver%20robot%20standing%20in%20a%20high%20tech%20robotics%20testing%20lab%2C%20soft%20cyan%20chest%20light%20glowing%2C%20surrounded%20by%20dark%20server%20racks%20with%20blue%20and%20purple%20indicator%20lights%2C%20silicon%20wafer%20displays%20on%20wall%2C%20motion%20capture%20sensors%20on%20ceiling%2C%20clean%20dark%20floor%20with%20reflections%2C%20dark%20blue-black-purple%20color%20grade%2C%20volumetric%20atmosphere%2C%20NO%20text%20NO%20logos%20NO%20watermarks%2C%20ultra%20detailed%208k%20product%20cinematography&image_size=landscape_16_9';

export default function About() {
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-black via-[#0a0814] to-black text-white overflow-x-hidden"
    >
      {/* 顶部滚动进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 z-50"
        style={{ scaleX: progressScale }}
      />

      {/* 一屏：Hero · 工作室全景背景 */}
      <section className="relative min-h-screen flex items-center pt-36 pb-24 md:pt-40 overflow-hidden">
        {/* 工作室底图 */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${bgWorkshop})` }}
          aria-hidden
        />
        {/* 可读性遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/78 to-black pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black via-black/75 to-transparent pointer-events-none" />
        {/* 背景光晕 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-600/20 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          {/* 返回导航 */}
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
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-4">
              About · 关于我们
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              一支小而美的
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                养老守护团队
              </span>
            </h1>
            <p className="max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">
              我们叫 AegisElder 森卫安护。两个人，一个目标——
              让每一位长者都被温柔守护，让每一个家庭都被安心陪伴。
              用机器人硬件、端侧 AI 与有温度的设计，
              把下一代养老，做进每一个平凡的日子。
            </p>
          </motion.div>
        </div>

        {/* 底部滚动提示 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] tracking-[0.4em]">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan-300/70 to-transparent" />
        </motion.div>
      </section>

      {/* 二屏：核心团队 · 研发机器人工作台背景 */}
      <section className="relative min-h-screen py-20 md:py-28 overflow-hidden">
        {/* 研发机器人底图 */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${bgRobotDev})` }}
          aria-hidden
        />
        {/* 可读性遮罩：上深下深，中间略透出工作台画面 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/82 to-black pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/70 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.4em] text-purple-400 uppercase mb-3"
          >
            Core Team · 核心团队
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold mb-14 md:mb-16"
          >
            两位创始人 · 一个机器人梦想
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {members.map((m, i) => (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="group relative bg-black/45 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:bg-black/55"
              >
                {/* 顶部渐变装饰条 */}
                <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${m.accent}`} />

                <div className="p-8 md:p-10">
                  {/* 头像 + 姓名 + 角色 */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="relative shrink-0">
                      <div
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-gradient-to-br ${m.accent} p-[2px]`}
                      >
                        <div className="w-full h-full rounded-[14px] overflow-hidden bg-black">
                          <img
                            src={`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${m.avatarPrompt}&image_size=portrait_4_3`}
                            alt={m.name}
                            className="w-full h-full object-cover"
                            draggable={false}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      {/* 在线绿点 */}
                      <motion.span
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-black"
                        animate={{ boxShadow: ['0 0 0 0 rgba(52,211,153,0.6)', '0 0 0 8px rgba(52,211,153,0)', '0 0 0 0 rgba(52,211,153,0.6)'] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-2xl md:text-3xl font-bold mb-1 leading-tight">
                        {m.name}
                      </h3>
                      <p className={`text-sm md:text-base font-semibold bg-gradient-to-r ${m.accent} bg-clip-text text-transparent`}>
                        {m.role}
                      </p>
                      <p className="text-xs text-white/45 mt-1 tracking-wide">{m.subtitle}</p>
                    </div>
                  </div>

                  {/* 描述 */}
                  <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6">
                    {m.desc}
                  </p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] tracking-wider text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 底部图标带 */}
                  <div className={`flex items-center gap-3 text-white/50`}>
                    {m.icons.map((Icon, idx) => (
                      <span
                        key={`${m.name}-${Icon.name}-${idx}`}
                        className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors"
                      >
                        <Icon size={16} className={`bg-gradient-to-r ${m.accent} bg-clip-text text-transparent`} style={{ strokeWidth: 2.2 }} />
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 三屏：理念 + CTA · 实验室机器人测试背景 */}
      <section className="relative min-h-screen flex flex-col justify-center py-20 md:py-28 overflow-hidden">
        {/* 实验室机器人底图 */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${bgLabTest})` }}
          aria-hidden
        />
        {/* 可读性遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/78 to-black pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/60 via-black/30 to-transparent pointer-events-none" />
        {/* 氛围光晕 */}
        <div className="absolute top-1/4 left-0 w-[460px] h-[460px] bg-purple-700/20 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-cyan-700/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-12 md:mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-cyan-400 uppercase mb-3">
              Values · 我们的理念
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
              不是做一台机器人
              <br />
              <span className="text-white/55">而是做一个家人</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-16 md:mb-20">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-7 hover:bg-black/55 hover:border-cyan-400/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-5 group-hover:border-cyan-400/40">
                    <Icon size={18} className="text-cyan-300" />
                  </div>
                  <h3 className="text-base font-bold mb-2">{v.title}</h3>
                  <p className="text-xs md:text-sm text-white/60 leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA 回到产品 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14"
          >
            <Bot size={42} className="mx-auto mb-6 text-cyan-300" />
            <h3 className="font-display text-2xl md:text-4xl font-bold mb-4">
              来看看我们做出来的
              <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">森卫安护 A15</span>
            </h3>
            <p className="text-white/65 text-sm md:text-base mb-8 max-w-xl mx-auto">
              全栈自研 · 端侧 AI · 多模态陪护 · 守护每一位长者的安康日常。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/robot-detail"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all"
              >
                查看机器人详情
                <ArrowLeft size={14} className="rotate-180" />
              </Link>
              <Link
                to="/ai-chat-demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-sm text-white/80 transition-all"
              >
                AI 陪护对话演示
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
