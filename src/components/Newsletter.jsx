import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-black text-white overflow-hidden relative">
      {/* 背景粒子 */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左侧 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              森卫安护，<br />
              用 AI 守护<br />
              每一段晚年时光
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
              AegisElder SenSentinel・科技守伴，安护朝夕。
            </p>
          </motion.div>

          {/* 右侧 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-10 -right-10 md:-top-16 md:-right-16 w-40 md:w-52 opacity-60"
            >
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20white%20humanoid%20caregiver%20robot%20gently%20accompanying%20a%20smiling%20elderly%20person%20in%20a%20warm%20cozy%20home%2C%20soft%20cyan%20chest%20light%20glowing%2C%20cinematic%20dark%20moody%20lighting%20with%20blue%20and%20purple%20ambient%2C%20shallow%20depth%20of%20field%2C%20NO%20text%20NO%20logos%2C%20ultra%20detailed%208k&image_size=portrait_4_3"
                alt="森卫安护陪护机器人"
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>

            <form onSubmit={handleSubmit} className="relative z-10 max-w-md">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex bg-white rounded-full overflow-hidden"
              >
                <input
                  type="email"
                  placeholder="输入邮箱地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 text-sm text-gray-900 bg-transparent outline-none"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-4 bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  {submitted ? '✓ 已订阅！' : '订阅'}
                </motion.button>
              </motion.div>

              {/* 社交图标 */}
              <div className="flex gap-4 mt-8">
                {['微信', '微博', 'B站', '抖音', '小红书'].map((social, idx) => (
                  <motion.button
                    key={social}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all"
                    aria-label={social}
                  >
                    <span className="text-[10px]">{social[0]}</span>
                  </motion.button>
                ))}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
