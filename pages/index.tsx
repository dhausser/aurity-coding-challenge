import { useState, useReducer } from 'react'
import { Layout } from '../components/layout'
import { Button } from '../components/button'
import { useCard, useDeck } from '../hooks'
import { calculateWin } from '../utils'
import { FetchState, Card } from '../types'
import { Main, CardWrapper } from '../styles'

function reducer(state, action: { type: string; payload: Card }) {
  switch (action.type) {
    case 'up':
      return {
        status: calculateWin(state.card.index, action.payload.index, true),
        card: action.payload,
        error: null,
      }
    case 'down':
      return {
        status: calculateWin(state.card.index, action.payload.index, false),
        card: action.payload,
        error: null,
      }
    case 'init':
      return { status: 'Bet Up or Down', card: action.payload, error: null }
    default:
      throw new Error()
  }
}

export default function Home() {
  const [deckState, setDeckState] = useState<FetchState>({
    status: 'pending',
    deck: null,
    error: null,
  })
  const initialState = { status: 'loading', card: null, error: null }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { card } = state

  useDeck(setDeckState)
  useCard(deckState, dispatch)

  return (
    <Layout>
      <h1>{state.status}</h1>
      <Main>
        <CardWrapper>
          {card ? <img src={card.image} alt={card.value} /> : <p>Loading...</p>}
        </CardWrapper>
        <Button name="up" dispatch={dispatch}>
          Up
        </Button>
        <Button name="down" dispatch={dispatch}>
          Down
        </Button>
      </Main>
    </Layout>
  )
}
