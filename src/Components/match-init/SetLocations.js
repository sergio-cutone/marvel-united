import React from "react"
import locations from "../../helpers/locations"

const SetLocations = ({ userSetLocations }) => {
  return (
    <div>
      <h2 className="font-bold text-xl block">Set Locations</h2>
      <select
        className="p-2 border-2 border-black mb-5 w-full"
        onChange={e => {
          userSetLocations(e)
        }}
      >
        <option value="all">All Locations</option>
        {locations.map((location, i) => (
          <option value={location.team} key={`team-${i}`}>
            {location.team}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SetLocations
