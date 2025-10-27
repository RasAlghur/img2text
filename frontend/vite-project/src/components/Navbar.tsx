import { useState, type JSX } from "react";
import { FiMenu, FiX, FiGlobe } from "react-icons/fi";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";
import dex from "../assets/dex-screener.png";
import logo from "../images/aimg.png";

export default function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b-2 border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="" className="w-48" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <a
            href="https://what-if.xyz/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gray-500 text-white font-medium transition-colors py-2 px-5 rounded-full"
          >
            <FiGlobe /> Website
          </a>

          <a
            href="https://x.com/i/communities/1981433336192225762"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#00C46C] text-white font-medium transition-colors py-2 px-4 rounded-full"
          >
            <FaXTwitter /> Community
          </a>

          <a
            href="https://dexscreener.com/solana/je9zetanevbcaurewtbwhb9jjeuceuekom3btq4vvgcp"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#111111] text-white font-medium transition-colors py-2 px-4 rounded-full"
          >
            <img src={dex} alt="dexscreener" className="w-5 h-5" /> Dexscreener
          </a>

          <a
            href="https://t.me/whatifpump"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#0088cc] text-white font-medium transition-colors py-2 px-4 rounded-full"
          >
            <FaTelegram /> Telegram
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="text-[#111111] text-3xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className={`px-6 py-6 flex flex-col items-center gap-4 transform transition-transform duration-500 ease-in-out ${
            menuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <a
            href="https://what-if.xyz/"
            target="_blank"
            rel="noreferrer"
            onClick={handleLinkClick}
            className="flex items-center gap-2 bg-gray-500 text-white font-medium transition-colors py-2 px-5 rounded-full"
          >
            <FiGlobe /> Website
          </a>

          <a
            href="https://x.com/i/communities/1981433336192225762"
            target="_blank"
            rel="noreferrer"
            onClick={handleLinkClick}
            className="flex items-center gap-2 bg-[#00C46C] text-white font-medium transition-colors py-2 px-4 rounded-full"
          >
            <FaXTwitter /> Community
          </a>

          <a
            href="https://dexscreener.com/solana/je9zetanevbcaurewtbwhb9jjeuceuekom3btq4vvgcp"
            target="_blank"
            rel="noreferrer"
            onClick={handleLinkClick}
            className="flex items-center gap-2 bg-[#111111] text-white font-medium transition-colors py-2 px-4 rounded-full"
          >
            <img src={dex} alt="dexscreener" className="w-8 h-8" /> Dexscreener
          </a>

          <a
            href="https://t.me/whatifpump"
            target="_blank"
            rel="noreferrer"
            onClick={handleLinkClick}
            className="flex items-center gap-2 bg-[#0088cc] text-white font-medium transition-colors py-2 px-4 rounded-full"
          >
            <FaTelegram /> Telegram
          </a>
        </nav>
      </div>
    </header>
  );
}
