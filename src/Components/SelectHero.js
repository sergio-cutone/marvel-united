import React from "react"

const SelectHero = ({
  heroScreen,
  close,
  confirm,
  userSelectedHeros,
  randomSelectedHeros,
  changeRandomHeros,
}) => {
  const getHeroNames = randomSelectedHeros.map(hero => hero.name)
  return (
    <section className="fixed bg-black bg-opacity-80 w-screen h-screen top-0 left-0 z-50 p-5 overflow-y-auto">
      <div className="max-w-screen-sm mx-auto">
        <p className="text-xl text-white font-bold">Select New Hero</p>
        <div className="grid sm:grid-cols-3">
          {userSelectedHeros.map(
            hero =>
              !getHeroNames.includes(hero.name) && (
                <img
                  src={require(".././img/hero/" + hero.img).default}
                  alt={hero.name}
                  width="220px"
                  className="mx-auto sm:w-60 p-3 cursor-pointer hover:opacity-70"
                  onClick={() => {
                    //onNewHero(hero)
                    changeRandomHeros(hero)
                    confirm()
                  }}
                  key={hero.name}
                />
              )
          )}
        </div>
        <button
          onClick={() => {
            heroScreen(false)
            close()
          }}
        >
          Cancel
        </button>
      </div>
    </section>
  )
}

export default SelectHero
