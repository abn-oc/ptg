import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState("Hello World")
  const [seed, setSeed] = useState(0) // used to force re-randomization

  // Available font classes
  const fonts = [
    "font-merriweather",
    "font-shrikhand",
    "font-poppins",
    "font-quicksand",
    "font-robotoslab",
    "font-montserrat",
    "font-inter",
    "font-notosans",
    "font-notoserif"
  ]

  // Random utility
  const randomFrom = (arr: string | any[]) => arr[Math.floor(Math.random() * arr.length)]

  const rotations = ["-8", "-5", "-3", "3", "5", "8", "12"]
  const colorCombos = [
    "text-white bg-black",
    "text-black bg-white",
    "text-white bg-red-600",
    "text-red-600 bg-white",
    "text-black bg-red-600",
  ]

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 space-y-8 p-6">
      
      {/* Graffiti Box */}
      <div className="p-6 border-4 border-black rounded-xl bg-white shadow-xl">
        <h1 className="flex flex-wrap gap-2 text-6xl font-bold">
          {text.split("").map((char, i) => {
            if (char === " ") {
              return <span key={i} className="w-6"></span>
            }
            return (
              <span
                key={i + "-" + seed} // seed forces new random styles
                className={`${randomFrom(fonts)} ${randomFrom(colorCombos)} px-2 inline-block rotate-[${randomFrom(rotations)}deg]`}
              >
                {char}
              </span>
            )
          })}
        </h1>
      </div>

      {/* Input */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your graffiti..."
        className="w-full max-w-md px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {/* Refresh Button */}
      <button
        onClick={() => setSeed(seed + 1)}
        className="px-6 py-2 bg-black text-white rounded-lg font-bold shadow-md hover:bg-red-600 transition"
      >
        Refresh Graffiti
      </button>
    </div>
  )
}

export default App
