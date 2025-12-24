import "./styles/app.css"
import Board from "./components/Board"
import { Player } from "./utils/player"

function App() {
  const p1 = new Player()
  const p2 = new Player()

  return (
    <>
      <header>
        <h1>Battleship</h1>
      </header>
      <section className="boards-container">
        <Board board={p1.gameboard.board} />
        <Board board={p2.gameboard.board} />
      </section>
    </>
  )
}

export default App
