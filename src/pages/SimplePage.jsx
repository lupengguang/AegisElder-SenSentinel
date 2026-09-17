import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SimplePage({ title, subtitle, children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-enter"
    >
      <Navbar />
      <main className="pt-20 md:pt-24 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">{title}</h1>
            {subtitle && <p className="text-gray-500">{subtitle}</p>}
            <div className="section-divider" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose max-w-none"
          >
            {children}
          </motion.div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
