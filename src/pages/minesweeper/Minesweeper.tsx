import { Field } from '../../modules/field/components/Field'
import { ReactElement } from 'react'
import { Header } from '../../modules/header/components/Header'

export const Minesweeper = (): ReactElement => {
  return (
    <div className="w-full h-[100vh] bg-blue-200">
      <div className="flex justify-center items-center flex-col pt-10">
        <Header />
        <Field />
      </div>
    </div>
  )
}
