import React, { useState, useRef, useReducer, useCallback } from "react"
import firestore from ".././services/firestore"
import Login from "../Components/Login"
import useSound from "use-sound"
import Buttons from "../Components/Buttons"
import MatchSetup from "../Components/MatchSetup"
import Matches from "./Matches"
import SelectHero from "../Components/SelectHero"
import SelectVillain from "../Components/SelectVillain"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import villains from "../helpers/villains"
import teams from "../helpers/teams"
import locationsList from "../helpers/locations"
import shield from ".././img/shield.png"
import shieldSfx from ".././sounds/shield.mp3"
import introSfx from ".././sounds/intro.mp3"
import winSfx from ".././sounds/win.mp3"
import lostSfx from ".././sounds/lost.mp3"
import clickSfx from ".././sounds/click.mp3"
import confirmSfx from ".././sounds/confirm.mp3"
import closeSfx from ".././sounds/close.mp3"

const fbCollection = require("../services/fb-collection")

const RANDOM_VILLAIN = "RANDOM_VILLAIN"
const NEW_VILLAIN = "NEW_VILLAIN"
const RANDOM_HEROS = "RANDOM_HEROS"
const NEW_HERO = "NEW_HERO"
const RANDOM_LOCATIONS = "RANDOM_LOCATIONS"

const heroReducer = (heroTeam, action) => {
  switch (action.type) {
    case RANDOM_HEROS:
      return action.heros
    case NEW_HERO:
      const newTeam = heroTeam.map(hero =>
        hero.name === action.oldHero.name ? action.newHero : hero
      )
      return newTeam
    default:
      return heroTeam
  }
}

const villainReducer = (villain, action) => {
  switch (action.type) {
    case RANDOM_VILLAIN:
      return action.villain
    case NEW_VILLAIN:
      return action.villain
    default:
      return villain
  }
}

const locationReducer = (locations, action) => {
  switch (action.type) {
    case RANDOM_LOCATIONS:
      return action.locations
    default:
      return locations
  }
}

