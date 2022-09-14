import { FC, FormEvent } from 'react'
import { InputNames, InputTypes, INPUT_TYPES } from './constants'

type Props = {
  onChange: (e: FormEvent<HTMLInputElement>) => void
  name: InputNames
  type?: InputTypes
  placeholder?: string
  className?: string
}

export const Input: FC<Props> = ({
  type = INPUT_TYPES.number,
  placeholder = '',
  className = '',
  name,
  onChange
}) => {
  return (
    <input
      className={`${className} px-2`}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}
