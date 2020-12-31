import { useReducer } from 'react'
import { calculateWin } from 'utils'
import { Deck, Card } from 'types'

function reducer(
  state,
  action: { type: string; card: Card; deck: Deck; error: Error }
) {
  switch (action.type) {
    case 'up':
      return {
        status: calculateWin(state.card.index, action.card.index, true),
        card: action.card,
      }
    case 'down':
      return {
        status: calculateWin(state.card.index, action.card.index, false),
        card: action.card,
      }
    case 'init':
      return { status: 'Bet Up or Down', card: action.card }
    case 'deck':
      return { status: 'Shuffling deck', deck: action.deck }
    case 'error':
      return { status: 'Error', error: action.error }
    default:
      throw new Error()
  }
}

export function useGame() {
  const initialState = {
    status: 'loading',
    deck: null,
    card: null,
    error: null,
  }
  return useReducer(reducer, initialState)
}
