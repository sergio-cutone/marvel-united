import React from "react"

const RandomSelectedHeros = ({ handleChangePlayer, randomSelectedHeros }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-5">
      {randomSelectedHeros.map((hero, i) => (
        <img
          src={require("../.././img/hero/" + hero.img).default}
          alt={hero.name}
          width="220px"
          className="mx-auto sm:w-60 cursor-pointer hover:opacity-70"
          key={`hero-${i}`}
          onClick={() => handleChangePlayer(hero)}
        />
      ))}
    </div>
  )
}
export default RandomSelectedHeros
