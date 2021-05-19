import React from "react"
import reactImg from ".././img/react.png"
import firebaseImg from ".././img/firebase.png"
import tailwindImg from ".././img/tailwindcss.png"

export default function Footer({ signedIn, onSignOut }) {
  const date = new Date()
  return (
    <footer className="py-10">
      <p>Copyright {date.getFullYear()} Sergio Cutone</p>
      <p>
        <img src={reactImg} alt="React" className="h-10 inline mr-2" />
        <img src={firebaseImg} alt="Firebase" className="h-10 inline mr-2" />
        <img src={tailwindImg} alt="Tailwind CSS" className="h-10 inline" />
      </p>
      {signedIn && (
        <span
          onClick={onSignOut}
          className="text-red-500 cursor-pointer hover:text-gray-700"
        >
          Logout
        </span>
      )}
    </footer>
  )
}
