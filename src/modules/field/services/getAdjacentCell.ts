import { STATUSES } from '../../../pages/minesweeper/constants'
import { FieldProps } from '../../../pages/minesweeper/services/services'

interface AdjacentCell {
  bombs: FieldProps[]
  cells: FieldProps[]
}

export const openAllCell = (fields: FieldProps[][]): FieldProps[] => {
  const cells = []

  for (let xOffset = 0; xOffset < fields.length; xOffset++) {
    for (let yOffset = 0; yOffset < fields[xOffset].length; yOffset++) {
      const cell = fields[xOffset]?.[yOffset]

      if (cell.bomb) {
        cell.status = STATUSES.bomb
        cell.shouldBeOpened = true
      } else {
        cell.status = STATUSES.visible
        cell.shouldBeOpened = true
      }

      cell && cells.push(cell)
    }
  }

  return cells
}

export const getAdjacentCell = (
  item: FieldProps,
  fields: FieldProps[][]
): AdjacentCell => {
  let cells = []

  if (!item.bomb) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const cell = fields[item.x + xOffset]?.[item.y + yOffset]
        cell && cells.push(cell)
      }
    }
  } else {
    cells = openAllCell(fields)
  }

  return {
    bombs: cells.filter((c) => c.bomb),
    cells
  }
}
