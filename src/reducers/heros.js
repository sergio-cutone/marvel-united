import teams from "../helpers/teams"
import {
  USER_SELECT_HEROS,
  RANDOM_SELECT_HEROS,
  CHANGE_HERO,
} from "../helpers/constants"

const sortHeros = heros => {
  return heros.sort((a, b) => {
    return a.name < b.name ? -1 : 0
  })
}

const userSetHerosReducer = (userSelectedTeam, action) => {
  switch (action.type) {
    case USER_SELECT_HEROS:
      const newUserSelectedTeam = teams
        .map(team => {
          return (
            (team.team === action.payload || action.payload === "all") &&
            team.heros
          )
        })
        .flat()
        .filter(filtered => filtered.name)
      return sortHeros(newUserSelectedTeam)
    default:
      return userSelectedTeam
  }
}

const randomSetHerosReducer = (randomSelectedHeros, action) => {
  switch (action.type) {
    case RANDOM_SELECT_HEROS:
      const userSelectedHeros = action.payload.userSelectedHeros
      const heroCount = action.payload.heroCount
      const randomSelectedHeroTeam = []
      const selectedHeros = [...userSelectedHeros]
      for (let i = 0; i < heroCount; i++) {
        const randomSelectedHeroIndex = Math.floor(
          Math.random() * selectedHeros.length
        )
        randomSelectedHeroTeam.push(
          selectedHeros.splice(randomSelectedHeroIndex, 1)
        )
      }
      return sortHeros(randomSelectedHeroTeam.flat())
    case CHANGE_HERO:
      const oldHero = action.payload.oldHero
      const newHero = action.payload.newHero
      const newRandomSelectedHeros = randomSelectedHeros.filter(
        hero => hero.name !== oldHero.name
      )
      newRandomSelectedHeros.push(newHero)
      return sortHeros(newRandomSelectedHeros)
    default:
      return randomSelectedHeros
  }
}

export {
  USER_SELECT_HEROS,
  RANDOM_SELECT_HEROS,
  CHANGE_HERO,
  userSetHerosReducer,
  randomSetHerosReducer,
}
