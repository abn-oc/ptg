import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import "./App.css";

function App() {
  const [text, setText] = useState("Take Your Time");
  const [seed, setSeed] = useState(0);
  const graffitiRef = useRef<HTMLDivElement>(null);

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
  ];

  const rotations = [-12, -8, -5, -3, 3, 5, 8, 12];
  const colorCombos = [
    "text-white bg-black",
    "text-black bg-white",
    "text-white bg-red-600",
    "text-red-600 bg-white",
    "text-black bg-red-600",
  ];

  const randomFrom = (arr: number[] | string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const downloadImage = async () => {
    if (!graffitiRef.current) return;
    const dataUrl = await toPng(graffitiRef.current, {
      backgroundColor: "transparent",
      pixelRatio: 2,
    });
    const link = document.createElement("a");
    link.download = "ptg.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen relative overflow-hidden">
      {/* Persona-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-black to-red-800 -z-10"></div>

      {/* Graffiti target */}
      <div
        ref={graffitiRef}
        className="p-10 bg-transparent drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]"
      >
        <h1 className="flex flex-col gap-6 text-6xl font-extrabold text-white">
          {text.split("\n").map((line, lineIndex) => (
            <div key={lineIndex} className="flex flex-wrap gap-3">
              {line.split("").map((char, i) => {
                if (char === " ") return <span key={i} className="w-6"></span>;
                const rotation = randomFrom(rotations);
                const fontSize = `${90 + Math.floor(Math.random() * 30)}%`;
                return (
                  <span
                    key={`${lineIndex}-${i}-${seed}`}
                    className={`${randomFrom(fonts)} ${randomFrom(
                      colorCombos
                    )} px-3 py-1 inline-block border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]`}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      fontSize,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          ))}
        </h1>
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your graffiti... (Enter = new line)"
        className="w-full max-w-md px-4 py-3 border-4 border-black rounded-none bg-white font-bold shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0 mt-6"
        rows={3}
      />

      {/* Buttons */}
      <div className="flex gap-6 mt-6">
        <button
          onClick={() => setSeed(seed + 1)}
          className="px-6 py-3 bg-black text-white border-4 border-red-600 font-extrabold uppercase tracking-wide shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-red-600 hover:text-black transition-all"
        >
          Refresh
        </button>

        <button
          onClick={downloadImage}
          className="px-6 py-3 bg-red-600 text-white border-4 border-black font-extrabold uppercase tracking-wide shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-red-600 transition-all"
        >
          Download
        </button>
      </div>

      {/* GitHub link */}
      <a
        href="https://github.com/abn-oc/ptg"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 text-white font-bold underline hover:text-red-400"
      >
        GitHub
      </a>
    </div>
  );
}

export default App;
