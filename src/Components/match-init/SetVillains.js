import React from "react"
import villains from "../../helpers/villains"

const SetVillains = ({ userSetVillains }) => {
  return (
    <div>
      <h2 className="font-bold text-xl block">Set Villains</h2>
      <select
        className="p-2 border-2 border-black mb-5 w-full"
        onChange={e => {
          userSetVillains(e)
        }}
      >
        <option value="all">All Villains</option>
        {villains.map((villain, i) => (
          <option value={villain.team} key={`villain-${i}`}>
            {villain.team}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SetVillains
