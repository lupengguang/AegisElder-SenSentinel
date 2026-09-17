import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: '首页', path: '/' },
    { name: '产品列表', path: '/products' },
    { name: '机器人详情', path: '/robot-detail' },
    { name: 'AI 陪护对话演示', path: '/ai-chat-demo', highlight: true },
    { name: '购买指南', path: '/guide' },
    { name: '联系我们', path: '/contact' },
    { name: '关于我们', path: '/about' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl md:text-2xl font-bold tracking-tight"
            >
              <span className="font-display tracking-wider">VoltageShop</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link, idx) => (
              <motion.div key={link.path} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
                {link.highlight ? (
                  <Link
                    to={link.path}
                    className="relative inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3.5 py-1.5 rounded-full shadow-sm hover:shadow-[0_4px_16px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 transition-all"
                  >
                    <MessageCircle size={13} />
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    to={link.path}
                    className={`relative text-sm font-medium transition-colors hover:text-gray-900 ${
                      location.pathname === link.path ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {link.name}
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black origin-left"
                      initial={false}
                      animate={{ scaleX: location.pathname === link.path ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="搜索">
              <Search size={20} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" aria-label="购物车">
              <ShoppingBag size={20} />
              <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="用户">
              <User size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:block px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors glow-btn"
            >
              登录
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <nav className="flex flex-col py-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-6 py-3 text-sm font-medium transition-colors ${
                      link.highlight
                        ? 'text-cyan-600 hover:bg-cyan-50'
                        : location.pathname === link.path
                          ? 'bg-gray-50 text-black'
                          : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.highlight && <MessageCircle size={13} className="inline-block mr-2 -mt-0.5" />}
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
