import { useState, useEffect, useReducer } from 'react'
import Layout from '../components/layout'
import { useCard, useDeck } from '../hooks'
import { fetchCard } from '../utils'
import { Main, CardWrapper } from '../styles'
import { FetchState } from '../types'

export default function Home() {
  const [deckState, setDeckState] = useState<FetchState>({
    status: 'pending',
    deck: null,
    error: null,
  })
  const initialState = { status: 'pending', card: null, error: null }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { card } = state

  function reducer(state, action: { type: string; payload: any }) {
    let card = null
    switch (action.type) {
      case 'up':
        console.log(action.payload)
        return { status: 'resolved', card: action.payload, error: null }
      case 'down':
        console.log(action.payload)
        return { status: 'resolved', card: action.payload, error: null }
      case 'init':
        return { status: 'resolved', card: action.payload, error: null }
      case 'error':
        return { status: 'rejected', card: null, error: action.payload }
      default:
        throw new Error()
    }
  }

  useDeck(setDeckState)
  useCard(deckState, dispatch)

  return (
    <Layout>
      <Main>
        <CardWrapper>
          {card ? <img src={card.image} alt={card.value} /> : <p>Loading...</p>}
        </CardWrapper>
        <button
          onClick={async () =>
            dispatch({ type: 'up', payload: await fetchCard() })
          }
        >
          Up
        </button>
        <button
          onClick={async () =>
            dispatch({ type: 'down', payload: await fetchCard() })
          }
        >
          Down
        </button>
      </Main>
    </Layout>
  )
}
