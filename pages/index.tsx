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
}

export default function Home() {
  // creating this property to avoid reshuffle on each rerender
  const lazyShuffle = true

  const [deck, setDeck] = useState<Deck>()
  const [prevCard, setPrevCard] = useState<Card>()
  const [card, setCard] = useState<Card>()
  const [isBetUp, setIsBetUp] = useState<boolean>(false)

  function shuffleCards() {
    window
      .fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(async (response) => {
        const data = await response.json()
        if (data.success) {
          setDeck(data)
        }
      })
  }

  function drawCard() {
    window
      .fetch(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      )
      .then(async (response) => {
        const data = await response.json()
        if (data.success) {
          const cardDraw = data.cards[0]
          if (cardDraw) {
            setPrevCard(card)
            setCard(cardDraw)
          }
        }
      })
  }

  function betUp() {
    setIsBetUp(true)
    drawCard()
  }

  function betDown() {
    setIsBetUp(false)
    drawCard()
  }

  function compareCards() {
    if (!prevCard) return null
    const prevCardCode = prevCard.code
    const cardCode = card.code
    if (isBetUp) {
      if (prevCardCode < cardCode) {
        return 'you win'
      } else {
        return 'you lose'
      }
    } else {
      if (prevCardCode > cardCode) {
        return 'you win'
      } else {
        return 'you lose'
      }
    }
  }

  useEffect(() => {
    shuffleCards()
  }, [lazyShuffle])

  useEffect(() => {
    if (deck?.deck_id) {
      drawCard()
    }
  }, [deck])

  return (
    <Layout>
      <Main>
        <p>{prevCard ? compareCards() : 'Please bet on a card'}</p>
        <CardWrapper>
          {card ? <img src={card.image} alt={card.value} /> : <p>Loading...</p>}
        </CardWrapper>
        <Button onClick={betUp}>Bet Up</Button>
        <Button onClick={betDown}>Bet Down</Button>
      </Main>
    </Layout>
  )
}
