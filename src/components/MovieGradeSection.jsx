import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Home, Landmark, Check, ShieldCheck, HeartHandshake, Users } from 'lucide-react';

// 三类目标群体：养老机构 B 端 / 家庭 C 端 / 民政公益 G 端
const targetGroups = [
  {
    badge: 'B 端',
    code: 'BUSINESS',
    title: '养老机构',
    subtitle: '智慧照护整体解决方案',
    description:
      '面向养老院、护理院、CCRC 社区与康复医院，提供人形机器人整建制部署，把护理员从重复性劳动中解放出来。',
    features: ['24 小时自主巡护查房', '跌倒识别即时报警', '辅助转移与喂餐喂药', '护理数据看板对接'],
    stat: { icon: ShieldCheck, value: '护理效率 +60%', label: '单楼层人力配置减半' },
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20caregiver%20robot%20assisting%20elderly%20in%20modern%20nursing%20home%20bright%20hall%20cinematic%20wide%20angle%20professional&image_size=landscape_4_3',
    category: '养老机构B端',
    link: '/b2b-eldercare',
    accent: {
      badge: 'bg-blue-600',
      glow: 'group-hover:shadow-[0_28px_70px_-18px_rgba(37,99,235,0.5)]',
      bar: 'from-blue-500 to-cyan-400',
      text: 'text-blue-600',
      spot: 'rgba(37,99,235,0.13)',
    },
  },
  {
    badge: 'C 端',
    code: 'CONSUMER',
    title: '家庭用户',
    subtitle: '陪伴与安全守护进家门',
    description:
      '为家中老人请一位不下班的「机器保姆」：情感陪伴、紧急呼叫、远程探亲、摔倒监测，子女手机随时可见。',
    features: ['情感陪伴与对话解闷', '一键紧急呼叫家人', '远程视频随时探亲', '摔倒监测与用药提醒'],
    stat: { icon: HeartHandshake, value: '98% 家庭满意度', label: '7 天无理由上门试用' },
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20white%20humanoid%20robot%20with%20happy%20elderly%20grandparent%20and%20family%20cozy%20warm%20living%20room%20cinematic%20afternoon%20sunlight&image_size=landscape_4_3',
    category: '家庭C端',
    link: '/c2c-family',
    accent: {
      badge: 'bg-teal-500',
      glow: 'group-hover:shadow-[0_28px_70px_-18px_rgba(20,184,166,0.5)]',
      bar: 'from-teal-400 to-emerald-400',
      text: 'text-teal-600',
      spot: 'rgba(20,184,166,0.13)',
    },
  },
  {
    badge: 'G 端',
    code: 'GOVERNMENT',
    title: '民政公益',
    subtitle: '基层养老公益智能触角',
    description:
      '服务民政局、街道办与公益组织：特困老人巡访、社区养老驿站值守、惠民政策宣讲，全程数据留痕、采购合规。',
    features: ['特困供养人员定期巡访', '社区养老驿站值守', '惠民政策智能宣讲', '数据留痕对接监管平台'],
    stat: { icon: Users, value: '落地 200+ 社区', label: '支持政府采购招投标' },
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=humanoid%20service%20robot%20in%20community%20elderly%20service%20center%20helping%20senior%20citizens%20bright%20official%20hall%20cinematic%20wide%20angle&image_size=landscape_4_3',
    category: '民政公益G端',
    link: '/g2c-government',
    accent: {
      badge: 'bg-indigo-600',
      glow: 'group-hover:shadow-[0_28px_70px_-18px_rgba(79,70,229,0.5)]',
      bar: 'from-indigo-500 to-purple-400',
      text: 'text-indigo-600',
      spot: 'rgba(79,70,229,0.13)',
    },
  },
];

const groupIcons = {
  'B 端': Building2,
  'C 端': Home,
  'G 端': Landmark,
};

