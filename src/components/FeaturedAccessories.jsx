import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BatteryCharging, BatteryWarning, Watch, ArrowUpRight } from 'lucide-react';
import { featuredAccessories } from '../data/products';

/* 可跳转配件的图标徽章与提示文案 */
const accessoryMeta = {
  'acc-1': { icon: BatteryCharging, hint: '查看 Home / Pro 两款' },
  'acc-2': { icon: BatteryWarning, hint: '查看断电 5 小时保障' },
  'acc-3': { icon: Watch, hint: '查看完整技术规格' },
};

export default function FeaturedAccessories() {
  const navigate = useNavigate();

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
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-2">
            精选配件
          </h2>
          <div className="w-16 h-0.5 bg-black mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {featuredAccessories.map((item, idx) => {
            const meta = accessoryMeta[item.id];
            const BadgeIcon = meta?.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => item.link && navigate(item.link)}
                className={`bg-gray-50 rounded-xl p-4 md:p-6 transition-shadow group ${
                  item.link ? 'cursor-pointer hover:shadow-xl' : 'cursor-default'
                }`}
              >
                <div className="image-zoom-container relative aspect-square mb-4 rounded-lg overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={
                      item.imageFallback
                        ? (e) => {
                            if (!e.currentTarget.dataset.fb) {
                              e.currentTarget.dataset.fb = '1';
                              e.currentTarget.src = item.imageFallback;
                            }
                          }
                        : undefined
                    }
                  />
                  {/* 可跳转配件的图标徽章 */}
                  {BadgeIcon && (
                    <span className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center border border-black/5 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <BadgeIcon size={17} className="text-black group-hover:text-white transition-colors duration-300" />
                    </span>
                  )}
                  {/* 可跳转角标 */}
                  {item.link && (
                    <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/0 group-hover:bg-black/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight size={15} className="text-white" />
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">
                    {item.subtitle}
                  </p>
                )}
                <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {item.name}
                </h3>
                <span className="text-base md:text-lg font-bold">¥{item.price}</span>
                {meta && (
                  <p className="mt-2 text-[11px] font-semibold text-gray-400 group-hover:text-black transition-colors duration-300 flex items-center gap-1">
                    {meta.hint}
                    <ArrowUpRight size={11} />
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
