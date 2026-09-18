import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Users,
  Accessibility,
  Building2,
  Check,
  Quote,
  ArrowRight,
} from 'lucide-react';

/* ======================================================================
 * CaseStudies · 落地案例（原农业航空板块重构）
 * C1 居家跌倒应急监护 / C2 全屋跟随+远程探视 / C3 半失能肢体辅助 / B2 机构巡房
 * 白色科技风 + 左侧案例选择器 + 右侧图文面板
 * 案例图片：public/images/case-1.jpg ~ case-4.jpg
 * ====================================================================== */

const cases = [
  {
    id: 1,
    icon: ShieldAlert,
    tab: '居家跌倒监护',
    model: 'C1 基础陪护版',
    chip: 'AegisEdge Ai5 轻量算力芯片',
    title: '独居长者居家跌倒应急守护试点',
    scene: '普通家庭、小户型',
    value: '低成本的居家安全兜底',
    origin:
      '特斯拉 Optimus 原型居家测试：独居老人在家不慎跌倒，机器人双目视觉实时识别跌倒姿态，立刻触发本地告警，同步推送视频、位置给子女手机；同时语音安抚老人，自动拨打紧急联系人，实现无人值守居家安全监测。不做强力肢体救援，优先预警与远程联动。',
    story:
      '搭载 AegisEdge Ai5 轻量算力芯片的森卫安护 C1 基础陪护机器人，为自理型独居老人提供 24 小时居家安全监测。通过双目视觉识别跌倒事件，本地端侧 AI 快速判断险情，第一时间语音安抚长者，并将现场画面、事件告警推送至子女移动端，一键呼叫紧急联系人，填补夜间无人看护的安全缺口。',
  },
  {
    id: 2,
    icon: Users,
    tab: '全屋跟随探视',
    model: 'C2 进阶陪护版 · 主推款',
    chip: 'AegisEdge Ai5 标准版芯片',
    title: '异地子女远程看护家庭试点',
    scene: '两居室 / 三居室家庭，子女异地务工',
    value: '项目主推标杆案例',
    origin:
      'Optimus Gen3 家庭康养演示：机器人自主室内导航，跟随老人在全屋移动；异地子女可随时开启远程视频探视，机器人作为移动摄像头，在房间漫游查看老人状态；内置多模态 AI 识别老人情绪，长时间静默、低落时主动开启陪伴对话，缓解独居抑郁。',
    story:
      '森卫安护 C2 进阶陪护机器人，依托 AegisEdge Ai5 标准版芯片实现全屋自主导航，跟随长者在居室活动。子女通过手机 APP 远程调取机器人移动摄像头，随时探视家中状况；搭载 Qwen3-Omni 多模态模型，实时识别老人情绪状态，当检测到长时间静坐、情绪低沉时，主动对话陪伴，降低独居孤独感。',
  },
  {
    id: 3,
    icon: Accessibility,
    tab: '肢体辅助转移',
    model: 'C3 家庭旗舰全护版',
    chip: 'AegisEdge Ai5 满配算力 + 力控柔性关节',
    title: '半失能长者居家照护项目',
    scene: '家中重度 / 半失能老人',
    value: '需要物理肢体辅助照护',
    origin:
      'Optimus 力控柔性关节原型医疗演示：针对半失能长者，机器人依靠高精度力传感双手，辅助老人完成"坐→站"转移，搀扶起身；具备力反馈安全保护，一旦感知异常阻力会立刻停止动作，避免拉伤风险；辅助递送药品、水杯，配合体征设备采集血压血氧。',
    story:
      '森卫安护 C3 旗舰全护机器人，AegisEdge Ai5 满配算力 + 全身力控柔性关节，为半失能长者提供起身搀扶、坐姿调整辅助；内置全身多传感器，具备安全力反馈保护，触碰异常受力立刻停机。机器人可递送药品、温水，对接家用血氧 / 血压设备，持续采集健康数据，指标异常自动推送预警给家属与家庭医生。',
  },
  {
    id: 4,
    icon: Building2,
    tab: '机构智能巡房',
    model: 'B2 机构专业照护版',
    chip: 'AegisEdge Ai5 满配算力',
    title: '康养机构 AI 夜间智能巡房落地试点',
    scene: '养老院、康养中心楼层批量部署',
    value: 'B 端商用标杆案例',
    origin:
      '特斯拉 Optimus 进入康养机构试点：机器人夜间自主巡房，逐间查看老人离床、坠床风险；自动记录房间环境、长者状态，汇总数据生成护理报表；协助递送餐食、药品，把护理员从重复、枯燥的夜间巡检工作释放出来，人力回归人文关怀。',
    story:
      '森卫安护 B2 机构专业照护机器人，在养老楼层批量部署，夜间自主完成全房间巡检，识别长者离床、坠床风险；自动采集房间环境信息，生成长者健康巡检报表，推送给护理站；协助递送药品、餐食，替代护理员重复值守工作，减少人力消耗，让护理人员把精力投入到人文关怀。',
  },
];

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const c = cases[active];
  const Icon = c.icon;

  return (
    <section className="py-20 md:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-2">落地案例</h2>
          <div className="section-divider" />
        </motion.div>

        {/* 案例选择器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {cases.map((item, i) => {
            const TabIcon = item.icon;
            const isActive = i === active;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActive(i)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold border transition-colors ${
                  isActive
                    ? 'text-white border-transparent'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-cyan-300 hover:text-cyan-700'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="caseTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <TabIcon size={16} className={`relative z-10 ${isActive ? 'text-cyan-100' : ''}`} />
                <span className="relative z-10">
                  案例 0{item.id}
                  <span className="hidden md:inline">｜{item.tab}</span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* 案例面板 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/70 border border-gray-100"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* 左图（case-N.jpg 本地图片位） */}
              <div className="relative min-h-[280px] lg:min-h-[520px] overflow-hidden group">
                <motion.img
                  src={`${import.meta.env.BASE_URL}images/case-${c.id}.jpg`}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  onError={(e) => {
                    // 图片未上传时回退到在线占位图
                    if (!e.currentTarget.dataset.fb) {
                      e.currentTarget.dataset.fb = '1';
                      e.currentTarget.src =
                        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=photorealistic%20friendly%20white%20humanoid%20caregiver%20robot%20accompanying%20elderly%20person%20in%20bright%20modern%20Chinese%20home%2C%20soft%20cyan%20light%2C%20documentary%20style%2C%20NO%20text%20NO%20logos%2C%208k&image_size=landscape_16_9';
                    }
                  }}
                />
                {/* 机型徽章 */}
                <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                  <Icon size={14} className="text-cyan-300" />
                  森卫 {c.model}
                </div>
              </div>

              {/* 右文 */}
              <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
                <div>
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs font-semibold uppercase tracking-widest text-cyan-600 mb-2"
                  >
                    {c.chip}
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="font-display text-2xl md:text-3xl font-bold text-gray-900"
                  >
                    {c.title}
                  </motion.h3>
                </div>

                {/* Optimus 原版参考 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="p-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50/80"
                >
                  <p className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2">
                    <span className="w-5 h-5 rounded-md bg-gray-200 flex items-center justify-center text-[10px]">✅</span>
                    行业原型参考 · Optimus 原版案例
                  </p>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{c.origin}</p>
                </motion.div>

                {/* 森卫安护版本 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="relative p-5 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200/70"
                >
                  <p className="flex items-center gap-2 text-xs font-bold text-cyan-700 mb-2">
                    <Check size={14} className="text-cyan-600" />
                    AegisElder 森卫安护版本（{c.model.split(' ')[0]}）
                  </p>
                  <p className="text-[13px] md:text-sm text-gray-700 leading-relaxed">{c.story}</p>
                </motion.div>

                {/* 适用场景 / 核心价值 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-gray-900 text-white"
                >
                  <Quote size={16} className="text-cyan-300 shrink-0 mt-0.5" />
                  <p className="text-[13px] leading-relaxed text-white/85">
                    <span className="text-cyan-300 font-semibold">适用场景：</span>
                    {c.scene}
                    <span className="mx-2 text-white/30">·</span>
                    <span className="text-cyan-300 font-semibold">核心价值：</span>
                    {c.value}
                  </p>
                </motion.div>

                {/* 交互提示 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="flex items-center gap-2 text-xs text-gray-400"
                >
                  浏览其他案例
                  <ArrowRight size={13} className="text-cyan-500" />
                  <div className="flex gap-1.5">
                    {cases.map((item, i) => (
                      <button
                        key={item.id}
                        onClick={() => setActive(i)}
                        aria-label={`切换到案例${item.id}`}
                        className={`h-1.5 rounded-full transition-all duration-400 ${
                          i === active ? 'w-7 bg-cyan-500' : 'w-3 bg-gray-200 hover:bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
