export type Locale = 'en' | 'zh'

export type LocalizedText = Record<Locale, string>

export type Axis = 'E_I' | 'S_N' | 'T_F' | 'J_P'

export type Pole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

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
  source: string
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
  axis: Axis
  score: number
  confidence: number
  left: Pole
  right: Pole
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
