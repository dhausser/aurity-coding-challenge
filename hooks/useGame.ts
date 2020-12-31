import { useReducer } from 'react'
import { calculateWin } from 'utils'
import { GameState, GameAction } from 'types'

function reducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case 'up':
      return {
        ...state,
        status: calculateWin(state.card.index, action.card.index, true),
        card: action.card,
      }
    case 'down':
      return {
        ...state,
        status: calculateWin(state.card.index, action.card.index, false),
        card: action.card,
      }
    case 'init':
      return {
        ...state,
        status: 'Bet Up or Down',
        card: action.card,
      }
    case 'deck':
      return {
        ...state,
        status: 'Shuffling deck',
        deck: action.deck,
      }
    case 'error':
      return {
        ...state,
        status: 'Error',
        error: action.error,
      }
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
