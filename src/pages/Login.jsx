import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Sparkles, ShieldCheck, Heart } from 'lucide-react';

/* ======================================================================
 * Login · 登录 / 注册
 * 深蓝黑紫科技风 · 左品牌视觉 + 右玻璃卡片表单
 * 纯前端模拟登录：成功后写入 localStorage('aegis_user') 并跳转 /profile
 * ====================================================================== */

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // login | register
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [name, setName] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    const account = email.trim() || 'guest@aegiselder.com';
    const displayName =
      mode === 'register' && name.trim()
        ? name.trim()
        : account.split('@')[0].replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '') || '森卫用户';
    setTimeout(() => {
      localStorage.setItem('aegis_user', JSON.stringify({ name: displayName, email: account, since: '2026' }));
      navigate('/profile');
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-black via-[#0a0814] to-[#12081f] text-white flex flex-col"
    >
      {/* 背景氛围 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[560px] h-[560px] bg-cyan-500/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-purple-600/15 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(103,232,249,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-300/50"
            style={{ left: `${(i * 83) % 100}%`, top: `${(i * 47) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* 返回 */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-20 inline-flex items-center gap-2 text-xs text-white/50 hover:text-cyan-300 transition-colors"
      >
        <ArrowLeft size={14} /> 返回首页
      </Link>

      <div className="flex-1 flex items-center justify-center px-4 py-28 relative z-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/30 bg-white/[0.03] backdrop-blur-xl">
          {/* 左：品牌视觉 */}
          <div className="relative hidden lg:block min-h-[640px]">
            <img
              src={`${import.meta.env.BASE_URL}images/c3-2 (1).jpg`}
              alt="森卫安护陪护机器人"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.72]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
            <div className="absolute bottom-0 p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-cyan-300" />
                  <span className="text-xs tracking-[0.3em] text-cyan-200/80 uppercase">AegisElder SenSentinel</span>
                </div>
                <h2 className="font-display text-3xl font-bold leading-snug mb-3">
                  森卫安护
                  <span className="block bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                    用 AI 守护每一段晚年时光
                  </span>
                </h2>
                <p className="text-sm text-white/55 leading-relaxed">科技守伴，安护朝夕。</p>
                <div className="flex gap-5 mt-7 text-xs text-white/50">
                  <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-cyan-300" /> 端侧隐私保护</span>
                  <span className="flex items-center gap-1.5"><Heart size={14} className="text-purple-300" /> 全天候陪护</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 右：表单 */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            {/* Tab 切换 */}
            <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 relative mb-9 w-fit">
              {[
                { key: 'login', label: '登录' },
                { key: 'register', label: '注册' },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setMode(t.key)}
                  className={`relative z-10 px-8 py-2 rounded-full text-sm font-semibold transition-colors ${
                    mode === t.key ? 'text-white' : 'text-white/45 hover:text-white/75'
                  }`}
                >
                  {mode === t.key && (
                    <motion.span
                      layoutId="authTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, x: mode === 'login' ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'login' ? 30 : -30 }}
                transition={{ duration: 0.3 }}
                onSubmit={submit}
                className="space-y-5"
              >
                <h1 className="font-display text-2xl font-bold">
                  {mode === 'login' ? '欢迎回来' : '加入森卫安护'}
                  <span className="block text-xs font-normal text-white/40 mt-1.5">
                    {mode === 'login' ? '登录后管理您的订单与照护服务' : '注册即享专属照护顾问与 OTA 升级服务'}
                  </span>
                </h1>

                {mode === 'register' && (
                  <Field icon={User} placeholder="您的称呼">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="您的称呼"
                      className="w-full bg-transparent outline-none text-sm placeholder:text-white/30"
                    />
                  </Field>
                )}

                <Field icon={Mail}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="邮箱地址（可留空快速体验）"
                    className="w-full bg-transparent outline-none text-sm placeholder:text-white/30"
                  />
                </Field>

                <Field icon={Lock}>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="密码（可随意填写）"
                    className="w-full bg-transparent outline-none text-sm placeholder:text-white/30"
                  />
                  <button type="button" onClick={() => setShowPwd((v) => !v)} className="text-white/40 hover:text-cyan-300 transition-colors">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </Field>

                {mode === 'login' && (
                  <div className="flex items-center justify-between text-xs text-white/45">
                    <button type="button" onClick={() => setRemember((v) => !v)} className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                      <span className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${remember ? 'bg-cyan-500 border-cyan-500' : 'border-white/25'}`}>
                        {remember && <span className="text-[10px]">✓</span>}
                      </span>
                      记住我
                    </button>
                    <span className="hover:text-cyan-300 cursor-pointer transition-colors">忘记密码？</span>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-sm shadow-lg shadow-cyan-500/30 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      正在进入…
                    </>
                  ) : mode === 'login' ? (
                    '登 录'
                  ) : (
                    '注 册 并 登 录'
                  )}
                </motion.button>

                <p className="text-[11px] text-white/30 text-center leading-relaxed">
                  演示站点 · 纯前端模拟登录，数据仅保存在本地浏览器
                </p>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Field({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus-within:border-cyan-400/60 focus-within:bg-white/[0.08] transition-colors">
      <Icon size={16} className="text-white/35 shrink-0" />
      {children}
    </div>
  );
}
