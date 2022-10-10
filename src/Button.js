
const Button = ({ color, onClick }) => {
  return (
    <button onClick={() => onClick(color)}>{color}</button>
  )
}

export default Button