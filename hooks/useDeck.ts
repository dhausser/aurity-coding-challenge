import { useEffect } from 'react'
import { fetchDeck } from 'utils'

export function useDeck(dispatch) {
  useEffect(() => {
    async function initDeck() {
      try {
        const deck = await fetchDeck()
        dispatch({
          type: 'deck',
          deck,
          card: null,
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
    initDeck()
  }, [])
}
