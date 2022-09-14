import { FieldProps } from '../../../pages/minesweeper/services/services'
import { ReactElement } from 'react'
import { useMinesweeper } from '../../../pages/minesweeper/minesweeper.context'
import { Row } from '../../common/components/row/Row'
import { getAdjacentCell, openAllCell } from '../services/getAdjacentCell'
import { STATUSES } from '../../../pages/minesweeper/constants'

export const Field = (): ReactElement => {
  const { fields, setShouldBeOpen, setAlreadyOpened, alreadyOpened } =
    useMinesweeper()

  const handleAdjacentCell = (item: FieldProps) => {
    const { bombs, cells } = getAdjacentCell(item, fields)

    item.countOfBombs = bombs.length
    item.shouldBeOpened = true
    item.status = STATUSES.visible

    setShouldBeOpen(true)
    if (!bombs.length) {
      cells.forEach(
        (i) => i.status !== STATUSES.visible && handleAdjacentCell(i)
      )
    }

    return bombs.length || ''
  }

  const handleOnCellClick = (item: FieldProps) => {
    if (item.bomb) {
      openAllCell(fields)
      setShouldBeOpen(true)
      return
    }
    handleAdjacentCell(item)
  }

  return (
    <div className="flex">
      {fields.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          handleOnCellClick={handleOnCellClick}
        />
      ))}
    </div>
  )
}
