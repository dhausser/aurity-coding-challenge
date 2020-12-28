import React from "react"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Layout from "../components/layout"

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

  const [deck, setDeck] = React.useState<Deck>()
  const [prevCard, setPrevCard] = React.useState<Card>()
  const [card, setCard] = React.useState<Card>()
  const [isBetUp, setIsBetUp] = React.useState<boolean>(false)

  function shuffleCards() {
    window
      .fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(async (response) => {
        const data = await response.json()
        if (data.success) {
          setDeck(data)
        }
      })
  }

  function drawCard() {
    console.log(deck.deck_id)
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
        return "you win"
      } else {
        return "you lose"
      }
    } else {
      if (prevCardCode > cardCode) {
        return "you win"
      } else {
        return "you lose"
      }
    }
  }

  React.useEffect(() => {
    shuffleCards()
  }, [lazyShuffle])

  return (
    <Layout>
      <main className={styles.main}>
        <div>
          <p>{prevCard ? compareCards() : "Please bet on a card"}</p>
        </div>
        <div className={styles.grid}>
          {card ? (
            <div className={styles.card}>
              <p>{card.value}</p>
              <p>{card.suit}</p>
              <p>{card.code}</p>
              <Image
                src={card.image}
                alt={card.value}
                width={500}
                height={500}
              />
            </div>
          ) : (
            <div>
              <p>Please bet on a card</p>
            </div>
          )}
          <button className={styles.card} onClick={drawCard}>
            UP
          </button>
          <button className={styles.card}>DOWN</button>
        </div>
      </main>
    </Layout>
  )
}
