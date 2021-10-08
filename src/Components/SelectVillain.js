import React from "react"

const SelectVillain = ({
  villainScreen,
  close,
  confirm,
  randomSelectedVillain,
  userSelectedVillains,
  changeRandomVillain,
}) => {
  console.log(userSelectedVillains)
  return (
    <section className="fixed bg-black bg-opacity-80 w-screen h-screen top-0 left-0 z-50 p-5 overflow-y-auto">
      <div className="max-w-screen-sm mx-auto">
        <p className="text-xl text-white font-bold">Select New Villain</p>
        <div className="grid sm:grid-cols-3">
          {userSelectedVillains
            .sort((a, b) => b.name - a.name)
            .map(
              (villain, i) =>
                randomSelectedVillain.name !== villain.name && (
                  <img
                    src={require(".././img/villain/" + villain.img).default}
                    alt={villain.name}
                    width="220px"
                    className="mx-auto sm:w-60 p-3 cursor-pointer"
                    onClick={() => {
                      changeRandomVillain(villain)
                      confirm()
                    }}
                    key={`villain-${i}`}
                  />
                )
            )}
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
