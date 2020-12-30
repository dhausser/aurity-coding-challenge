export interface FetchState {
  status: string
  deck?: Deck
  card?: Card
  error: Error | null
}

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
  index?: number
}
