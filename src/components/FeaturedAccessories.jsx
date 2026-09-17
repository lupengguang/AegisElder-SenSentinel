import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BatteryCharging, BatteryWarning, ArrowUpRight } from 'lucide-react';
import { featuredAccessories } from '../data/products';

/* 可跳转配件的图标徽章与提示文案 */
const accessoryMeta = {
  'acc-1': { icon: BatteryCharging, hint: '查看 Home / Pro 两款' },
  'acc-2': { icon: BatteryWarning, hint: '查看断电 5 小时保障' },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

          {/* 特色大卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="col-span-2 md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl p-6 md:p-8 text-white flex items-center justify-between group shadow-xl relative overflow-hidden"
          >
            {/* 装饰圆 */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"
            />
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold mb-2">擎护套装</h3>
              <p className="text-gray-300 text-sm mb-3">机构级照护机器人全套配件</p>
              <span className="text-lg font-bold">¥12,800</span>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 md:w-32 opacity-80"
            >
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20caregiver%20robot%20accessory%20bundle%20charging%20dock%20battery%20dark%20background%20glowing%20blue&image_size=square"
                alt="擎护套装"
                className="w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
