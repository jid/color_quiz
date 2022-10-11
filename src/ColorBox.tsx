type ColorBoxProps = {
  color: string
}

const ColorBox = ({ color }: ColorBoxProps) => {
  return (
    <div className="box" style={{ backgroundColor: color }} />
  )
}

export default ColorBox