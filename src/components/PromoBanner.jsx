import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { promoSlides } from '../data/products';

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % promoSlides.length);

  return (
    <section className="py-16 md:py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* 促销轮播 */}
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12 flex flex-col justify-center h-full min-h-[280px]"
                style={{
                  backgroundImage: `url(${promoSlides[currentSlide].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-xs">
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                    {promoSlides[currentSlide].title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{promoSlides[currentSlide].subtitle}</p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-1 text-sm font-bold text-black hover:text-gray-700 transition-colors"
                  >
                    {promoSlides[currentSlide].cta}
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="上一张"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="下一张"
            >
              <ChevronRight size={20} />
            </motion.button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {promoSlides.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  whileTap={{ scale: 0.8 }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentSlide ? 'bg-black w-6' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 国家政策横幅 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="rounded-2xl overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 p-8 md:p-10 text-white cursor-pointer group shadow-xl relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/5 rounded-full"
            />

            <div className="relative z-10">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">国家优先扶持政策</h3>
              <p className="text-white/80 text-sm mb-6 max-w-xs">
                根据地区不同，最高可享受 30% 至 15% 的补贴优惠
              </p>
              <motion.button
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-black group-hover:text-white transition-colors"
                aria-label="了解政策"
              >
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
