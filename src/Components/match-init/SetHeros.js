import React from "react"
import teams from "../../helpers/teams"

const SetHeros = ({ userSetHeros }) => {
  return (
    <div>
      <h2 className="font-bold text-xl block">Set Heros</h2>
      <select
        className="p-2 border-2 border-black mb-5 w-full"
        onChange={e => {
          userSetHeros(e)
        }}
      >
        <option value="all">All Heros</option>
        {teams.map((team, i) => (
          <option value={team.team} key={`team-${i}`}>
            {team.team}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SetHeros
