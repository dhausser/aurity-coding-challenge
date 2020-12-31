import { useEffect } from 'react'
import { fetchDeck, fetchCard } from './utils'

export function useDeck(setDeckState) {
  useEffect(() => {
    fetchDeck().then(
      (deck) => {
        setDeckState({ status: 'resolved', deck: deck, error: null })
      },
      (error) => {
        setDeckState({ status: 'rejected', error: error })
      }
    )
  }, [])
}

export function useDeckAsync(setDeckState) {
  useEffect(() => {
    async function initDeck() {
      setDeckState({ status: 'resolved', deck: await fetchDeck(), error: null })
    }
    initDeck()
  }, [])
}

export function useCard(deckState, dispatch) {
  useEffect(() => {
    if (deckState.deck) {
      fetchCard().then(
        (card) => {
          dispatch({
            type: 'init',
            payload: card,
          })
        },
        (error) => {
          dispatch({
            type: 'error',
            payload: error,
          })
        }
      )
    }
  }, [deckState])
}

export function useCardAsync(state, dispatch) {
  useEffect(() => {
    async function initCard() {
      dispatch({
        type: 'init',
        payload: await fetchCard(state.deck.deck_id),
      })
    }
    initCard()
  }, [])
}
