import React from "react"
import VsImg from "../.././img/vs.png"
import locationImg from "../.././img/locations.png"
import RandomSelectedHeros from "./RandomSelectedHeros"
import RandomSelectedVillain from "./RandomSelectedVillain"
import Locations from "./Locations"

const MatchSetup = ({
  randomSelectedHeros,
  randomSelectedVillain,
  onNewGame,
  selectPlayerState,
  numberOfPlayers,
  heroScreen,
  villainScreen,
  changeHero,
  onSaveMatch,
  click,
  handleNewGameSetup,
  userSelectedLocations,
}) => {
  const handlePlayerState = () => {
    selectPlayerState(false)
    handleNewGameSetup(numberOfPlayers)
  }
  const handleChangeVillain = () => {
    click()
    villainScreen(true)
  }
  const handleChangePlayer = hero => {
    click()
    changeHero.current = hero
    heroScreen(true)
  }
  return (
    <>
      <button className="mb-5 mr-3 w-30 sm:w-36 btn-blue" onClick={onNewGame}>
        New
      </button>
      <button className="mb-5 w-30 sm:w-36" onClick={() => handlePlayerState()}>
        Reset
      </button>
      <p>Click on a Villain or Hero to swap them.</p>
      <RandomSelectedVillain
        randomSelectedVillain={randomSelectedVillain}
        handleChangeVillain={handleChangeVillain}
      />
      <img src={VsImg} alt="vs" className="mx-auto my-3" />
      <RandomSelectedHeros
        randomSelectedHeros={randomSelectedHeros}
        handleChangePlayer={handleChangePlayer}
      />
      <div>
        <img src={locationImg} alt="Locations" className="mx-auto my-3" />
        <Locations userSelectedLocations={userSelectedLocations} />
      </div>
      <div className="pt-3">
        <button
          className="mb-5 mr-3 w-30 sm:w-36 btn-green"
          onClick={() => onSaveMatch("win")}
        >
          Won
        </button>
        <button
          className="mb-5 w-30 sm:w-36"
          onClick={() => onSaveMatch("loss")}
        >
          Lost
        </button>
      </div>
    </>
  )
}

export default MatchSetup
