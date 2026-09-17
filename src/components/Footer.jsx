import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="text-xl font-bold text-white font-display tracking-wider">
              VoltageShop
            </Link>
          </motion.div>
          <p className="text-xs text-gray-500">
            版权所有 © 2023 VoltageShop. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
}
