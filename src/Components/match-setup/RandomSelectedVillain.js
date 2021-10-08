import React from "react"

const RandomSelectedHeros = ({
  randomSelectedVillain,
  handleChangeVillain,
}) => {
  return (
    <img
      src={require("../.././img/villain/" + randomSelectedVillain.img).default}
      alt={randomSelectedVillain.name}
      width="220px"
      className="mx-auto sm:w-60 cursor-pointer hover:opacity-70"
      onClick={handleChangeVillain}
    />
  )
}

export default RandomSelectedHeros
