import { Character } from '../Character/Character'
import './App.css'

function App() {
  return (
    <>
     <header>
        <h1>The Rick and Morty API</h1>
        <nav>
            <ul>
              <li><a>Home</a></li>
              <li><a>About</a></li>
              <li><a>Services</a></li>
            </ul>
        </nav>
     </header>
     <main>
      <Character />
     </main>

      <footer>
        <p>Designed By: Saad Saheed</p>
        <p>All rights reserved</p>
        <p>3MTT Cohort 3 &copy;2025</p>
      </footer>
    </>
  )
}

export default App
