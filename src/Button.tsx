type ButtonProps = {
  color: string,
  onClick: (e: any) => void
}

const Button = ({ color, onClick }: ButtonProps) => {
  return (
    <button onClick={() => onClick(color)}>{color}</button>
  )
}

export default Button