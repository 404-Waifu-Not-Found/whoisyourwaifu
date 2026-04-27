export type Locale = 'en' | 'zh'

export type LocalizedText = Record<Locale, string>

export type Axis = 'E_I' | 'S_N' | 'T_F' | 'J_P'

export type DerivedAxis = 'TEMPO' | 'IDEAL' | 'MYSTIQUE'

export type DisplayAxis = Axis | DerivedAxis

export type Pole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export type DerivedPole = 'CALM' | 'WILD' | 'GROUND' | 'DREAM' | 'OPEN' | 'MYST'

export type DisplayPole = Pole | DerivedPole

export type WaifuType =
  | 'INTJ'
  | 'INTP'
  | 'ENTJ'
  | 'ENTP'
  | 'INFJ'
  | 'INFP'
  | 'ENFJ'
  | 'ENFP'
  | 'ISTJ'
  | 'ISFJ'
  | 'ESTJ'
  | 'ESFJ'
  | 'ISTP'
  | 'ISFP'
  | 'ESTP'
  | 'ESFP'

export interface Question {
  id: string
  text: LocalizedText
  scene: LocalizedText
  axis: Axis
  favoredPole: Pole
  weight: number
}

export interface Character {
  id: string
  name: LocalizedText
  source: LocalizedText
  type: WaifuType
  portrait?: {
    url: string
    sourceName: string
    sourceUrl: string
  }
  axisVector: Record<Axis, number>
  traits: Record<Locale, string[]>
  matchCopy: LocalizedText
  palette: string
}

export type AnswerValue = -3 | -2 | -1 | 0 | 1 | 2 | 3

export type AnswerMap = Record<string, AnswerValue>

export interface AxisScore {
  axis: DisplayAxis
  score: number
  confidence: number
  left: DisplayPole
  right: DisplayPole
  derived?: boolean
}

export interface CharacterMatch {
  character: Character
  fit: number
  distance: number
  typeMatch: number
}

export interface QuizResult {
  type: WaifuType
  scores: Record<Axis, number>
  axisScores: AxisScore[]
  character: Character
  fit: number
  confidence: number
  topMatches: CharacterMatch[]
}
