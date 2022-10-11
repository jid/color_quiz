import './App.css';
import ColorBox from './ColorBox'
import Button from './Button'
import { useState, useEffect, useCallback } from 'react'

/// TODO - add more TypeScript stuff

type ColorData = {
  color: string,
  options: string[]
}

const initialState: ColorData = {
  color: '',
  options: []
}

function App() {
  // {color: 'hex<1,2,3>', options: ['hex1', 'hex2', 'hex3]}
  const [colorData, setColorData] = useState<ColorData>(initialState)
  const [message, setMessage] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [correctCount, setCorrectCount] = useState<number>(0)
  const [wrongCount, setWrongCount] = useState<number>(0)
  const [colorsClicked, setColorsClicked] = useState<string[]>([])

  const generateNewState: (() => ColorData) = useCallback(() => {
    const options = [
      generateColorInHex(),
      generateColorInHex(),
      generateColorInHex()
    ]

    const mainColorIdx = Math.floor(Math.random() * 3) % 3 // get index 0/1/2

    return {
      color: options[mainColorIdx],
      options
    }
  }, [])

  // initiate state
  useEffect(() => {
    setColorData(generateNewState())
  }, [generateNewState])

  const generateColorInHex: (() => string) = () => {
    const red: string = (Math.floor(Math.random() * 256) % 256).toString(16)
    const green: string = (Math.floor(Math.random() * 256) % 256).toString(16)
    const blue: string = (Math.floor(Math.random() * 256) % 256).toString(16)
    const colorHex: string = `#${red}${green}${blue}`

    return colorHex
  }

  const onButtonClick: ((color: string) => void) = (color) => {
    if (color === colorData.color) {
      setIsError(false)
      setMessage('Correct!')
      setColorData(generateNewState())
      setCorrectCount(prev => prev + 1)
      setColorsClicked([])
    } else {
      setMessage('Wrong answer :(')
      setIsError(true)
      if (!colorsClicked.includes(color)) {
        setWrongCount(prev => prev + 1)
        setColorsClicked([...colorsClicked, color])
      }
    }
  }

  return (
    <main className="App">
      <h1 className="header">Guess The Color!</h1>
      <section className="color-box">
        <ColorBox color={colorData.color} />
      </section>
      <section className="buttons">
        {colorData?.options?.map((option) =>
          <Button key={option} color={option} onClick={onButtonClick} />
        )}
      </section>
      {isError
        ? <p className="error">{message}</p>
        : <p className="success">{message}</p>}
      <section className="results">
        <p className="correct">Correct answers: {correctCount}</p>
        <p className="wrong">Wrong answers: {wrongCount}</p>
      </section>
    </main>
  );
}

export default App;
