import React from "react"
import VsImg from ".././img/vs.png"
import locationImg from ".././img/locations.png"

const MatchSetup = ({
  heros,
  villain,
  locations,
  onSelectPlayer,
  onNewGame,
  selectPlayerState,
  numberOfPlayers,
  heroScreen,
  villainScreen,
  changeHero,
  onSaveMatch,
  click,
  confirm,
}) => {
  const handlePlayerState = () => {
    selectPlayerState(false)
    onSelectPlayer(numberOfPlayers, false)
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
      <button
        className="mb-5 mr-3 w-30 sm:w-36 btn-blue"
        onClick={() => {
          onNewGame()
          confirm()
        }}
      >
        New
      </button>
      <button className="mb-5 w-30 sm:w-36" onClick={() => handlePlayerState()}>
        Reset
      </button>
      <p>Click on a Villain or Hero to swap them.</p>
      <img
        src={require(".././img/villain/" + villain.img).default}
        alt="ship"
        width="220px"
        className="mx-auto sm:w-60 cursor-pointer hover:opacity-70"
        onClick={handleChangeVillain}
      />
      <img src={VsImg} alt="vs" className="mx-auto my-3" />
      <div className="grid grid-cols-2 gap-2 mb-5">
        {heros.map((hero, i) => (
          <img
            src={require(".././img/hero/" + hero.img).default}
            alt="ship"
            width="220px"
            className="mx-auto sm:w-60 cursor-pointer hover:opacity-70"
            key={`hero-${i}`}
            onClick={() => handleChangePlayer(hero)}
          />
        ))}
      </div>
      <div>
        <img src={locationImg} alt="Locations" className="mx-auto my-3" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
          {locations.map((location, i) => (
            <div
              className={`shadow-xl bg-gradient-to-b from-blue-300 via-white to-gray-400 font-bold rounded-md p-2 flex flex-wrap items-center justify-center h-24 ${
                i === 0 && "border-red-600 border-8"
              } ${i === 3 && "border-green-600 border-8"}`}
              key={`location-${i}`}
            >
              <div className="w-full">{location.name}</div>
            </div>
          ))}
        </div>
        <p className="text-left">
          <span className="bg-red-600 h-4 w-4 inline-block"></span> Villain
          Start Position
        </p>
        <p className="text-left">
          <span className="bg-green-600 h-4 w-4 inline-block"></span> Heros
          Starting Position
        </p>
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
