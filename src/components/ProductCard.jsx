import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, index = 0, showDetails = true }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
    })
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      className="product-card bg-white rounded-xl overflow-hidden group relative"
    >
      {/* 图片 */}
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="image-zoom-container aspect-square bg-gray-50 relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* 标签 */}
          {product.isNew && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider"
            >
              新品
            </motion.span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              省 {Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}

          {/* Hover 操作 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute inset-0 bg-black/10 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition-colors"
              aria-label="快速预览"
            >
              <Eye size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition-colors"
              aria-label="加入购物车"
            >
              <ShoppingCart size={18} />
            </motion.button>
          </motion.div>
        </div>
      </Link>

      {/* 信息 */}
      <div className="p-4">
        {showDetails ? (
          <>
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="font-medium text-sm md:text-base text-gray-900 hover:text-gray-700 transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-500">{product.rating} ({product.reviews} 评价)</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-lg font-bold text-black">¥{product.price.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">¥{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-3 py-2 bg-black text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors glow-btn"
            >
              加入购物车
            </motion.button>
          </>
        ) : (
          <>
            <h3 className="font-medium text-sm text-gray-900">{product.name}</h3>
            <div className="mt-2">
              <span className="text-base font-bold text-black">¥{product.price.toLocaleString()}</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
