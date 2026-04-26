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
    navQuiz: 'Quiz',
    navRoster: 'Roster',
    homeEyebrow: 'MBTI is old news. LPTI is more unhinged.',
    homeLede: 'Answer {questions} preference questions and let a suspiciously confident static algorithm match your ideal waifu energy from {characters} anime candidates.',
    answered: 'answered',
    rosterEyebrow: '48 candidates · external character art',
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
    navQuiz: '开测',
    navRoster: '角色池',
    homeEyebrow: 'MBTI过时了，老婆TI更抽象',
    homeLede: '回答 {questions} 道偏好题，让一个自信过头的静态算法从 {characters} 位二次元角色里匹配你的理想二次元老婆属性。',
    answered: '已回答',
    rosterEyebrow: '48 位候选 · 外部立绘',
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
