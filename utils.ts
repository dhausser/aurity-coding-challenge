import { Deck, Card } from './types'

export function fetchDeck(): Promise<Deck> {
  return fetch(
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  ).then(async (response) => {
    const data = await response.json()
    if (data.success) {
      return data
    } else {
      return Promise.reject(new Error(`No deck shuffled`))
    }
  })
}

export function fetchCard(deckId = 'new'): Promise<Card> {
  return fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  ).then(async (response) => {
    const data = await response.json()
    if (response.ok) {
      const [card] = data.cards
      card.index = getCardIndex(card.code.charAt(0))
      return card
    } else {
      return Promise.reject(new Error(`No card drawn`))
    }
  })
}

export function getCardIndex(char): number {
  switch (char) {
    case 'A':
      return 14
      break
    case 'K':
      return 13
      break
    case 'Q':
      return 12
      break
    case 'J':
      return 11
      break
    case '0':
      return 10
      break
    default:
      return parseInt(char as string, 10)
  }
}

export function compareCards(isLoading, prevCard, card, isBetUp): string {
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
