import {
  STATES,
  Statuses,
  STATUSES
} from '../../../../pages/minesweeper/constants'
import { FieldProps } from '../../../../pages/minesweeper/services/services'
import { ReactElement, useEffect, useState } from 'react'
import { classes } from './classes'
import { useMinesweeper } from '../../../../pages/minesweeper/minesweeper.context'

type Props = {
  item: FieldProps
  index: number
  onClick: (item: FieldProps) => void
}

export const Cell = ({
  item,
  index,
  onClick = () => {}
}: Props): ReactElement => {
  const [status, setStatus] = useState<Statuses>(STATUSES.hidden)
  const [number, setNumber] = useState<string | number>('')
  const {
    width,
    height,
    bombs,
    bombsToGo,
    setBombsToGo,
    setShouldBeOpen,
    shouldBeOpen,
    shouldRestart,
    setState,
    alreadyOpened,
    state
  } = useMinesweeper()

  // handle when we need to open all cells where we have do not have bombs, change status and set numbers around
  useEffect(() => {
    if (item.shouldBeOpened && shouldBeOpen) {
      setStatus(item.status)
      !item.bomb && setNumber(item.countOfBombs || '')
      setShouldBeOpen(false)
    }
  }, [item.shouldBeOpened, shouldBeOpen])

  // handle case when we win
  useEffect(() => {
    status === STATUSES.visible && alreadyOpened.current.push('')
    state !== STATES.lost &&
      alreadyOpened.current.length === width * height - bombs &&
      setState(STATES.win)
  }, [status])

  useEffect(() => {
    setStatus(STATUSES.hidden)
    setNumber('')
  }, [width, height, bombs, shouldRestart])

  const handleOnClick = () => {
    if (status !== STATUSES.hidden || state === STATES.win) return

    onClick(item)

    if (item.bomb) {
      setState(STATES.lost)
      setStatus(STATUSES.bomb)
      return
    }

    setStatus(STATUSES.visible)

    setNumber(item.countOfBombs)
  }

  const handleRightClick = (e) => {
    e.preventDefault()

    if (status === STATUSES.hidden) {
      item.status = STATUSES.flagged
      setStatus(STATUSES.flagged)
      setBombsToGo(bombsToGo - 1)
    }

    if (status === STATUSES.flagged) {
      setStatus(STATUSES.hidden)
      setBombsToGo(bombsToGo + 1)
    }
  }

  return (
    <div
      onClick={handleOnClick}
      onContextMenu={handleRightClick}
      className={`
        ${classes.base}
        ${classes.state[status]}
      `}
      key={index}
    >
      {number}
    </div>
  )
}
