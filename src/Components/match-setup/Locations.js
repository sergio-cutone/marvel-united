import React from "react"

const Locations = ({ userSelectedLocations }) => {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        {userSelectedLocations.map((location, i) => (
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
        <span className="bg-red-600 h-4 w-4 inline-block"></span> Villain Start
        Position
      </p>
      <p className="text-left">
        <span className="bg-green-600 h-4 w-4 inline-block"></span> Heros
        Starting Position
      </p>
    </>
  )
}

export default Locations
