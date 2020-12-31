import { fetchCard } from 'utils'

export function Button({ name, dispatch, children }) {
  async function handleClick() {
    dispatch({ type: name, card: await fetchCard() })
  }
  return <button onClick={handleClick}>{children}</button>
}
