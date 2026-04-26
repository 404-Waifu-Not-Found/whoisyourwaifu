import { computed, ref } from 'vue'
import type { Locale, LocalizedText } from '@/types'

const STORAGE_KEY = 'whoisyourwaifu:locale'
const fallbackLocale: Locale = 'en'

function initialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'zh' || stored === 'en' ? stored : fallbackLocale
}

export const locale = ref<Locale>(initialLocale())
document.documentElement.lang = locale.value === 'zh' ? 'zh-CN' : 'en'

export const labels = {
  en: {
    brand: 'Who Is Your Waifu?',
    subtitle: 'LPTI',
    homeLabel: 'Who Is Your Waifu home',
    primaryNavigation: 'Primary navigation',
    githubRepository: 'GitHub repository',
    github: 'GitHub',
    translationHelp: 'NEED TRANSLATION INPUTS, welcome issues+prs',
    visitCounterAlt: 'waifu.ccwu.cc visit counter',
    quizPreview: 'Quiz preview',
    posterTitle: 'WAIFU MATCH ENGINE',
    artSource: 'Art source',
    navQuiz: 'Quiz',
    navRoster: 'Roster',
    navAlgorithm: 'Algorithm',
    navContributors: 'Contributors',
    homeEyebrow: 'MBTI is old news. LPTI is more unhinged.',
    homeLede: 'Answer {questions} preference questions and let a suspiciously confident static algorithm match your ideal waifu energy from {characters} anime candidates.',
    answered: 'answered',
    rosterEyebrow: '{characters} candidates · external character art',
    start: 'Start the diagnosis',
    retake: 'Retake',
    next: 'Next',
    previous: 'Back',
    seeResult: 'Reveal result',
    progress: 'Question',
    agree: 'Hard agree',
    disagree: 'Hard pass',
    neutral: 'No strong vibes',
    resultTitle: 'Your ideal waifu energy is',
    fit: 'Match fit',
    confidence: 'Answer confidence',
    confidenceHint: 'Higher confidence means your answers gave the algorithm a cleaner signal.',
    closeMatches: 'Close matches',
    rosterTitle: 'Starter Roster',
    missingTitle: 'No result yet',
    missingCopy: 'Finish the quiz first so the algorithm can stop staring dramatically at an empty answer sheet.',
    share: 'Copy share text',
    copied: 'Copied',
    disclaimer: 'For fandom entertainment only. This is not a psychological assessment, official typing, or life advice from a suspiciously confident anime algorithm.',
    algorithmTitle: 'How LPTI Scores Your Taste',
    algorithmIntro: 'LPTI is not psychology. It is a deterministic recommendation engine that turns trope preferences into a character match while keeping uncertainty visible.',
    algorithmSections: [
      {
        title: 'Balanced question draw',
        body: 'The pool has 48 questions. Each attempt randomly selects 32 questions: exactly 8 per axis, then shuffles them. Refresh keeps the same attempt; retake creates a new draw.',
      },
      {
        title: 'Four-axis vector',
        body: 'Answers use -3 to +3. Each question pushes one axis toward a pole, producing a normalized vector from -100 to +100 for E/I, S/N, T/F, and J/P.',
      },
      {
        title: 'Confidence-aware ranking',
        body: 'The scorer measures both direction and confidence. Strong, consistent answers raise confidence; neutral or mixed answers lower the displayed certainty.',
      },
      {
        title: 'Character distance',
        body: 'Characters have their own axis vectors. Ranking combines axis distance, per-question answer distance, type mismatch penalties, and a small same-type bonus.',
      },
      {
        title: 'Fit is not truth',
        body: 'Fit blends raw distance with answer confidence, so ambiguous inputs do not pretend to be perfect 99% matches. Close matches are shown on the result page.',
      },
    ],
    algorithmFormulaTitle: 'Composite distance',
    algorithmFormula: 'distance = axis distance + question distance + type penalty - same-type bonus',
    algorithmAxisScoreFormula: 'axisScore = weightedAnswerTotal / weightedMaximum * 100',
    algorithmConfidenceFormula: 'axisConfidence = 0.30 * answerStrength + 0.45 * directionalClarity + 0.25 * consistency',
    algorithmFitFormula: 'displayedFit = 0.72 * rawFit + 0.28 * overallConfidence',
    algorithmFlowAnswers: 'answers',
    algorithmFlowVector: 'axis vector',
    algorithmFlowDistance: 'distance',
    algorithmFlowRank: 'rank',
    algorithmKicker: 'LPTI Technical Note',
    algorithmSamplingHeading: '1. Dynamic Question Sampling',
    algorithmVectorHeading: '2. Axis Vector And Confidence',
    algorithmRankingHeading: '3. Character Ranking',
    algorithmFitHeading: '4. Fit Interpretation',
    algorithmSamplingCaption: 'Figure 1. Each attempt selects eight questions per axis from the larger pool.',
    algorithmVectorCaption: 'Figure 2. A four-axis vector represents the current answer sheet.',
    algorithmRankingCaption: 'Figure 3. Ranking combines vector distance, selected-question distance, and type penalties.',
    algorithmExtraAbstract: 'The algorithm treats an answer sheet as a taste vector, not a personality truth. Strong and consistent inputs produce decisive recommendations; neutral, noisy, or self-contradictory inputs are deliberately shown with lower confidence.',
    algorithmConfidenceNote: 'Confidence is computed from answer strength, directional clarity, and internal consistency. This prevents the system from over-trusting answer sheets that strongly agree with both sides of the same axis.',
    algorithmRankingNote: 'A final type is too coarse by itself, so LPTI also compares selected-question response patterns. This gives close matches more texture and reduces the chance that every character in one type bucket feels interchangeable.',
    algorithmFitNote: 'The evaluation harness tests strong, mixed, noisy, contradictory, partial-axis, and neutral profiles. The target behavior is high confidence for coherent answer sheets and visibly lower confidence for ambiguous ones.',
    algorithmLowConfidenceCap: 'low-confidence results are capped before display',
    contributorsTitle: 'Contributors',
    contributorsEyebrow: 'LPTI · open contribution',
    contributorsIntro: 'LPTI needs translation inputs, character corrections, question tuning, and algorithm feedback. Issues and PRs are welcome.',
    contributorsRepo: 'Open GitHub repository',
    contributorsIssue: 'Open an issue',
    contributorsPr: 'Submit a PR',
    creatorRole: 'Creator',
    creatorName: 'UnoxyRich',
    creatorBio: 'Project creator and maintainer of LPTI.',
    creatorAvatarAlt: 'UnoxyRich creator avatar',
    contributorsSections: [
      {
        title: 'Translation reviewers',
        body: 'Help make English and Chinese copy sound natural, funny, and accurate. Anime title translations and question wording are especially useful.',
      },
      {
        title: 'Character data editors',
        body: 'Fix wrong portraits, source titles, character names, traits, or match descriptions. Please include a source link when possible.',
      },
      {
        title: 'Question designers',
        body: 'Add better preference questions that are funny, public-safe, and balanced across the four axes.',
      },
      {
        title: 'Algorithm testers',
        body: 'Run fake inputs, inspect weird outputs, and propose scoring changes that make confidence and close matches more believable.',
      },
    ],
    axes: {
      E_I: 'Social voltage',
      S_N: 'Reality vs. mystery',
      T_F: 'Sharpness vs. softness',
      J_P: 'Order vs. chaos',
    },
    poles: {
      E: 'Spotlight',
      I: 'Quiet aura',
      S: 'Grounded',
      N: 'Mythic',
      T: 'Savage logic',
      F: 'Heart crit',
      J: 'Has a plan',
      P: 'Chaos DLC',
    },
  },
  zh: {
    brand: '谁是你的二次元老婆？',
    subtitle: 'LPTI',
    homeLabel: '谁是你的二次元老婆首页',
    primaryNavigation: '主导航',
    githubRepository: 'GitHub 仓库',
    github: 'GitHub',
    translationHelp: '需要翻译输入，欢迎提交 issues 和 PR',
    visitCounterAlt: 'waifu.ccwu.cc 访问计数器',
    quizPreview: '测试预览',
    posterTitle: '老婆匹配引擎',
    artSource: '立绘来源',
    navQuiz: '开测',
    navRoster: '角色池',
    navAlgorithm: '算法',
    navContributors: '贡献者',
    homeEyebrow: 'MBTI过时了，老婆TI更抽象',
    homeLede: '回答 {questions} 道偏好题，让一个自信过头的静态算法从 {characters} 位二次元角色里匹配你的理想二次元老婆属性。',
    answered: '已回答',
    rosterEyebrow: '{characters} 位候选 · 外部立绘',
    start: '开始诊断',
    retake: '重新测',
    next: '下一题',
    previous: '上一题',
    seeResult: '揭晓结果',
    progress: '题目',
    agree: '狠狠同意',
    disagree: '完全不吃',
    neutral: '先观望',
    resultTitle: '你的理想二次元老婆属性是',
    fit: '匹配度',
    confidence: '匹配信心',
    confidenceHint: '置信度越高，代表你的回答给算法的信号越清晰。',
    closeMatches: '其他接近结果',
    rosterTitle: '初始角色池',
    missingTitle: '还没有结果',
    missingCopy: '先做完测试吧，不然算法只能对着空答卷摆出深沉脸。',
    share: '复制分享文案',
    copied: '已复制',
    disclaimer: '仅供同好娱乐。不是心理测评、不是官方 MBTI、也不是某个自信过头的二次元算法给出的人生建议。',
    algorithmTitle: 'LPTI 是怎么算出你的 XP 的',
    algorithmIntro: 'LPTI 不是心理学。它是一个确定性的推荐算法：把你的二次元偏好转成角色匹配，同时把不确定性显示出来。',
    algorithmSections: [
      {
        title: '平衡抽题',
        body: '题库共有 48 道题。每次测试动态抽取 32 道：每个轴固定 8 道，然后打乱顺序。刷新不会换题，重新测试才会重新抽。',
      },
      {
        title: '四轴向量',
        body: '答案使用 -3 到 +3。每道题会把一个轴推向某个极点，最后得到 E/I、S/N、T/F、J/P 四个 -100 到 +100 的分数。',
      },
      {
        title: '带置信度的排序',
        body: '算法不只看方向，也看你答得有多明确。强烈且一致的答案会提高匹配信心；中立或摇摆答案会降低显示出来的确定性。',
      },
      {
        title: '角色距离',
        body: '每个角色都有自己的轴向量。排序会综合轴距离、逐题答案距离、类型不一致惩罚，以及少量同类型加成。',
      },
      {
        title: '匹配度不是真理',
        body: '匹配度会混合原始距离和答案置信度，所以模糊输入不会装成 99% 天命结果。结果页会显示接近匹配。',
      },
    ],
    algorithmFormulaTitle: '综合距离',
    algorithmFormula: '距离 = 轴距离 + 逐题距离 + 类型惩罚 - 同类型加成',
    algorithmAxisScoreFormula: '轴分数 = 加权答案总和 / 加权最大值 * 100',
    algorithmConfidenceFormula: '轴置信度 = 0.30 * 答案强度 + 0.45 * 方向清晰度 + 0.25 * 一致性',
    algorithmFitFormula: '显示匹配度 = 0.72 * 原始匹配度 + 0.28 * 总体置信度',
    algorithmFlowAnswers: '答案',
    algorithmFlowVector: '轴向量',
    algorithmFlowDistance: '距离',
    algorithmFlowRank: '排序',
    algorithmKicker: 'LPTI 技术说明',
    algorithmSamplingHeading: '1. 动态抽题',
    algorithmVectorHeading: '2. 轴向量与置信度',
    algorithmRankingHeading: '3. 角色排序',
    algorithmFitHeading: '4. 匹配度解释',
    algorithmSamplingCaption: '图 1. 每次测试都会从大题库里为每个轴抽取 8 道题。',
    algorithmVectorCaption: '图 2. 四轴向量表示当前答卷的偏好方向。',
    algorithmRankingCaption: '图 3. 排序会综合向量距离、所选题目的逐题距离和类型惩罚。',
    algorithmExtraAbstract: '算法把答卷视为一个 XP 向量，而不是真实人格。强烈且一致的输入会给出明确推荐；中立、噪声大或自相矛盾的输入会显示更低置信度。',
    algorithmConfidenceNote: '置信度由答案强度、方向清晰度和内部一致性共同计算。这样可以避免系统过度相信同一轴上两边都强烈同意的答卷。',
    algorithmRankingNote: '最终类型本身太粗，所以 LPTI 还会比较所选题目的逐题回答模式。这样接近结果会更有细节，也能减少同一类型桶里的角色看起来完全一样的问题。',
    algorithmFitNote: '评估脚本会测试强信号、混合、噪声、矛盾、部分轴强信号和全中立输入。目标是让一致答卷有高置信度，让模糊答卷明显降低置信度。',
    algorithmLowConfidenceCap: '低置信度结果会在显示前封顶',
    contributorsTitle: '贡献者',
    contributorsEyebrow: 'LPTI · 开放贡献',
    contributorsIntro: 'LPTI 需要翻译输入、角色修正、题目调参和算法反馈。欢迎提交 issues 和 PR。',
    contributorsRepo: '打开 GitHub 仓库',
    contributorsIssue: '提交 issue',
    contributorsPr: '提交 PR',
    creatorRole: '创建者',
    creatorName: 'UnoxyRich',
    creatorBio: 'LPTI 项目创建者与维护者。',
    creatorAvatarAlt: 'UnoxyRich 创建者头像',
    contributorsSections: [
      {
        title: '翻译校对',
        body: '帮助英文和中文文案变得更自然、更好笑、更准确。动画标题翻译和题目措辞尤其需要校对。',
      },
      {
        title: '角色数据修正',
        body: '修正错误立绘、作品标题、角色名、特质或匹配文案。最好附上来源链接。',
      },
      {
        title: '题目设计',
        body: '补充更好的偏好题：要好笑、适合公开页面，并且四个轴保持平衡。',
      },
      {
        title: '算法测试',
        body: '运行假输入，检查奇怪结果，并提出能让置信度和接近匹配更可信的评分修改。',
      },
    ],
    axes: {
      E_I: '社交电压',
      S_N: '现实/神秘',
      T_F: '锐度/柔软',
      J_P: '秩序/混沌',
    },
    poles: {
      E: '聚光灯',
      I: '静默气场',
      S: '落地派',
      N: '神秘派',
      T: '逻辑暴击',
      F: '心动暴击',
      J: '计划在线',
      P: '混沌DLC',
    },
  },
} as const

export function setLocale(nextLocale: Locale) {
  locale.value = nextLocale
  localStorage.setItem(STORAGE_KEY, nextLocale)
  document.documentElement.lang = nextLocale === 'zh' ? 'zh-CN' : 'en'
}

export function text(value: LocalizedText): string {
  return value[locale.value] ?? value[fallbackLocale]
}

export function useI18n() {
  return {
    locale,
    labels: computed(() => labels[locale.value]),
    setLocale,
    text,
  }
}
