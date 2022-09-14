import { Button } from '../../shared/components/button/Button'
import { FormEvent, ReactElement, useState } from 'react'
import { Input } from '../../shared/components/input/Input'
import { useMinesweeper } from '../../../pages/minesweeper/minesweeper.context'
import { INPUT_NAMES } from '../../shared/components/input/constants'
import { checkMaxBombsValue } from '../services/checkMaxBombsValue'
import { STATES } from '../../../pages/minesweeper/constants'

export const Header = (): ReactElement => {
  const [error, setError] = useState<string>('')
  const [newBombsValue, setNewBombsValue] = useState<number>(0)
  const [newWidthValue, setNewWidthValue] = useState<number>(0)
  const [newHeightValue, setNewHeightValue] = useState<number>(0)

  const {
    bombsToGo,
    width,
    height,
    setHeight,
    setWidth,
    setBombs,
    setShouldRestart,
    shouldRestart,
    state,
    setState,
    alreadyOpened
  } = useMinesweeper()

  const handleOnChange = (
    e: FormEvent<HTMLInputElement>,
    cb: (number) => void
  ): void => {
    setError('')
    const { value, name } = e.currentTarget

    if (name === INPUT_NAMES.bombs) {
      checkMaxBombsValue({
        value: Number(value),
        width,
        height,
        newWidth: newWidthValue,
        newHeight: newHeightValue
      }) && setError(`Value must be less than ${value}`)
    }

    cb(value)
  }

  // use this when we want to restart the game or restart the game with new data
  const handleOnClick = (): void => {
    setState(STATES.inprogress)
    alreadyOpened.current = []

    newBombsValue && setBombs(newBombsValue)
    newWidthValue && setWidth(newWidthValue)
    newHeightValue && setHeight(newHeightValue)

    setShouldRestart(!shouldRestart)
  }

  return (
    <div className="flex flex-col pb-8">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h3 className="font-extrabold text-xl">Minesweeper</h3>
          <div className="font-medium pb-4">Mines left: {bombsToGo}</div>
        </div>
        <div>
          {state === STATES.win && (
            <span className="text-green-700 font-semibold text-[32px]">
              You win
            </span>
          )}
          {state === STATES.lost && (
            <span className="text-rose-500 font-semibold text-[32px]">
              You lost
            </span>
          )}
        </div>
        <div>
          <Button
            title="Refresh"
            onClick={handleOnClick}
            className="cursor-pointer bg-gray-100 px-5 py-1 rounded-md hover:bg-gray-500 hover:text-gray-100"
          />
        </div>
      </div>
      <div className="flex justify-between gap-1">
        <Input
          placeholder="Width"
          name={INPUT_NAMES.width}
          onChange={(e) => handleOnChange(e, setNewWidthValue)}
        />
        <Input
          placeholder="Height"
          name={INPUT_NAMES.height}
          onChange={(e) => handleOnChange(e, setNewHeightValue)}
        />
        <div className="flex flex-col">
          <Input
            placeholder="Bombs"
            name={INPUT_NAMES.bombs}
            onChange={(e) => handleOnChange(e, setNewBombsValue)}
          />
          {error && (
            <span className="text-red-500 font-normal text-xs mt-1">
              {error}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
