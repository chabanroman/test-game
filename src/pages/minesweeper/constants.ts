export const WIDTH = 10
export const HEIGHT = 10
export const BOMBS = 10

export const STATUSES = {
  visible: 'visible',
  hidden: 'hidden',
  bomb: 'bomb',
  flagged: 'flagged'
} as const

export type Statuses = typeof STATUSES[keyof typeof STATUSES]

export const STATES = {
  inprogress: 'inprogress',
  win: 'win',
  lost: 'lost'
} as const

export type States = typeof STATES[keyof typeof STATES]
