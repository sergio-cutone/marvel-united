import React from "react"

const Buttons = ({ onSelectPlayer, onMatchesScreen, click }) => {
  const players = new Array(4).fill(0)
  return (
    <>
      <h1 className="font-bold text-2xl block">How Many Heros?</h1>
      <div className="grid grid-cols-2 gap-4">
        {players.map((e, i) => (
          <button onClick={() => onSelectPlayer(i + 1)} key={`button-${i}`}>
            {i + 1}
          </button>
        ))}
      </div>
      <button
        className="btn-blue mt-3"
        onClick={() => {
          onMatchesScreen()
          click()
        }}
      >
        Previous Matches
      </button>
    </>
  )
}

export default Buttons
