import React from "react"
import logo from ".././img/logo.png"

export default function Header({ onNewGame }) {
  return (
    <header className="App-header p-3">
      <img
        src={logo}
        className="max-w-full w-52 sm:w-60 cursor-pointer"
        alt="logo"
        onClick={onNewGame}
      />
    </header>
  )
}
