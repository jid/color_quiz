import logo from './logo.svg';
import './App.css';
import ColorBox from './ColorBox'
import Button from './Button'
import { useState, useEffect } from 'react'

/// TODO - add TypeScript stuff

function App() {
  // {color: 'hex<1,2,3>', options: ['hex1', 'hex2', 'hex3]}
  const [colorData, setColorData] = useState({})
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setColorData(generateNewState())
  }, [])

  const generateNewState = () => {
    const options = [
      generateColorInHex(),
      generateColorInHex(),
      generateColorInHex()
    ]

    const mainColorIdx = Math.floor(Math.random() * 3) % 3 // get index 0/1/2

    return {
      color: options[mainColorIdx],
      options1: options[0],
      options2: options[1],
      options3: options[2]
    }
  }

  const generateColorInHex = () => {
    const red = (Math.floor(Math.random() * 256) % 256).toString(16)
    const green = (Math.floor(Math.random() * 256) % 256).toString(16)
    const blue = (Math.floor(Math.random() * 256) % 256).toString(16)
    const colorHex = `#${red}${green}${blue}`

    return colorHex
  }

  const onButtonClick = (e) => {
    if (e.target.innerHTML === colorData.color) {
      setIsError(false)
      setMessage('Correct')
      setColorData(generateNewState())

    } else {
      setMessage('Wrong answer')
      setIsError(true)
    }
  }

  return (
    <main className="App">
      <h1 className="header">Guess The Color!</h1>
      <section className="color-box">
        <ColorBox color={colorData.color} />
      </section>
      <section className="buttons">
        <Button color={colorData.options1} onClick={onButtonClick} />
        <Button color={colorData.options2} onClick={onButtonClick} />
        <Button color={colorData.options3} onClick={onButtonClick} />
      </section>
      {isError
        ? <p className="error">{message}</p>
        : <p className="success">{message}</p>}
    </main>
  );
}

export default App;
