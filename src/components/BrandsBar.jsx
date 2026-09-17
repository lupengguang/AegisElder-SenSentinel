import { motion } from 'framer-motion';
import { brands } from '../data/products';

export default function BrandsBar() {
  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="text-lg md:text-xl font-display tracking-widest text-gray-400 hover:text-black transition-colors cursor-pointer"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
