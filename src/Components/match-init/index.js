import React from "react"
import SetHeros from "./SetHeros"
import SetVillains from "./SetVillains"
import SetLocations from "./SetLocations"

const SetButtons = ({ players, handleNewGameSetup }) => {
  return (
    <div>
      <h1 className="font-bold text-2xl block">How Many Heros?</h1>
      <div className="grid grid-cols-2 gap-4">
        {players.map((e, i) => (
          <button
            onClick={() => {
              handleNewGameSetup(i + 1)
            }}
            key={`button-${i}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

const MatchInit = ({
  onMatchesScreen,
  click,
  userSetHeros,
  userSetVillains,
  handleNewGameSetup,
  userSetLocations,
}) => {
  const players = new Array(4).fill(0)
  return (
    <>
      <div className="grid sm:grid-cols-3 gap-3">
        <SetHeros userSetHeros={userSetHeros} />
        <SetVillains userSetVillains={userSetVillains} />
        <SetLocations userSetLocations={userSetLocations} />
      </div>
      <SetButtons players={players} handleNewGameSetup={handleNewGameSetup} />
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

export default MatchInit
