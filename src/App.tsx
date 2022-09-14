import { ReactElement } from 'react'
import { Minesweeper } from './pages/minesweeper/Minesweeper'
import { Layout } from './modules/common/components/layout/Layout'
import { MinesweeperProvider } from './pages/minesweeper/minesweeper.context'

export const App = (): ReactElement => {
  return (
    <Layout>
      <MinesweeperProvider>
        <Minesweeper />
      </MinesweeperProvider>
    </Layout>
  )
}
