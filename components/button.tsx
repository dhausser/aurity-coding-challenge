import { StyledButton } from '../styles'

export function Button({ name, setIsBetUp, drawCard, children }) {
  function handleClick() {
    setIsBetUp(name === 'up' ? true : false)
    drawCard()
  }
  return <StyledButton onClick={handleClick}>{children}</StyledButton>
}
