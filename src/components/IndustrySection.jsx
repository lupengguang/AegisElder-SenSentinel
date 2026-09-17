import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function IndustrySection() {
  // 机构集群旗舰 + G 端民政三档
  const industryProducts = products.slice(5, 10);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-2">机构集群与民政公益</h2>
          <p className="text-sm md:text-base text-gray-500 mt-3">
            全院多机协同调度，到区级民政普惠监管平台 —— 规模化养老治理方案
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {industryProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
