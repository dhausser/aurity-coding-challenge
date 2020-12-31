import { useEffect } from 'react'
import { fetchCard } from 'utils'

export function useCard(state, dispatch) {
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
    if (state.deck?.deck_id) {
      initCard()
    }
  }, [state.deck])
}
