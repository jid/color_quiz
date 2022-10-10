
const Button = ({ color, onClick }) => {
  return (
    <button onClick={onClick}>{color}</button>
  )
}

export default Button