import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  function handleClick(operator) {
    let newValue = 0;
    if (operator === '+') {
     newValue = count + 1;
    } else if (operator === '-') {
     newValue = count - 1;
    }

    if(newValue < 0) {
      setError(`You've reached the limit!`);
      return;
    }

    setError(null);
    setCount(newValue);
  }

  return (
    <>
      <h1>My Counter</h1>
      <d className="counter">
        <span>{count}</span>
      </d>
      {error && <div className="error">{error}</div>}
      <div className="card">
        <button onClick={() => handleClick('+')}>
          Increase
        </button>
        <button onClick={() => handleClick('-')}>
          Decrease
        </button>
      </div>
    </>
  )
}

export default App
