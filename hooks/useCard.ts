import { useEffect } from 'react'
import { fetchCard } from 'utils'
import { useGame } from 'hooks/useGame'

export function useCard() {
  const [state, dispatch] = useGame()
  useEffect(() => {
    async function initCard() {
      try {
        const card = await fetchCard(state.deck.deck_id)
        dispatch({
          type: 'init',
          deck: state.deck,
          card,
          error: null,
        })
      } catch (error) {
        dispatch({
          type: 'error',
          deck: null,
          card: null,
          error,
        })
      }
    }
    if (state?.deck?.deck_id) {
      initCard()
    }
  }, [state.deck])
}
