import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  ArrowLeft, ArrowRight, Send, Mic, MicOff, Bot, Sparkles, Heart, Pill,
  Video, CloudSun, CalendarCheck, ShieldAlert, PhoneCall, Cpu, Volume2,
  Activity, MessageCircle, RotateCcw, Home, Building2, Landmark,
} from 'lucide-react';

/* ====================================================================
 * AI 陪护对话演示 · 森卫安护 × Qwen3-Omni
 * 纯前端模拟：多模态端侧 AI 陪护对话（无后端，关键词规则 + 打字机）
 * ==================================================================== */

/* ---------- 快捷问题 ---------- */
const quickQuestions = [
  { icon: Pill, text: '今天该吃什么药？', key: 'med' },
  { icon: ShieldAlert, text: '我刚刚差点摔倒', key: 'fall' },
  { icon: Video, text: '给孙女打个视频', key: 'video' },
  { icon: Heart, text: '陪我聊聊天吧', key: 'chat' },
  { icon: CloudSun, text: '今天出门要带伞吗？', key: 'weather' },
  { icon: CalendarCheck, text: '明天复诊是几点？', key: 'clinic' },
];

/* ---------- 场景标签 ---------- */
const scenes = [
  { icon: Home, label: '家庭陪伴' },
  { icon: Building2, label: '机构巡护' },
  { icon: Landmark, label: '社区驿站' },
];

/* ---------- 规则回复库 ---------- */
const replyRules = [
  {
    match: ['药', '吃药', '用药', '降压', '胰岛素', '钙片'],
    type: 'med',
    replies: [
      '李奶奶您好呀～我查了您的用药计划：今天的**降压药**是早饭后 1 粒（8:00 已服用 ✓），**钙片**晚饭后 1 粒，现在还没到时间哦。',
      '到点我会语音提醒您，也会同步给您女儿的手机。需要我现在再给您讲一遍每种药的注意事项吗？',
    ],
  },
  {
    match: ['摔', '晕', '头晕', '疼', '难受', '不舒服', '胸闷', '喘'],
    type: 'alert',
    urgent: true,
    replies: [
      '李奶奶您别慌！请先慢慢坐下或扶住旁边的固定物体，不要自己走动。',
      '我已通过视觉与语音确认您目前意识清醒、可以对话。**需要我现在就一键呼叫您女儿和社区医生吗？** 如症状持续不缓解，我会直接拨打 120 并同步您的位置与健康档案。',
    ],
  },
  {
    match: ['视频', '孙女', '儿子', '女儿', '孩子', '孙子', '打电话', '探亲'],
    type: 'video',
    replies: [
      '好的～我这就向孙女「小雨」的手机发起视频通话邀请，铃声会同时在客厅屏幕和她手机上响起。',
      '在接通前我先陪您等一会儿。她最近还留言说周末要回来看您呢，要不要我把她的留言放给您听听？',
    ],
  },
  {
    match: ['天气', '伞', '下雨', '冷不冷', '穿什么', '气温'],
    type: 'weather',
    replies: [
      '今天多云转晴，气温 18～26°C，傍晚有小雨，风力不大。出门的话**建议带把折叠伞、加一件薄外套**。',
      '如果您要下楼散步，我可以陪您一起去，顺便提醒您按时回来吃晚饭～',
    ],
  },
  {
    match: ['复诊', '医院', '体检', '挂号', '复查', '看医生'],
    type: 'clinic',
    replies: [
      '您明天（周四）上午 **9:30** 在市第一人民医院心内科 3 号诊室复诊，主任是王医生。',
      '我已经帮您把挂号单、近期血压记录和用药清单整理好了，明早 8:40 会提醒您出发，需要的话可以为您预约社区接送车。',
    ],
  },
  {
    match: ['聊', '闷', '无聊', '孤独', '笑话', '故事', '想', '心情'],
    type: 'chat',
    replies: [
      '我在呢～今天想聊点什么？您上次讲的年轻时在纺织厂当技术标兵的故事，我可一直记着呢。',
      '要不要听一段您最喜欢的越剧选段？或者我陪您玩玩记忆翻牌小游戏，动动脑筋，赢了我给您鼓掌 👏',
    ],
  },
  {
    match: ['你好', '您好', '在吗', 'hi', 'hello', '早上好', '晚上好'],
    type: 'greet',
    replies: [
      '李奶奶好呀！我是森卫安护，今天精神看起来不错呢～有什么需要随时跟我说，聊天、提醒、呼救我都在行。',
    ],
  },
];

