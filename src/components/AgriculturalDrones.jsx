import { motion } from 'framer-motion';
import { agricultureProducts } from '../data/products';

export default function AgriculturalDrones() {
  const product = agricultureProducts[0];

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-2">农业航空</h2>
          <div className="section-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg group"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* 左图 */}
            <div className="relative aspect-video md:aspect-auto image-zoom-container overflow-hidden">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* 浮动小图 */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute bottom-4 right-4 w-24 md:w-32 rounded-lg overflow-hidden shadow-xl border-2 border-white/50"
              >
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=agricultural%20drone%20close%20up%20product%20detail%20shot%20studio&image_size=square"
                  alt="细节"
                  className="w-full aspect-square object-cover"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -2, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute top-4 left-4 w-20 md:w-28 rounded-lg overflow-hidden shadow-xl border-2 border-white/50 hidden sm:block"
              >
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=agricultural%20drone%20spraying%20water%20action%20shot&image_size=square"
                  alt="作业"
                  className="w-full aspect-square object-cover"
                />
              </motion.div>
            </div>

            {/* 右文 */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3"
              >
                智能农业生产工具
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-2xl md:text-3xl font-bold mb-4"
              >
                {product.name}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-sm md:text-base leading-relaxed mb-6"
              >
                {product.description}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto px-8 py-3 bg-black text-white rounded-full font-medium text-sm hover:bg-gray-800 transition-colors glow-btn"
              >
                了解更多
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
