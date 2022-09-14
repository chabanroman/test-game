import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { BOMBS, HEIGHT, STATES, States, WIDTH } from './constants'
import { FieldProps, getGameField } from './services/services'

type MinesweeperContextValue = {
  width?: number
  height?: number
  bombs?: number
  bombsToGo?: number
  setWidth?: Dispatch<SetStateAction<number>>
  setHeight?: Dispatch<SetStateAction<number>>
  setBombs?: Dispatch<SetStateAction<number>>
  setBombsToGo?: Dispatch<SetStateAction<number>>
  setShouldBeOpen?: Dispatch<SetStateAction<boolean>>
  shouldBeOpen?: boolean
  setShouldRestart?: Dispatch<SetStateAction<boolean>>
  shouldRestart?: boolean
  setState?: Dispatch<SetStateAction<States>>
  state?: States
  setAlreadyOpened?: Dispatch<SetStateAction<number>>
  alreadyOpened?: MutableRefObject<any[]>
  fields: FieldProps[][]
}

const MinesweeperContext = createContext<MinesweeperContextValue>({
  width: WIDTH,
  height: HEIGHT,
  bombs: BOMBS,
  bombsToGo: BOMBS,
  setWidth: () => {},
  setHeight: () => {},
  setBombs: () => {},
  setBombsToGo: () => {},
  setShouldBeOpen: () => {},
  shouldBeOpen: false,
  setShouldRestart: () => {},
  shouldRestart: false,
  setState: () => {},
  alreadyOpened: { current: [] },
  state: STATES.inprogress,
  fields: []
})

export const MinesweeperProvider = ({ children }): ReactElement => {
  const alreadyOpened = useRef([])
  const [width, setWidth] = useState<number>(WIDTH)
  const [height, setHeight] = useState<number>(HEIGHT)
  const [bombs, setBombs] = useState<number>(BOMBS)
  const [bombsToGo, setBombsToGo] = useState<number>(BOMBS)
  const [shouldBeOpen, setShouldBeOpen] = useState<boolean>(false)
  const [shouldRestart, setShouldRestart] = useState<boolean>(false)
  const [state, setState] = useState<States>(STATES.inprogress)
  const [fields, setFields] = useState<FieldProps[][]>([])

  useEffect(() => {
    setFields(getGameField({ width, height, bombs }))
    setBombsToGo(bombs)
  }, [width, height, bombs, shouldRestart])

  return (
    <MinesweeperContext.Provider
      value={{
        width,
        height,
        bombs,
        bombsToGo,
        setWidth,
        setHeight,
        setBombs,
        setBombsToGo,
        fields,
        shouldBeOpen,
        setShouldBeOpen,
        shouldRestart,
        setState,
        state,
        setShouldRestart,
        alreadyOpened
      }}
    >
      {children}
    </MinesweeperContext.Provider>
  )
}

export const useMinesweeper = () => useContext(MinesweeperContext)
