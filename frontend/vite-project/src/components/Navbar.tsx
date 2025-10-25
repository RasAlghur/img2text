import { useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#1a4d2e] border-b-4 border-[#ff8c42]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-[#ff8c42] font-black text-3xl leading-none">
            ??
          </span>
          <span className="text-white text-xl font-bold tracking-tight">
            WhatIf
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-white font-medium hover:text-[#ff8c42] transition-colors duration-300"
          >
            twitter
          </a>

          <a
            href="https://t.me/"
            className="text-white font-medium hover:text-[#ff8c42] transition-colors duration-300"
          >
            enquiries
          </a>

          <Link
            to="/generate"
            className="bg-[#ff8c42] text-white font-semibold px-4 py-2 rounded-lg border-2 border-[#ff8c42] hover:bg-white hover:text-[#ff8c42] transition-all duration-300 transform hover:scale-105"
          >
            whatif
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="text-white text-3xl md:hidden transition-transform duration-300 hover:scale-110"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation with Smooth Animations */}
      <div
        className={`
          md:hidden 
          overflow-hidden 
          transition-all 
          duration-500 
          ease-in-out
          ${menuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav
          className={`
            bg-[#1a4d2e] 
            px-6 
            py-8 
            flex 
            flex-col 
            items-center
            gap-4 
            border-t-2 
            border-[#ff8c42]
            transform 
            transition-transform 
            duration-500 
            ease-in-out
            ${menuOpen ? "translate-y-0" : "-translate-y-4"}
          `}
        >
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            onClick={handleLinkClick}
            className="
              text-white 
              font-medium 
              hover:text-[#ff8c42] 
              transition-all 
              duration-300 
              transform 
              hover:translate-x-2
              hover:scale-105
            "
          >
            twitter
          </a>

          <a
            href="https://t.me/"
            onClick={handleLinkClick}
            className="
              text-white 
              font-medium 
              hover:text-[#ff8c42] 
              transition-all 
              duration-300 
              transform 
              hover:translate-x-2
              hover:scale-105
            "
          >
            enquiries
          </a>

          <Link
            to="/generate"
            onClick={handleLinkClick}
            className="
              bg-[#ff8c42] 
              text-white 
              font-semibold 
              px-4 
              py-2 
              rounded-lg 
              border-2 
              border-[#ff8c42] 
              hover:bg-white 
              hover:text-[#ff8c42] 
              transition-all 
              duration-300 
              transform 
              hover:scale-105
              w-fit
            "
          >
            whatif
          </Link>
        </nav>
      </div>
    </header>
  );
}
