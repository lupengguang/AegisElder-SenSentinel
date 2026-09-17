import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function NewArrivals() {
  // 前 5 款为马斯克 Optimus（擎天柱）系列人形机器人
  const newProducts = products.slice(0, 5);

  return (
    <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          {/* 系列标识 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-full tracking-widest mb-5 shadow-lg shadow-blue-500/25"
          >
            <Cpu size={14} />
            ELON MUSK SERIES · 马斯克机器人系列
          </motion.div>

          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-2">新品上市</h2>
          <p className="text-sm md:text-base text-gray-500 mt-3">
            Optimus 擎天柱系列人形机器人 —— 源自马斯克的通用机器人愿景，为养老守护而来
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {newProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
