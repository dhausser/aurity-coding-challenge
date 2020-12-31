import { useEffect, useReducer } from 'react'
import { Layout } from 'components/layout'
import { Button } from 'components/button'
import { fetchDeck, fetchCard, calculateWin } from 'utils'
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

export default function Game() {
  const initialState = {
    status: 'loading',
    deck: null,
    card: null,
    error: null,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { card } = state

  async function useDeck() {
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

  function useCard() {
    useEffect(() => {
      async function initCard() {
        const card = await fetchCard(state.deck.deck_id)
        try {
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

  useDeck()
  useCard()

  return (
    <Layout>
      <h1>{state.status}</h1>
      <div className="main">
        <div className="card-wrapper">
          {card ? (
            <img src={card.image} alt={`${card.value} OF ${card.suit}`} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Button name="up" dispatch={dispatch}>
          Up
        </Button>
        <Button name="down" dispatch={dispatch}>
          Down
        </Button>
      </div>
    </Layout>
  )
}
