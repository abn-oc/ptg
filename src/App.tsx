import { useState, useRef } from "react"
import { toPng } from "html-to-image"
import "./App.css"

function App() {
  const [text, setText] = useState("Hello World")
  const [seed, setSeed] = useState(0)
  const graffitiRef = useRef(null)

  const fonts = [
    "font-merriweather",
    "font-shrikhand",
    "font-poppins",
    "font-quicksand",
    "font-robotoslab",
    "font-montserrat",
    "font-inter",
    "font-notosans",
    "font-notoserif",
  ]

  const rotations = [-12, -8, -5, -3, 3, 5, 8, 12]
  const colorCombos = [
    "text-white bg-black",
    "text-black bg-white",
    "text-white bg-red-600",
    "text-red-600 bg-white",
    "text-black bg-red-600",
  ]

  const randomFrom = (arr: string | any[]) => arr[Math.floor(Math.random() * arr.length)]

  const downloadImage = async () => {
    if (!graffitiRef.current) return
    const dataUrl = await toPng(graffitiRef.current, {
      backgroundColor: "transparent",
      pixelRatio: 2, // sharp export
    })
    const link = document.createElement("a")
    link.download = "graffiti.png"
    link.href = dataUrl
    link.click()
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 space-y-8 p-6">
      
      {/* Graffiti target with padding to prevent clipping */}
      <div ref={graffitiRef} className="bg-transparent p-8">
        <h1 className="flex flex-wrap gap-2 text-6xl font-bold">
          {text.split("").map((char, i) => {
            if (char === " ") return <span key={i} className="w-6"></span>
            const rotation = randomFrom(rotations)
            return (
              <span
                key={i + "-" + seed}
                className={`${randomFrom(fonts)} ${randomFrom(colorCombos)} px-2 inline-block`}
                style={{ transform: `rotate(${rotation}deg)` }}
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

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setSeed(seed + 1)}
          className="px-6 py-2 bg-black text-white rounded-lg font-bold shadow-md hover:bg-red-600 transition"
        >
          Refresh Graffiti
        </button>

        <button
          onClick={downloadImage}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold shadow-md hover:bg-black transition"
        >
          Download PNG
        </button>
      </div>
    </div>
  )
}

export default App
