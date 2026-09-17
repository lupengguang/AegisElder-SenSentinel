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
import AIChatDemo from './pages/AIChatDemo';

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
        <Route path="/ai-chat-demo" element={<AIChatDemo />} />
        <Route
          path="/guide"
          element={
            <SimplePage title="购买指南" subtitle="选购无人机前需要了解的一切">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <h2 className="text-2xl font-bold text-black">如何选择合适的无人机</h2>
                <p>我们的全面购买指南帮助你在海量专业和消费级无人机中做出正确选择。无论你是想寻找第一款航拍无人机的爱好者，还是需要影视级设备的专业人士，我们都能为你提供解决方案。</p>
                <h3 className="text-xl font-semibold mt-6">关键选购要素</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>续航时间：</strong>建议选择 25 分钟以上的型号，以便有充足的拍摄时间</li>
                  <li><strong>相机画质：</strong>4K 是专业航拍的最低标准；6K+ 适合影视制作</li>
                  <li><strong>重量与便携性：</strong>可折叠设计便于旅行携带</li>
                  <li><strong>GPS 与增稳：</strong>获得流畅专业画面的必备条件</li>
                  <li><strong>智能功能：</strong>自动跟随、航点规划和避障等特性</li>
                </ul>
              </div>
            </SimplePage>
          }
        />
        <Route
          path="/contact"
          element={
            <SimplePage title="联系我们" subtitle="我们期待你的来信">
              <div className="grid md:grid-cols-2 gap-8 text-gray-700">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">取得联系</h3>
                  <div className="space-y-3">
                    <p>📧 support@voltageshop.com</p>
                    <p>📞 400-888-8888</p>
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
        <Route
          path="/about"
          element={
            <SimplePage title="关于 VoltageShop" subtitle="赋能航拍创造力">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>VoltageShop 是专业航拍无人机与配件的领先提供商。我们相信，让每个人都能从全新高度俯瞰世界。</p>
                <p>我们的使命是让高品质无人机技术触手可及——从捕捉旅行记忆的爱好者，到制作获奖航拍影片的创作者。</p>
                <h2 className="text-2xl font-bold text-black mt-8">我们的价值观</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>航拍技术的创新突破</li>
                  <li>卓越的客户服务与支持</li>
                  <li>耐用可靠的品质产品</li>
                  <li>环境可持续发展</li>
                </ul>
              </div>
            </SimplePage>
          }
        />
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
