import { STATUSES, Statuses } from '../constants'

export type FieldProps = {
  x: number
  y: number
  bomb: boolean
  shouldBeOpened: boolean
  countOfBombs: number
  status?: Statuses
}

type GameFieldInputProps = {
  width: number
  height: number
  bombs: number
}

type Position = {
  x: number
  y: number
}

const randomNumber = (size: number): number => {
  return Math.floor(Math.random() * size)
}

const positionMatch = (itemPosition: Position, position: Position): boolean => {
  return itemPosition.x === position.x && itemPosition.y === position.y
}

const getBombPosition = ({
  width,
  height,
  bombs
}: GameFieldInputProps): Position[] => {
  const positions = []

  while (positions.length < bombs) {
    const position = {
      x: randomNumber(width),
      y: randomNumber(height)
    }

    if (!positions.some((p) => positionMatch(p, position))) {
      positions.push(position)
    }
  }

  return positions
}

export const getGameField = ({
  width,
  height,
  bombs
}: GameFieldInputProps): FieldProps[][] => {
  const bombPosition = getBombPosition({ width, height, bombs })
  const board = []

  for (let x = 0; x < width; x++) {
    const row = []

    for (let y = 0; y < height; y++) {
      const cell = {
        x,
        y,
        bomb: bombPosition.some((p) => positionMatch(p, { x, y })),
        shouldBeOpened: false,
        countOfBombs: '',
        status: STATUSES.hidden
      }

      row.push(cell)
    }
    board.push(row)
  }

  return board
}
