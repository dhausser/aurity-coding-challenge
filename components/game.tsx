import { Button } from 'components/button'
import { useDeck, useCard, useGame } from 'hooks'

export function Game() {
  // State of the game including status, card, deck and error
  const [state, dispatch] = useGame()

  // Fetch the initial deck and shuffle it
  useDeck(dispatch)

  // Fetch the initial card
  useCard(state, dispatch)

  return (
    <>
      <h1>{state.status}</h1>
      <div className="main">
        <div className="card-wrapper">
          {state.card ? (
            <img
              src={state.card.image}
              alt={`${state.card.value} OF ${state.card.suit}`}
            />
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
    </>
  )
}