function GroupCard({ group, idx }) {
  const Icon = groupIcons[group.badge];
  const StatIcon = group.stat.icon;
  const cardRef = useRef(null);

  // 鼠标位置（0~1），驱动 3D 倾斜与聚光灯
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 180, damping: 18, mass: 0.4 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 180, damping: 18, mass: 0.4 });
  const spotX = useTransform(mx, (v) => `${v * 100}%`);
  const spotY = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x} ${y}, ${group.accent.spot}, transparent 65%)`
  );

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: idx * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      whileHover={{ y: -12 }}
      className={`group group-card relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-shadow duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${group.accent.glow}`}
    >
      {/* 鼠标跟随聚光灯 */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlight }}
      />

      {/* 图片区 */}
      <div className="relative image-zoom-container aspect-[4/3] overflow-hidden">
        <img
          src={group.image}
          alt={group.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* hover 光扫（限制在图片容器内） */}
        <div className="card-shine z-[6]" />

        {/* 群体徽章 */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <motion.span
            whileHover={{ scale: 1.08 }}
            className={`${group.accent.badge} text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider shadow-lg`}
          >
            {group.badge}
          </motion.span>
          <span className="bg-white/90 backdrop-blur text-gray-700 text-[10px] font-semibold px-2.5 py-1.5 rounded-full tracking-widest transition-colors duration-300 group-hover:bg-white">
            {group.code}
          </span>
        </div>

        {/* 图片底部标题 */}
        <div className="absolute bottom-4 left-5 right-5 flex items-center gap-3 text-white z-10">
          <motion.div
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center border border-white/30 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-6"
          >
            <Icon size={20} />
          </motion.div>
          <div>
            <h3 className="font-display text-2xl font-bold leading-tight">{group.title}</h3>
            <p className="text-xs text-white/80">{group.subtitle}</p>
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="p-6 relative z-10">
        <p className="text-sm text-gray-500 leading-relaxed mb-5 min-h-[66px]">
          {group.description}
        </p>

        {/* 特性列表：hover 时逐项错峰右移并加深 */}
        <ul className="space-y-2.5 mb-6">
          {group.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 text-sm text-gray-700 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5 group-hover:text-gray-900"
              style={{ transitionDelay: `${i * 45}ms` }}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${group.accent.bar} flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-125 group-hover:rotate-[360deg]`}
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                <Check size={11} className="text-white" strokeWidth={3} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {/* 数据条 */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-5 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:bg-gray-100 group-hover:shadow-inner">
          <StatIcon
            size={22}
            className={`${group.accent.text} flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
          />
          <div>
            <p className="text-sm font-bold text-gray-900">{group.stat.value}</p>
            <p className="text-xs text-gray-400">{group.stat.label}</p>
          </div>
        </div>

        {/* CTA：B 端跳专属方案页，其余跳产品筛选 */}
        <Link
          to={group.link || `/products?category=${encodeURIComponent(group.category)}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 group/link"
        >
          <span
            className={`bg-gradient-to-r ${group.accent.bar} bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover/link:bg-[length:100%_2px] pb-0.5`}
          >
            查看{group.title}方案
          </span>
          <span className={`${group.accent.text} inline-flex transition-transform duration-300 group-hover:translate-x-1.5`}>
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>

      {/* 顶部装饰光条 */}
      <div
        className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${group.accent.bar} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] origin-left z-20`}
      />
    </motion.div>
  );
}

export default function TargetGroupsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ perspective: '1400px' }}>
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs md:text-sm font-semibold tracking-[0.4em] text-blue-600 uppercase mb-4">
            Solutions · 三类服务场景
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
            一台人形机器人，服务三类群体
          </h2>
          <p className="text-sm md:text-base text-gray-500">
            养老机构 B 端 · 家庭 C 端 · 民政公益 G 端
          </p>
          <div className="section-divider" />
        </motion.div>

        {/* 说明文字 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12 text-center"
        >
          <p className="text-xs md:text-sm text-gray-400 italic leading-relaxed">
            "森卫安护以人形机器人为载体，构建覆盖机构、家庭、政府公益的全场景养老守护网络，让每一位长者都能被科技温柔以待。"
          </p>
        </motion.div>

        {/* 三类群体卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {targetGroups.map((group, idx) => (
            <GroupCard key={group.badge} group={group} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
