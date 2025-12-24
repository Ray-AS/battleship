import "./styles/app.css"
import Board from "./components/Board"

function App() {
  return (
    <>
      <header>
        <h1>Battleship</h1>
      </header>
      <section className="boards-container">
        <Board />
        <Board />
      </section>
    </>
  )
}

export default App
