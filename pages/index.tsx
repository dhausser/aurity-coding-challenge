import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { Main, CardWrapper, Button } from '../styles'

interface Deck {
  success: boolean
  deck_id: string
  shuffled: boolean
  remaining: number
}

interface Card {
  image: string
  value: string
  suit: string
  code: string
  index?: number
}

export default function Home() {
  const [deck, setDeck] = useState<Deck>()
  const [prevCard, setPrevCard] = useState<Card>()
  const [card, setCard] = useState<Card>()
  const [isBetUp, setIsBetUp] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const cards = []

  function shuffleCards() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(
      async (response) => {
        const data = await response.json()
        if (data.success) {
          setDeck(data)
        } else {
          return Promise.reject(new Error(`No deck shuffled`))
        }
      }
    )
  }

  function drawCard() {
    setIsLoading(true)
    fetch(
      `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
    ).then(async (response) => {
      const data = await response.json()
      if (data.success) {
        const cardDraw = data.cards[0]
        if (cardDraw) {
          const reducedCard = cardReducer(cardDraw)
          setPrevCard(card)
          setCard(reducedCard)
          setIsLoading(false)
        } else {
          return Promise.reject(new Error(`No card drawn"`))
        }
      }
    })
  }

  function cardReducer(card: Card) {
    const char = card.code.charAt(0)
    let index = null

    switch (char) {
      case 'A':
        index = 14
        break
      case 'K':
        index = 13
        break
      case 'Q':
        index = 12
        break
      case 'J':
        index = 11
        break
      case '0':
        index = 10
        break
      default:
        index = parseInt(char as string, 10)
    }

    return { ...card, index }
  }

  function bet(value) {
    setIsBetUp(value === 'up' ? true : false)
    drawCard()
  }

  function compareCards() {
    if (!prevCard) return 'Please bet on a card'
    if (isLoading) return '...'

    const { index: prevIndex } = prevCard
    const { index: currentIndex } = card

    if (prevIndex === currentIndex) return 'Draw, play again ♻️'

    const victory = 'You win 🎉'
    const failure = 'You lose 🙈'

    if (isBetUp) {
      if (prevIndex < currentIndex) {
        return victory
      } else {
        return failure
      }
    } else {
      if (prevIndex > currentIndex) {
        return victory
      } else {
        return failure
      }
    }
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    if (deck?.deck_id) {
      drawCard()
    }
  }, [deck])

  return (
    <Layout>
      <h1>{prevCard ? compareCards() : 'Please bet on a card'}</h1>
      <h2>
        {prevCard &&
          `Previous: ${prevCard.index} | Current: ${card.index} | ${
            isBetUp ? 'Up ⬆' : 'Down ⬇'
          }`}
      </h2>
      <Main>
        <CardWrapper>
          {card ? <img src={card.image} alt={card.value} /> : <p>Loading...</p>}
        </CardWrapper>
        <Button onClick={() => bet('up')}>Bet Up ⬆</Button>
        <Button onClick={() => bet('down')}>Bet Down ⬇</Button>
      </Main>
    </Layout>
  )
}
