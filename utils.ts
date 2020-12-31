import { Deck, CardWithIndex } from './types'

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

export function fetchCard(deckId = 'new'): Promise<CardWithIndex> {
  return fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  ).then(async (response) => {
    const data = await response.json()
    if (response.ok) {
      const [card] = data.cards
      card.index = parseCardValue(card.value)
      return card
    } else {
      return Promise.reject(new Error(`No card drawn`))
    }
  })
}

export function parseCardValue(value): number {
  switch (value) {
    case 'ACE':
      return 14
      break
    case 'KING':
      return 13
      break
    case 'QUEEN':
      return 12
      break
    case 'JACK':
      return 11
      break
    default:
      return parseInt(value as string, 10)
  }
}

export function calculateWin(
  prevIndex: number,
  index: number,
  isBetUp: boolean
): string {
  if (prevIndex === index) return 'Draw, play again ♻️'
  if (!prevIndex) return 'Please bet on a card'
  if ((prevIndex < index && isBetUp) || (prevIndex > index && !isBetUp)) {
    return 'You win 🎉'
  }
  return 'You lose 🙈'
}
