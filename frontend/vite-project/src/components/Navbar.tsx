import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import '../styles/site.css';

export default function Navbar(): JSX.Element {
    return (
        <header className="navbar">
            <div className="left">
                <div className="logo-box">
                    <a href="/" rel="noopener noreferrer">
                        <span className="logo-x">??</span>
                        <span className="logo-text">WhatIf</span>
                    </a>
                </div>
            </div>

            <nav className="nav-right">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="nav-link">twitter</a>
                <a href="https://t.me/" className="nav-link">enquiries</a>
                <Link to="/generate" className="confess-btn">whatif</Link>
            </nav>
        </header>
    );
}
