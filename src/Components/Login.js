import React, { useState, useEffect } from "react"
import logo from ".././img/logo.png"

const Login = ({ onSignIn, signInError }) => {
  const [username, usernameState] = useState("")
  const [password, passwordState] = useState("")
  const [errors, errorState] = useState({ username: false, password: false })
  const handleUsername = value => {
    usernameState(value)
  }
  const handlePassword = value => {
    passwordState(value)
  }
  const login = () => {
    !username
      ? errorState(prevState => ({ ...prevState, username: true }))
      : errorState(prevState => ({ ...prevState, username: false }))
    !password
      ? errorState(prevState => ({ ...prevState, password: true }))
      : errorState(prevState => ({ ...prevState, password: false }))

    if (username && password) {
      onSignIn(username, password)
    }
  }

  const handleAutoEntry = () => {
    usernameState("demo@sergiocutone.com")
    passwordState(1234567)
  }

  useEffect(() => {
    const url_string = window.location.href
    const url = new URL(url_string)
    const email = url.searchParams.get("email") || ""
    if (email) {
      usernameState(email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="bg-black bg-opacity-80 fixed top-0 left-0 w-screen h-screen p-5">
      <div className="max-w-screen-sm p-5 bg-white border-8 border-blue-500 mx-auto text-center rounded-md">
        <img
          src={logo}
          alt="Marvel United"
          className="w-40 mx-auto mb-5"
          onClick={handleAutoEntry}
        />
        <p className="text-xl font-bold">Firebase Login</p>
        {errors.username || errors.password ? (
          <div className="text-red-500 mb-3">Please fill in all fields.</div>
        ) : (
          ""
        )}
        <form
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <p>
            Username
            <br />
            <input
              type="text"
              value={username}
              className={`p-2 border-2 ${
                errors.username ? "border-red-500" : "border-black"
              }`}
              onChange={e => handleUsername(e.target.value)}
              autoComplete="email username"
            />
          </p>
          <p>
            Password
            <br />
            <input
              type="password"
              value={password}
              className={`p-2 border-2 ${
                errors.password ? "border-red-500" : "border-black"
              }`}
              onChange={e => handlePassword(e.target.value)}
              autoComplete="password"
            />
          </p>
          {signInError && <p className="text-red-500">{signInError}</p>}
          <button onClick={login}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
