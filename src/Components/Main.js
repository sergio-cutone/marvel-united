import React, {
  useState,
  useRef,
  useReducer,
  useCallback,
  useEffect,
} from "react"
import firestore from ".././services/firestore"
import Login from "../Components/Login"
import useSound from "use-sound"
import MatchInit from "../Components/match-init/"
import MatchSetup from "../Components/match-setup/"
import Matches from "./Matches"
import SelectHero from "../Components/SelectHero"
import SelectVillain from "../Components/SelectVillain"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import shield from ".././img/shield.png"
import { userSetHerosReducer, randomSetHerosReducer } from "../reducers/heros"
import {
  userSetVillainsReducer,
  randomSetVillainsReducer,
} from "../reducers/villains"
import { userSetLocationReducer } from "../reducers/locations"
import * as SOUND from ".././helpers/sounds"
import * as CONSTANT from "../helpers/constants"

const fbCollection = require("../services/fb-collection")

export default function Main() {
  // REDUCERS
  const [userSelectedHeros, dispatchSetHeros] = useReducer(
    userSetHerosReducer,
    []
  )
  const [userSelectedVillains, dispatchSetVillains] = useReducer(
    userSetVillainsReducer,
    []
  )
  const [userSelectedLocations, dispatchSetLocations] = useReducer(
    userSetLocationReducer,
    []
  )
  const [randomSelectedHeros, dispatchRandomHeros] = useReducer(
    randomSetHerosReducer,
    []
  )
  const [randomSelectedVillain, dispatchRandomVillains] = useReducer(
    randomSetVillainsReducer,
    []
  )
  //
  // SCREENS
  const [heroScreen, heroScreenState] = useState(false)
  const [villainScreen, villainScreenState] = useState(false)
  const [matchesScreen, matchesScreenState] = useState(false)
  //
  // SOUNDS
  const [playShield] = useSound(SOUND.shieldSfx)
  const [playIntro] = useSound(SOUND.introSfx)
  const [lost] = useSound(SOUND.lostSfx)
  const [click] = useSound(SOUND.clickSfx)
  const [confirm] = useSound(SOUND.confirmSfx)
  const [close] = useSound(SOUND.closeSfx)
  const [win] = useSound(SOUND.winSfx)
  //
  // FIREBASE / LOGIN
  const [signedIn, signedInState] = useState(false)
  const [signInError, signInErrorState] = useState()
  var db = firestore.firestore()
  //
  const [throwShield, throwShieldState] = useState(false)
  const [selectPlayer, selectPlayerState] = useState(false)
  const [button, buttonState] = useState(true)
  const changeHero = useRef()
  const numberOfPlayers = useRef()

  const changeRandomHeros = useCallback(newHero => {
    heroScreenState(false)
    dispatchRandomHeros({
      type: CONSTANT.CHANGE_HERO,
      payload: {
        oldHero: changeHero.current,
        newHero: newHero,
      },
    })
  }, [])

  const changeRandomVillain = useCallback(newVillain => {
    villainScreenState(false)
    dispatchRandomVillains({
      type: CONSTANT.CHANGE_VILLAIN,
      payload: newVillain,
    })
  }, [])

  const randomSetHeros = useCallback(
    heroCount => {
      dispatchRandomHeros({
        type: CONSTANT.RANDOM_SELECT_HEROS,
        payload: {
          userSelectedHeros: userSelectedHeros,
          heroCount: heroCount,
        },
      })
    },
    [userSelectedHeros]
  )

  const randomSetVillain = useCallback(() => {
    dispatchRandomVillains({
      type: CONSTANT.RANDOM_SELECT_VILLAINS,
      payload: userSelectedVillains,
    })
  }, [userSelectedVillains])

  const randomSetLocations = useCallback(() => {
    dispatchSetLocations({
      type: CONSTANT.RANDOM_SELECT_LOCATIONS,
      payload: userSelectedLocations,
    })
  }, [userSelectedLocations])

  const userSetHeros = useCallback(e => {
    dispatchSetHeros({
      type: CONSTANT.USER_SELECT_HEROS,
      payload: e === "all" ? e : e.target.value,
    })
  }, [])

  const userSetVillains = useCallback(e => {
    dispatchSetVillains({
      type: CONSTANT.USER_SELECT_VILLAINS,
      payload: e === "all" ? e : e.target.value,
    })
  }, [])

  const userSetLocations = useCallback(e => {
    dispatchSetLocations({
      type: CONSTANT.USER_SELECT_LOCATION,
      payload: e === "all" ? e : e.target.value,
    })
  }, [])

  const handleThrowShield = () => {
    playShield()
    throwShieldState(true)
    setTimeout(() => {
      throwShieldState(false)
      selectPlayerState(true)
    }, 800)
  }

  const handleNewGameSetup = heroCount => {
    numberOfPlayers.current = heroCount
    buttonState(false)
    randomSetHeros(heroCount)
    randomSetVillain()
    randomSetLocations()
    handleThrowShield()
  }

  useEffect(() => {
    resetHerosVillains()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetHerosVillains = () => {
    userSetHeros("all")
    userSetVillains("all")
    userSetLocations("all")
  }

  const handleNewGame = () => {
    confirm()
    click()
    selectPlayerState(false)
    buttonState(true)
    matchesScreenState(false)
    resetHerosVillains()
  }

  const handleMatchesScreen = () => {
    selectPlayerState(false)
    buttonState(false)
    matchesScreenState(true)
  }

  const handleSaveMatch = status => {
    const locations = userSelectedLocations.map(location => location.name)
    status === "loss" ? lost() : win()

    db.collection(fbCollection)
      .add({
        heros: randomSelectedHeros,
        villain: randomSelectedVillain,
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
          <MatchInit
            onMatchesScreen={handleMatchesScreen}
            click={click}
            userSetHeros={userSetHeros}
            userSetVillains={userSetVillains}
            handleNewGameSetup={handleNewGameSetup}
            userSetLocations={userSetLocations}
          />
        )}
        {selectPlayer && (
          <MatchSetup
            randomSelectedHeros={randomSelectedHeros}
            randomSelectedVillain={randomSelectedVillain}
            onNewGame={handleNewGame}
            selectPlayerState={selectPlayerState}
            numberOfPlayers={numberOfPlayers.current}
            heroScreen={heroScreenState}
            villainScreen={villainScreenState}
            changeHero={changeHero}
            onSaveMatch={handleSaveMatch}
            click={click}
            handleNewGameSetup={handleNewGameSetup}
            userSelectedLocations={userSelectedLocations}
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
          villainScreen={villainScreenState}
          close={close}
          confirm={confirm}
          userSelectedVillains={userSelectedVillains}
          randomSelectedVillain={randomSelectedVillain}
          changeRandomVillain={changeRandomVillain}
        />
      )}
      {heroScreen && (
        <SelectHero
          heroScreen={heroScreenState}
          close={close}
          confirm={confirm}
          userSelectedHeros={userSelectedHeros}
          randomSelectedHeros={randomSelectedHeros}
          changeRandomHeros={changeRandomHeros}
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
