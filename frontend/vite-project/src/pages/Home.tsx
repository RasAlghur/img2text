import { type JSX } from "react";
import { useNavigate } from "react-router-dom";
import bimg from "../images/bimg.png";

export default function Home(): JSX.Element {
  const navigate = useNavigate();

  const handleConfessClick = () => {
    navigate("/generate", { state: { text: "" } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#111111]">
            Anonymous Crypto What If
          </h1>

          <p className="text-base sm:text-lg text-[#444444]">
            Share your anonymous what if. Turn your words into a bold image.
          </p>

          <button
            onClick={handleConfessClick}
            className="bg-[#00C46C] text-white font-semibold text-lg px-6 py-3
    rounded-full shadow-lg hover:opacity-90 transition"
          >
            What If
          </button>
        </div>

        {/* Right */}
        <div className="flex justify-center w-full">
          <div
            className="w-full max-w-xs sm:max-w-sm bg-white rounded-2xl p-4 border-4 border-[#1a4d2e]
          shadow-[0_10px_40px_rgba(26,77,46,0.18)] hover:shadow-[0_14px_48px_rgba(26,77,46,0.22)]
          transition-all"
          >
            <img
              src={bimg}
              alt="whatIf preview"
              className="rounded-xl w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