export default function Main() {
  const [heroTeam, dispatchHero] = useReducer(heroReducer, [])
  const [villainTeam, dispatchVillain] = useReducer(villainReducer, [])
  const [setLocations, dispatchLocation] = useReducer(locationReducer, [])
  const [throwShield, throwShieldState] = useState(false)
  const [selectPlayer, selectPlayerState] = useState(false)
  const [button, buttonState] = useState(true)
  const [heroScreen, heroScreenState] = useState(false)
  const [villainScreen, villainScreenState] = useState(false)
  const [matchesScreen, matchesScreenState] = useState(false)
  const changeHero = useRef()
  const numberOfPlayers = useRef()
  const [playShield] = useSound(shieldSfx)
  const [playIntro] = useSound(introSfx)
  const [lost] = useSound(lostSfx)
  const [click] = useSound(clickSfx)
  const [confirm] = useSound(confirmSfx)
  const [close] = useSound(closeSfx)
  const [win] = useSound(winSfx)

  const [signedIn, signedInState] = useState(false)
  const [signInError, signInErrorState] = useState()
  var db = firestore.firestore()

  const handleSaveMatch = status => {
    const locations = setLocations.map(location => location.name)
    status === "loss" ? lost() : win()

    db.collection(fbCollection)
      .add({
        heros: heroTeam,
        villain: villainTeam,
        locations: locations,
        status: status,
        timestamp: firestore.firestore.FieldValue.serverTimestamp(),
      })
      .then(docRef => {
        console.log("High score successful.")
        handleMatchesScreen()
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      })
  }

  const handleSignIn = (username, password) => {
    console.log(username)
    let c = 0
    firestore
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(userCredential => {
        // Signed in
        playIntro()
        signedInState(true)
        signInErrorState()
        // ...
      })
      .catch(error => {
        var errorCode = error.code
        var errorMessage = error.message
        signedInState(false)
        signInErrorState(error.message)
        console.log(errorCode, errorMessage)
      })
  }
  const handleSignOut = () => {
    firestore
      .auth()
      .signOut()
      .then(() => {
        signedInState(false)
      })
      .catch(error => {
        // An error happened.
        console.log(error)
      })
  }

  const handleNewGame = () => {
    click()
    selectPlayerState(false)
    buttonState(true)
    matchesScreenState(false)
  }

  const handleMatchesScreen = () => {
    selectPlayerState(false)
    buttonState(false)
    matchesScreenState(true)
  }

  const randomVillain = useCallback(() => {
    dispatchVillain({
      type: RANDOM_VILLAIN,
      villain: villains[Math.floor(Math.random() * villains.length)],
    })
  }, [dispatchVillain])

  const randomHeros = useCallback(
    selectedNumberOfPlayers => {
      numberOfPlayers.current =
        selectedNumberOfPlayers === 1 ? 3 : selectedNumberOfPlayers
      const heros = [],
        selectedHeros = []
      teams.map(team => team.heros.map(hero => heros.push(hero)))
      for (let i = 0; i < numberOfPlayers.current; i++) {
        selectedHeros.push(
          heros.splice(Math.floor(Math.random() * heros.length), 1)
        )
      }
      dispatchHero({
        type: RANDOM_HEROS,
        heros: selectedHeros.flat(),
      })
    },
    [dispatchHero]
  )

  const randomLocations = useCallback(() => {
    const selectedLocations = [],
      tempLocations = []
    locationsList.map(team =>
      team.locations.map(location => tempLocations.push(location))
    )

    for (let i = 0; i < 6; i++) {
      selectedLocations.push(
        tempLocations.splice(
          Math.floor(Math.random() * tempLocations.length),
          1
        )
      )
    }
    dispatchLocation({
      type: RANDOM_LOCATIONS,
      locations: selectedLocations.flat(),
    })
  }, [dispatchLocation])

  const newVillain = useCallback(newVillain => {
    villainScreenState(false)
    dispatchVillain({
      type: NEW_VILLAIN,
      villain: newVillain,
    })
  }, [])

  const newHero = useCallback(newHero => {
    heroScreenState(false)
    dispatchHero({
      type: NEW_HERO,
      oldHero: changeHero.current,
      newHero: newHero,
    })
  }, [])

  const handleSelectPlayer = selectedNumberOfPlayers => {
    buttonState(false)
    throwShieldState(true)
    playShield()
    randomVillain()
    randomHeros(selectedNumberOfPlayers)
    randomLocations()
    setTimeout(() => {
      throwShieldState(false)
      selectPlayerState(true)
    }, 800)
  }

  return (
    <>
      <Header onNewGame={handleNewGame} />
      <main className="py-10 min-h-full">
        <img
          src={shield}
          className={`shield ${throwShield && "throw"} z-50`}
          alt="shield"
        />
        {button && (
          <Buttons
            onSelectPlayer={handleSelectPlayer}
            throwShield={throwShield}
            onMatchesScreen={handleMatchesScreen}
            click={click}
          />
        )}
        {selectPlayer && (
          <MatchSetup
            heros={heroTeam}
            villain={villainTeam}
            locations={setLocations}
            onSelectPlayer={handleSelectPlayer}
            onNewGame={handleNewGame}
            selectPlayerState={selectPlayerState}
            numberOfPlayers={numberOfPlayers.current}
            heroScreen={heroScreenState}
            villainScreen={villainScreenState}
            changeHero={changeHero}
            onSaveMatch={handleSaveMatch}
            click={click}
            confirm={confirm}
          />
        )}
        {matchesScreen && (
          <Matches
            db={db}
            fbCollection={fbCollection}
            onNewGame={handleNewGame}
            click={click}
            close={close}
          />
        )}
      </main>
      {villainScreen && (
        <SelectVillain
          onNewVillain={newVillain}
          villainScreen={villainScreenState}
          close={close}
          confirm={confirm}
          villains={villains}
        />
      )}
      {heroScreen && (
        <SelectHero
          heroTeam={heroTeam}
          onNewHero={newHero}
          heroScreen={heroScreenState}
          close={close}
          confirm={confirm}
          teams={teams}
        />
      )}
      {!signedIn && <Login onSignIn={handleSignIn} signInError={signInError} />}
      <Footer
        signedIn={signedIn}
        onSignOut={handleSignOut}
        playIntro={playIntro}
      />
    </>
  )
}
