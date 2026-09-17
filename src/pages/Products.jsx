import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { products } from '../data/products';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl && products.some((p) => p.category === categoryFromUrl)
      ? categoryFromUrl
      : '全部'
  );
  const [sortBy, setSortBy] = useState('default');

  // 浏览器前进 / 后退时同步分类筛选
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && products.some((p) => p.category === cat)) {
      setSelectedCategory(cat);
    } else if (!cat) {
      setSelectedCategory('全部');
    }
  }, [searchParams]);

  const categories = ['全部', ...new Set(products.map((p) => p.category))];

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === '全部') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  let filteredProducts = selectedCategory === '全部'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  if (sortBy === 'price-low') filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-enter"
    >
      <Navbar />

      <main className="pt-20 md:pt-24 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-2">全部产品</h1>
            <div className="w-16 h-0.5 bg-black mb-4" />
            <p className="text-gray-500 text-sm">浏览森卫安护完整的人形机器人与配套产品系列。</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 text-sm rounded-full font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-200 rounded-full bg-white outline-none focus:border-black cursor-pointer"
            >
              <option value="default">默认排序</option>
              <option value="price-low">价格：从低到高</option>
              <option value="price-high">价格：从高到低</option>
              <option value="rating">按评分排序</option>
            </select>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </motion.div>
  );
}
