import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Minus, Plus, ChevronDown, ChevronUp, ShoppingCart, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState('overview');
  const product = products.find((p) => p.id === parseInt(id));
  const relatedProducts = products.filter((p) => p.id !== parseInt(id)).slice(0, 5);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">未找到产品</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const specLabels = {
    height: '身高',
    weight: '体重',
    payload: '负载能力',
    batteryLife: '续航时间',
    speed: '行走速度',
    actuators: '关节自由度',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-enter"
    >
      <Navbar />

      <main className="pt-20 md:pt-24">
        {/* 面包屑 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black transition-colors">首页</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-black transition-colors">全部</Link>
          <ChevronRight size={14} />
          <span className="text-black">{product.category}</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* 主产品区 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* 左图 */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-square"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={images[activeImage]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </motion.div>

              {/* 缩略图 */}
              <div className="grid grid-cols-5 gap-3">
                {images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImage === idx ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 右文 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 block">
                {product.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{product.description}</p>

              {/* 价格 */}
              <div className="flex items-baseline gap-3 mb-6">
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">
                    ¥{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-3xl font-bold">¥{product.price.toLocaleString()}</span>
              </div>

              {/* 数量 */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-600">数量：</span>
                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="减少"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="增加"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>

              {/* 按钮 */}
              <div className="flex gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 border-2 border-black text-black font-medium rounded-full hover:bg-black hover:text-white transition-colors"
                >
                  加入购物车
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 glow-btn"
                >
                  <ShoppingCart size={18} />
                  立即购买
                </motion.button>
              </div>

              {/* 手风琴 */}
              <div className="space-y-3 border-t pt-6">
                <motion.div className="border-b pb-3">
                  <motion.button
                    onClick={() => toggleSection('overview')}
                    whileHover={{ x: 5 }}
                    className="w-full flex items-center justify-between py-2 text-left font-medium"
                  >
                    产品概述
                    {openSection === 'overview' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </motion.button>
                  <AnimatePresence>
                    {openSection === 'overview' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 text-sm leading-relaxed mt-2">{product.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="border-b pb-3">
                  <motion.button
                    onClick={() => toggleSection('features')}
                    whileHover={{ x: 5 }}
                    className="w-full flex items-center justify-between py-2 text-left font-medium"
                  >
                    核心特性
                    {openSection === 'features' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </motion.button>
                  <AnimatePresence>
                    {openSection === 'features' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {product.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-2 bg-gray-50 rounded-lg p-3"
                            >
                              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs">
                                ✓
                              </div>
                              <span className="text-sm font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-b pb-3">
                  <motion.button
                    onClick={() => toggleSection('specs')}
                    whileHover={{ x: 5 }}
                    className="w-full flex items-center justify-between py-2 text-left font-medium"
                  >
                    技术规格
                    {openSection === 'specs' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </motion.button>
                  <AnimatePresence>
                    {openSection === 'specs' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          {Object.entries(product.specs).map(([key, value], idx) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex flex-col"
                            >
                              <span className="text-xs text-gray-500">{specLabels[key] || key}</span>
                              <span className="text-sm font-medium">{value}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 守护场景 */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 text-center"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">让机器人替你守护</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-10">
              从养老机构到家庭，从社区驿站到民政公益，森卫安护人形机器人正在每一个需要陪伴与照护的角落，全天候温柔值守。
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden aspect-[21/9] bg-gray-100"
            >
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20caregiver%20robot%20serving%20elderly%20people%20in%20bright%20modern%20senior%20living%20facility%20warm%20cinematic%20wide%20angle%20panorama&image_size=landscape_16_9"
                alt="人形机器人守护场景"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.section>

          {/* 顾客评价 */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-10">顾客评价</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* 评分概览 */}
              <div className="flex items-start gap-8">
                <div className="text-center">
                  <span className="text-6xl font-bold">{product.rating}</span>
                  <div className="flex items-center gap-1 justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">{product.reviews} 条评价</span>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars, idx) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs w-4">{stars}</span>
                      <Star size={10} className="fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${[70, 20, 5, 3, 2][idx]}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="h-full bg-black rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 示例评价 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
                    EC
                  </div>
                  <div>
                    <span className="font-semibold">陈一鸣</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "这款机器人真的太棒了！照护动作轻柔精准，续航也够用。操作上手很容易，护理员简单培训就能上岗，院里的老人都特别喜欢它。强烈推荐！"
                </p>
                <div className="flex gap-3 mt-4 text-gray-400 text-xs">
                  <button className="hover:text-black transition-colors">👍 12</button>
                  <button className="hover:text-black transition-colors">💬 回复</button>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* 相关推荐 */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24"
          >
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-10">你可能还喜欢</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </motion.div>
  );
}
