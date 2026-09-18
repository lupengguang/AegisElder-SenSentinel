import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-4">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-bold text-white font-display tracking-wider"
        >
          AegisElder SenSentinel <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">森卫安护</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm text-gray-400"
        >
          人形养老陪护机器人
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-sm mt-1"
        >
          <a
            href="https://github.com/lupengguang/AegisElder-SenSentinel"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 rounded-full border border-gray-700 hover:border-cyan-400/60 hover:text-cyan-300 transition-colors"
          >
            GitHub
          </a>
          <span className="text-gray-700">|</span>
          <a
            href="https://devpost.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 rounded-full border border-gray-700 hover:border-cyan-400/60 hover:text-cyan-300 transition-colors"
          >
            Devpost
          </a>
          <span className="text-gray-700">|</span>
          <Link
            to="/contact"
            className="px-4 py-1.5 rounded-full border border-gray-700 hover:border-cyan-400/60 hover:text-cyan-300 transition-colors"
          >
            联系我们
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xs text-gray-600 mt-2"
        >
          © 2026 AegisElder. 本项目为黑客松参赛原型。
        </motion.p>
      </div>
    </footer>
  );
}
