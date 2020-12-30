import { fetchCard } from 'utils'

export function Button({ name, dispatch, children }) {
  async function handleClick() {
    dispatch({ type: name, payload: await fetchCard() })
  }
  return <button onClick={handleClick}>{children}</button>
}