const defaultReplies = [
  '收到啦～这个问题我记下来了。作为您的陪护机器人，我最擅长的是用药提醒、健康问询、紧急呼救、视频探亲和陪您聊天，可以试试下面的问题哦。',
];

function pickReply(text) {
  const t = text.toLowerCase();
  for (const rule of replyRules) {
    if (rule.match.some((k) => t.includes(k.toLowerCase()))) return rule;
  }
  return { type: 'default', urgent: false, replies: defaultReplies };
}

/* ---------- 简单 Markdown：**加粗** ---------- */
function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? (
      <strong key={i} className="font-bold text-slate-900">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

const WELCOME = {
  role: 'bot',
  type: 'greet',
  text: '李奶奶，早上好呀～我是森卫安护，您的 AI 陪护助手。今天血压记得量哦，有任何事情点下面的问题或者直接跟我说就好。',
  time: '08:30',
};

export default function AIChatDemo() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const scrollRef = useRef(null);
  const timersRef = useRef([]);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleBack(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  const nowTime = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  /* 发送一条用户消息并触发机器人回复（打字机分段） */
  const sendMessage = (rawText) => {
    const text = rawText.trim();
    if (!text || typing) return;

    const userMsg = { role: 'user', text, time: nowTime() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    scrollToBottom();

    const rule = pickReply(text);

    // 分段输出：先等"正在输入"，再逐段打字
    const t1 = setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', type: rule.type, urgent: rule.urgent, text: '', typing: true, time: nowTime() }]);
      scrollToBottom();
      let segIdx = 0;

      const typeSegment = () => {
        const full = rule.replies[segIdx];
        let charIdx = 0;
        const typeTimer = setInterval(() => {
          charIdx += 1;
          setMessages((m) => {
            const copy = [...m];
            const last = copy[copy.length - 1];
            if (last && last.role === 'bot' && last.typing) {
              copy[copy.length - 1] = { ...last, text: full.slice(0, charIdx) };
            }
            return copy;
          });
          if (charIdx >= full.length) {
            clearInterval(typeTimer);
            // 该段结束
            setMessages((m) => {
              const copy = [...m];
              const last = copy[copy.length - 1];
              if (last && last.role === 'bot') copy[copy.length - 1] = { ...last, typing: false };
              return copy;
            });
            segIdx += 1;
            if (segIdx < rule.replies.length) {
              const nextSeg = setTimeout(() => {
                setMessages((m) => [...m, { role: 'bot', type: rule.type, urgent: rule.urgent, text: '', typing: true, time: nowTime() }]);
                scrollToBottom();
                typeSegment();
              }, 500);
              timersRef.current.push(nextSeg);
            } else {
              setTyping(false);
              scrollToBottom();
            }
          }
        }, 22);
        timersRef.current.push(typeTimer);
      };

      typeSegment();
    }, 700);
    timersRef.current.push(t1);
  };

  const resetChat = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setMessages([{ ...WELCOME, time: nowTime() }]);
    setTyping(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-enter bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden"
    >
      {/* 滚动进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 origin-left z-[60]"
        style={{ scaleX: progressScale }}
      />

      {/* 返回按钮 */}
      <motion.button
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={handleBack}
        className="fixed top-5 left-5 z-50 group flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 hover:border-cyan-300 rounded-full pl-3 pr-5 py-2.5 text-xs font-medium text-white/90 hover:text-white transition-all duration-300 shadow-lg"
      >
        <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-cyan-400 group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 group-hover:-translate-x-0.5">
          <ArrowLeft size={13} />
        </span>
        返回
        <kbd className="hidden sm:inline-flex items-center text-[9px] text-white/50 border border-white/20 rounded px-1.5 py-0.5 ml-1">ESC</kbd>
      </motion.button>

      {/* ===== 页头 ===== */}
      <section className="relative pt-28 pb-10 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(34,211,238,0.13),transparent_50%)] pointer-events-none" />
        <div className="relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-cyan-400" />
            <span className="text-[11px] font-semibold tracking-[0.4em] text-cyan-300/90 uppercase">
              Qwen3-Omni · AI Companion Demo
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl font-black tracking-tight mb-4"
          >
            AI 陪护对话<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">实时演示</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed"
          >
            由 Qwen3-Omni 多模态大模型驱动、AegisEdge A15 端侧算力支撑——
            点击下方场景问题，体验森卫安护如何陪老人聊天、提醒用药、处理跌倒险情与远程探亲。
          </motion.p>
        </div>
      </section>

      {/* ===== 演示主体 ===== */}
      <section className="px-6 md:px-12 lg:px-20 pb-20 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[340px_1fr] gap-6">
          {/* 左侧：机器人状态卡 */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* 机器人身份 */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6">
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Bot size={28} className="text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
                </div>
                <div>
                  <p className="font-bold text-base">森卫安护 · 小森</p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    在线 · 端侧运行中
                  </p>
                </div>
              </div>

              {/* 语音波形 */}
              <div className="flex items-end justify-center gap-1 h-12 mb-3">
                {Array.from({ length: 22 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className={`w-1 rounded-full ${voiceOn ? 'bg-gradient-to-t from-cyan-500 to-teal-300' : 'bg-slate-700'}`}
                    animate={voiceOn ? { height: [8, 10 + (i % 5) * 7, 8] } : { height: 6 }}
                    transition={{ duration: 0.9 + (i % 4) * 0.18, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
                  />
                ))}
              </div>
              <button
                onClick={() => setVoiceOn((v) => !v)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  voiceOn ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30' : 'bg-white/5 text-slate-400 border border-white/10'
                }`}
              >
                {voiceOn ? <Volume2 size={14} /> : <MicOff size={14} />}
                {voiceOn ? '语音播报已开启' : '语音播报已静音'}
              </button>
            </div>

            {/* 算力徽章 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-slate-400 uppercase mb-4">
                <Cpu size={14} className="text-cyan-400" />
                端侧智能
              </div>
              {[
                { icon: Sparkles, label: 'Qwen3-Omni 多模态' },
                { icon: Cpu, label: 'AegisEdge A15 · 1280 TOPS' },
                { icon: Activity, label: '推理延迟 < 2 ms' },
                { icon: ShieldAlert, label: '险情分级告警' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 py-2.5 text-sm text-slate-300">
                  <item.icon size={15} className="text-teal-300 flex-shrink-0" />
                  {item.label}
                </div>
              ))}
              <Link
                to="/qwen3-omni"
                className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-cyan-500/15 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30 transition-colors"
              >
                了解 AI 大脑架构
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 适用场景 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase mb-4">适用场景</p>
              <div className="flex flex-wrap gap-2">
                {scenes.map((s) => (
                  <span key={s.label} className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-full px-3.5 py-2">
                    <s.icon size={12} className="text-cyan-300" />
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* 右侧：对话窗 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden h-[680px] lg:h-[760px]"
          >
            {/* 对话窗顶栏 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <MessageCircle size={18} className="text-cyan-300" />
                <div>
                  <p className="text-sm font-bold">与小森的对话</p>
                  <p className="text-[11px] text-slate-400">演示环境 · 回复由本地规则模拟</p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
              >
                <RotateCcw size={13} />
                重新演示
              </button>
            </div>

            {/* 消息区 */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 md:px-8 py-6 space-y-5">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* 头像 */}
                    {msg.role === 'bot' ? (
                      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
                        <Bot size={17} className="text-white" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-200">
                        李
                      </div>
                    )}

                    <div className={`max-w-[82%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      <div
                        className={`relative rounded-2xl px-5 py-3 text-sm leading-[1.85] ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tr-sm'
                            : msg.urgent
                              ? 'bg-red-500/10 border border-red-400/40 text-red-50 rounded-tl-sm'
                              : 'bg-white text-slate-800 rounded-tl-sm shadow-sm'
                        }`}
                      >
                        {/* 紧急呼叫卡 */}
                        {msg.role === 'bot' && msg.type === 'alert' && !msg.typing && msg.text && (
                          <div className="mt-3 rounded-xl bg-red-600 text-white p-3.5 flex items-center gap-3">
                            <PhoneCall size={18} className="flex-shrink-0 animate-pulse" />
                            <div className="flex-1">
                              <p className="text-xs font-black">紧急呼叫待命</p>
                              <p className="text-[11px] text-red-100 mt-0.5">一键联系家属 · 社区医生 · 120</p>
                            </div>
                            <button className="bg-white text-red-600 text-[11px] font-black px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                              立即呼叫
                            </button>
                          </div>
                        )}

                        {/* 视频接通卡 */}
                        {msg.role === 'bot' && msg.type === 'video' && !msg.typing && msg.text && (
                          <div className="mt-3 rounded-xl bg-slate-100 p-3.5 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
                              <Video size={17} className="text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-black text-slate-900">孙女 · 小雨</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">视频邀请已发出，等待接听…</p>
                            </div>
                            <span className="flex items-center gap-1 text-[11px] font-bold text-teal-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                              振铃中
                            </span>
                          </div>
                        )}

                        {msg.role === 'bot' ? renderText(msg.text) : msg.text}
                        {msg.typing && (
                          <span className="inline-flex items-center gap-1 ml-1 align-middle">
                            {[0, 1, 2].map((d) => (
                              <motion.span
                                key={d}
                                className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400"
                                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                              />
                            ))}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 px-1.5">{msg.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* 快捷问题 */}
            <div className="px-5 md:px-8 pt-3 pb-2 border-t border-white/5">
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {quickQuestions.map((q) => (
                  <button
                    key={q.key}
                    disabled={typing}
                    onClick={() => sendMessage(q.text)}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-cyan-500/15 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 text-slate-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <q.icon size={13} />
                    {q.text}
                  </button>
                ))}
              </div>
            </div>

            {/* 输入区 */}
            <div className="px-5 md:px-8 py-4 border-t border-white/10 bg-white/[0.03] flex items-center gap-3">
              <button
                onClick={() => setVoiceOn((v) => !v)}
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  voiceOn ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30' : 'bg-white/5 text-slate-400 border border-white/10'
                }`}
                aria-label="语音开关"
              >
                <Mic size={17} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(input); }}
                placeholder="也可以直接输入想对小森说的话…"
                className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-400/60 focus:bg-white/[0.07] outline-none rounded-full px-5 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => sendMessage(input)}
                disabled={typing || !input.trim()}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-cyan-400/50 transition-shadow"
                aria-label="发送"
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* 底部说明 + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-4"
        >
          {[
            { icon: Cpu, title: '端侧运行，隐私不出户', desc: '对话与感知在 AegisEdge A15 本地完成，仅同步脱敏统计' },
            { icon: Heart, title: '有温度的长期陪伴', desc: '记住老人的经历、喜好与用药计划，越用越懂家人' },
            { icon: ShieldAlert, title: '险情秒级响应', desc: '跌倒 / 身体异常自动分级上报家属、医生与 120' },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <f.icon size={20} className="text-cyan-300 mb-3" />
              <p className="text-sm font-bold mb-1.5">{f.title}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            to="/qwen3-omni"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-full text-sm font-bold hover:shadow-[0_0_36px_rgba(34,211,238,0.45)] transition-shadow"
          >
            了解 Qwen3-Omni AI 大脑
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
