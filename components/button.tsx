import { StyledButton } from 'styles'
import { fetchCard } from 'utils'

export function Button({ name, dispatch, children }) {
  async function handleClick() {
    dispatch({ type: name, payload: await fetchCard() })
  }
  return <StyledButton onClick={handleClick}>{children}</StyledButton>
}
