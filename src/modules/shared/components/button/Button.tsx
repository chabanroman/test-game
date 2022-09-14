import { FC } from 'react'
import { ButtonTypes, BUTTON_TYPES } from './constants'

type Props = {
  title: string
  onClick: () => void
  type?: ButtonTypes
  className?: string
}

export const Button: FC<Props> = ({
  title,
  onClick,
  type = BUTTON_TYPES.button,
  className = ''
}) => {
  return (
    <button className={`${className}`} type={type} onClick={onClick}>
      {title}
    </button>
  )
}
