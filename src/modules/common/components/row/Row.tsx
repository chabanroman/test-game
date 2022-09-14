import { FieldProps } from '@src/pages/minesweeper/services/services'
import { ReactElement } from 'react'
import { Cell } from '../cell/Cell'

type Props = {
  row: FieldProps[]
  rowIndex: number
  handleOnCellClick: (item: FieldProps) => void
}

export const Row = ({
  row,
  rowIndex,
  handleOnCellClick
}: Props): ReactElement => {
  return (
    <div key={rowIndex}>
      {row.map((cell, index) => (
        <Cell
          key={index}
          item={cell}
          index={index}
          onClick={handleOnCellClick}
        />
      ))}
    </div>
  )
}
