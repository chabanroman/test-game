export const BUTTON_TYPES = {
  button: 'button',
  submit: 'submit'
} as const

export type ButtonTypes = typeof BUTTON_TYPES[keyof typeof BUTTON_TYPES]
