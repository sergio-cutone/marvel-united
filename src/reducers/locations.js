import {
  RANDOM_SELECT_LOCATIONS,
  USER_SELECT_LOCATION,
} from "../helpers/constants"
import locations from "../helpers/locations"

const userSetLocationReducer = (userSelectedLocations, action) => {
  switch (action.type) {
    case USER_SELECT_LOCATION:
      const newUserSelectedLocation = locations
        .map(location => {
          return (
            (location.team === action.payload || action.payload === "all") &&
            location.locations
          )
        })
        .flat()
        .filter(filtered => filtered.name)
      return newUserSelectedLocation
    case RANDOM_SELECT_LOCATIONS:
      const locationCount = 6
      const randomSelectedLocations = []
      const selectedLocations = [...userSelectedLocations]
      for (let i = 0; i < locationCount; i++) {
        const randomSelectedLocationIndex = Math.floor(
          Math.random() * selectedLocations.length
        )
        randomSelectedLocations.push(
          selectedLocations.splice(randomSelectedLocationIndex, 1)
        )
      }
      return randomSelectedLocations.flat()
    default:
      return userSelectedLocations
  }
}

export { userSetLocationReducer }
