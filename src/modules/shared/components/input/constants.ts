export const INPUT_TYPES = {
  text: 'text',
  number: 'number'
} as const

export type InputTypes = typeof INPUT_TYPES[keyof typeof INPUT_TYPES]

export const INPUT_NAMES = {
  width: 'text',
  height: 'number',
  bombs: 'bombs'
} as const

export type InputNames = typeof INPUT_NAMES[keyof typeof INPUT_NAMES]
