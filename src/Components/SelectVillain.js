import React from "react"

const SelectVillain = ({
  onNewVillain,
  villainScreen,
  close,
  confirm,
  villains,
}) => {
  return (
    <section className="fixed bg-black bg-opacity-80 w-screen h-screen top-0 left-0 z-50 p-5 overflow-y-auto">
      <div className="max-w-screen-sm mx-auto">
        <p className="text-xl text-white font-bold">Select New Villain</p>
        <div className="grid sm:grid-cols-3">
          {villains.map((villain, i) => (
            <img
              src={require(".././img/villain/" + villain.img).default}
              alt="ship"
              width="220px"
              className="mx-auto sm:w-60 p-3 cursor-pointer"
              onClick={() => {
                onNewVillain(villain)
                confirm()
              }}
              key={`villain-${i}`}
            />
          ))}
        </div>
        <button
          onClick={() => {
            villainScreen(false)
            close()
          }}
        >
          Cancel
        </button>
      </div>
    </section>
  )
}

export default SelectVillain
