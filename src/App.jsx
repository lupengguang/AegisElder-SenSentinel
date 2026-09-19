import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import SimplePage from './pages/SimplePage';
import RobotDetail from './pages/RobotDetail';
import Chip3DShowcase from './pages/Chip3DShowcase';
import B2BEldercare from './pages/B2BEldercare';
import C2CFamily from './pages/C2CFamily';
import G2CGovernment from './pages/G2CGovernment';
import QwenOmniBrain from './pages/QwenOmniBrain';
import AegisDock from './pages/AegisDock';
import BackupBattery from './pages/BackupBattery';
import SenHuUltra from './pages/SenHuUltra';
import AIChatDemo from './pages/AIChatDemo';
import About from './pages/About';
import BuyingGuide from './pages/BuyingGuide';
import PolicySupport from './pages/PolicySupport';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';

function PageRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/robot-detail" element={<RobotDetail />} />
        <Route path="/chip-3d" element={<Chip3DShowcase />} />
        <Route path="/b2b-eldercare" element={<B2BEldercare />} />
        <Route path="/c2c-family" element={<C2CFamily />} />
        <Route path="/g2c-government" element={<G2CGovernment />} />
        <Route path="/qwen3-omni" element={<QwenOmniBrain />} />
        <Route path="/aegis-dock" element={<AegisDock />} />
        <Route path="/backup-battery" element={<BackupBattery />} />
        <Route path="/senhu-ultra" element={<SenHuUltra />} />
        <Route path="/ai-chat-demo" element={<AIChatDemo />} />
        <Route path="/guide" element={<BuyingGuide />} />
        <Route path="/policy" element={<PolicySupport />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/contact"
          element={
            <SimplePage title="联系我们" subtitle="我们期待你的来信">
              <div className="grid md:grid-cols-2 gap-8 text-gray-700">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">取得联系</h3>
                  <div className="space-y-3">
                    <p>📧 1283019010@qq.com</p>
                    <p>📞 15117928197</p>
                    <p>📍 中国 · 深圳 · 科技园</p>
                  </div>
                </div>
                <form className="space-y-4">
                  <input className="w-full px-4 py-3 border border-gray-200 rounded-lg" placeholder="你的姓名" />
                  <input className="w-full px-4 py-3 border border-gray-200 rounded-lg" placeholder="你的邮箱" type="email" />
                  <textarea className="w-full px-4 py-3 border border-gray-200 rounded-lg h-32" placeholder="留言内容" />
                  <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">发送消息</button>
                </form>
              </div>
            </SimplePage>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  // 兼容 GitHub Pages 子路径部署：本地 BASE_URL 为 '/'，线上为 '/AegisElder-SenSentinel/'
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <BrowserRouter basename={basename || undefined}>
      <PageRoutes />
    </BrowserRouter>
  );
}
