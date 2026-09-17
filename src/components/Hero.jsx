import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 字符逐字浮现容器
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

// 英文标题字符（从左滑入）
const letterEn = {
  hidden: { opacity: 0, x: -40, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// 中文标题字符（从右滑入）
const letterZh = {
  hidden: { opacity: 0, x: 40, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const englishTitle = 'AegisElder SenSentinel';
const chineseTitle = '森卫安护';

/* 一屏背景自动轮播：真实养老陪护场景照片（置于 public/images/，交叉淡入 + Ken Burns 缓推） */
const heroSlides = [
  `${import.meta.env.BASE_URL}images/hero-main.jpghero-main (1).jpg`,
  `${import.meta.env.BASE_URL}images/hero-main.jpghero-main (2).jpg`,
  `${import.meta.env.BASE_URL}images/hero-main.jpghero-main (3).jpg`,
  `${import.meta.env.BASE_URL}images/hero-main.jpghero-main (4).jpg`,
  `${import.meta.env.BASE_URL}images/hero-main.jpghero-main (5).jpg`,
];

export default function Hero() {
  const navigate = useNavigate();

  /* 自动轮播：6s 切换，[slide] 依赖让每次切换后重新计时 */
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, [slide]);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black">
      {/* 全屏背景：真实场景照片自动轮播 */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4, ease: 'easeInOut' } }}
            aria-hidden
          >
            <motion.img
              src={heroSlides[slide]}
              alt="森卫安护智能养老陪护场景"
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1.15 }}
              transition={{ duration: 7.5, ease: 'linear' }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 渐变遮罩层 */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-transparent to-black/50" />

      {/* 扫描线动效 */}
      <motion.div
        className="absolute inset-x-0 z-[2] h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
        initial={{ top: '0%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 浮动粒子 */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 8px rgba(34,211,238,0.8)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* 内容 */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-6xl mx-auto">
          {/* 标签 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs md:text-sm text-cyan-300/80 tracking-[0.4em] uppercase mb-8 font-light"
          >
            多模态 AI 感知 · 全天候养老陪护
          </motion.p>

          {/* 主标题 - 英文一行 */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white mb-3 drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] flex flex-wrap justify-center"
            aria-label={englishTitle}
          >
            {englishTitle.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={letterEn}
                className="inline-block bg-gradient-to-b from-white to-cyan-200 bg-clip-text text-transparent"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* 标题装饰线 - 从中间向两侧展开 */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
            className="mx-auto mb-3 h-px w-32 md:w-48 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-center"
          />

          {/* 主标题 - 中文一行 */}
          <motion.h2
            variants={container}
            initial="hidden"
            animate="show"
            transition={{ delayChildren: 1.4, staggerChildren: 0.15 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.15em] text-white mb-8 drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)] flex justify-center"
            aria-label={chineseTitle}
          >
            {chineseTitle.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={letterZh}
                className="inline-block bg-gradient-to-b from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent"
                style={{ textShadow: '0 0 40px rgba(34,211,238,0.4)' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>

          {/* 描述 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="text-white/70 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            以多模态 AI 感知守护长者安康，全天候、全场景陪护的人形养老机器人解决方案，覆盖机构、家庭、民政养老场景。
          </motion.p>

          {/* 按钮组 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/qwen3-omni')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-full text-sm font-semibold hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all"
            >
              探索守护方案
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-3.5 border border-cyan-400/50 text-cyan-100 rounded-full text-sm font-medium hover:bg-cyan-400/10 hover:border-cyan-400 transition-all"
            >
              预约产品演示
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* 滚动指示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-cyan-400/40 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-cyan-300 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* 四角科技装饰框 */}
      <div className="absolute inset-6 md:inset-10 z-[3] pointer-events-none">
        {[
          'top-0 left-0 border-t-2 border-l-2',
          'top-0 right-0 border-t-2 border-r-2',
          'bottom-0 left-0 border-b-2 border-l-2',
          'bottom-0 right-0 border-b-2 border-r-2',
        ].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
            className={`absolute w-8 h-8 md:w-12 md:h-12 border-cyan-400/60 ${pos}`}
          />
        ))}
      </div>
    </section>
  );
}
