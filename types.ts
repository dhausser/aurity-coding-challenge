export interface Deck {
  success: boolean
  deck_id: string
  shuffled: boolean
  remaining: number
}

export interface Card {
  image: string
  value: string
  suit: string
  code: string
}

export interface CardWithIndex extends Card {
  index: number
}

export interface Game {
  deck: Deck
  card: CardWithIndex
  error: Error
}

export interface GameState extends Game {
  status: string
}

export interface GameAction extends Game {
  type: string
}
