import React, { useState, useRef, useEffect } from "react"
import VsImg from ".././img/vs.png"

const Matches = ({ db, fbCollection, onNewGame, click, close }) => {
  const [matchState, setMatchState] = useState([])
  const [nextDisable, nextDisableState] = useState(false)
  const [prevDisable, prevDisableState] = useState(true)
  const firstVisible = useRef()
  const lastVisible = useRef()
  const matchesPerPage = useRef(2)
  const dataWin = useRef(0)
  const dataLoss = useRef(0)

  useEffect(() => {
    getWinLoss()
    getMatches()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMatchesPerPage = value => {
    matchesPerPage.current = value
    getMatches()
  }
  const handlePagination = e => {
    click()
    let direction = e.currentTarget.getAttribute("data-paginate")
    let allMatches = []
    let collection =
      direction === "next"
        ? db
            .collection(fbCollection)
            .orderBy("timestamp", "desc")
            .startAfter(lastVisible.current)
            .limit(matchesPerPage.current)
        : db
            .collection(fbCollection)
            .orderBy("timestamp", "desc")
            .endBefore(firstVisible.current)
            .limitToLast(matchesPerPage.current)

    collection.get().then(documentSnapshots => {
      lastVisible.current =
        documentSnapshots.docs[documentSnapshots.docs.length - 1]
      firstVisible.current = documentSnapshots.docs[0]
      documentSnapshots.forEach(doc => {
        allMatches.push({ data: doc.data(), docId: doc.id })
      })
      setMatchState(allMatches)
      getNextMatch(documentSnapshots.docs[documentSnapshots.docs.length - 1])
      getPreviousMatch()
    })
  }

  const getNextMatch = startAfter => {
    db.collection(fbCollection)
      .orderBy("timestamp", "desc")
      .startAfter(startAfter)
      .limit(matchesPerPage.current)
      .get()
      .then(documentSnapshots => {
        nextDisableState(documentSnapshots.docs.length === 0 ? true : false)
      })
  }

  const getPreviousMatch = () => {
    db.collection(fbCollection)
      .orderBy("timestamp", "desc")
      .endBefore(firstVisible.current)
      .limitToLast(matchesPerPage.current)
      .get()
      .then(documentSnapshots => {
        prevDisableState(documentSnapshots.docs.length === 0 ? true : false)
      })
  }

  const getWinLoss = () => {
    dataWin.current = 0
    dataLoss.current = 0
    db.collection(fbCollection)
      .get()
      .then(documentSnapshots => {
        if (documentSnapshots.docs.length > 0) {
          documentSnapshots.forEach(doc => {
            dataWin.current =
              doc.data().status === "win"
                ? dataWin.current + 1
                : dataWin.current
            dataLoss.current =
              doc.data().status === "loss"
                ? dataLoss.current + 1
                : dataLoss.current
          })
        }
      })
  }

  const getMatches = function getMatchesFromFirebase() {
    let allMatches = []
    var first = db
      .collection(fbCollection)
      .orderBy("timestamp", "desc")
      .limit(matchesPerPage.current)

    first.get().then(documentSnapshots => {
      if (documentSnapshots.docs.length > 0) {
        lastVisible.current =
          documentSnapshots.docs[documentSnapshots.docs.length - 1]
        firstVisible.current = documentSnapshots.docs[0]
        documentSnapshots.forEach(doc => {
          allMatches.push({ data: doc.data(), docId: doc.id })
        })
        setMatchState(allMatches)
        getNextMatch(documentSnapshots.docs[documentSnapshots.docs.length - 1])
      } else {
        setMatchState({ data: [], docId: 0 })
      }
    })
  }

  const deleteMatch = e => {
    let verify = window.confirm("Are you sure you want to delete this match?")
    if (verify === true) {
      db.collection(fbCollection)
        .doc(e.currentTarget.getAttribute("data-docid"))
        .delete()
        .then(() => {
          console.log("Document successfully deleted!")
          close()
          getWinLoss()
          getMatches()
        })
        .catch(error => {
          console.error("Error removing document: ", error)
        })
    }
  }
  return (
    <div>
      <h1 className="font-bold text-2xl block">Previous Matches</h1>
      <div className="grid grid-cols-3 sm:grid-cols-2 mb-4">
        <div className="text-left text-sm col-span-2 sm:col-span-1">
          <div className="border-4 border-green-500 rounded-md p-1 inline">
            {" "}
            Win: {dataWin.current}
          </div>{" "}
          <div className="border-4 border-red-500 rounded-md p-1 inline">
            {" "}
            Loss: {dataLoss.current}
          </div>
        </div>
        <div className="text-right">
          <span className="hidden sm:inline">Matches Per Page </span>
          <select onBlur={e => handleMatchesPerPage(e.target.value)}>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
      {matchState.length > 0 &&
        matchState.map((match, i) => {
          const getHeroNames = Object.entries(match.data.heros).map(a => a[1])
          return (
            <div
              className={`border-8 rounded-md p-3 mb-3 ${
                match.data.status === "win" && "border-green-500"
              } ${match.data.status === "loss" && "border-red-500"}`}
              key={`match-${i}`}
            >
              <div className="text-sm mb-3">
                {String(match.data.timestamp.toDate())}
              </div>
              <img
                src={
                  require(".././img/villain/" + match.data.villain.img).default
                }
                alt={match.data.villain.name}
                width="220px"
                className="mx-auto sm:w-60"
              />
              <img src={VsImg} alt="VS" className="mx-auto my-3" />
              <div className="grid grid-cols-2 gap-3">
                {getHeroNames.map((hero, i) => (
                  <img
                    src={require(".././img/hero/" + hero.img).default}
                    alt={hero.name}
                    width="220px"
                    className="mx-auto sm:w-60"
                    key={`hero-${i}`}
                  />
                ))}
              </div>
              <button
                className="my-5"
                data-docid={match.docId}
                onClick={deleteMatch}
              >
                Delete
              </button>
            </div>
          )
        })}
      {!matchState.length && <div className="my-5">No Saved Games</div>}
      <div className="grid grid-cols-2 gap-5">
        <button
          onClick={handlePagination}
          data-paginate="prev"
          disabled={prevDisable}
          className={`btn-blue ${prevDisable && "opacity-60"}`}
        >
          Previous
        </button>
        <button
          onClick={handlePagination}
          data-paginate="next"
          disabled={nextDisable}
          className={`btn-blue ${nextDisable && "opacity-60"}`}
        >
          Next
        </button>
      </div>
      <button
        className="mt-3"
        onClick={() => {
          onNewGame()
          click()
        }}
      >
        New Game
      </button>
    </div>
  )
}

export default Matches
