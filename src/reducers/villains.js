import villains from "../helpers/villains"
import {
  USER_SELECT_VILLAINS,
  RANDOM_SELECT_VILLAINS,
  CHANGE_VILLAIN,
} from "../helpers/constants"

const userSetVillainsReducer = (userSelectedVillains, action) => {
  switch (action.type) {
    case USER_SELECT_VILLAINS:
      const newUserSelectedVillains = villains
        .map(team => {
          return (
            (team.team === action.payload || action.payload === "all") &&
            team.villains
          )
        })
        .flat()
        .filter(filtered => filtered.name)
        .sort((a, b) => {
          return a.name < b.name ? -1 : 0
        })
      return newUserSelectedVillains
    default:
      return userSelectedVillains
  }
}

const randomSetVillainsReducer = (randomSelectedVillains, action) => {
  switch (action.type) {
    case RANDOM_SELECT_VILLAINS:
      const userSelectedVillains = action.payload
      return userSelectedVillains[
        Math.floor(Math.random() * userSelectedVillains.length)
      ]
    case CHANGE_VILLAIN:
      const newVillain = action.payload
      return newVillain
    default:
      return randomSelectedVillains
  }
}

export {
  USER_SELECT_VILLAINS,
  RANDOM_SELECT_VILLAINS,
  CHANGE_VILLAIN,
  userSetVillainsReducer,
  randomSetVillainsReducer,
}
