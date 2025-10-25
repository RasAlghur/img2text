import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import bimg from '../images/bimg.png';
import '../styles/site.css';

export default function Home(): JSX.Element {
    const navigate = useNavigate();

    const handleConfessClick = () => {
        navigate('/generate', { state: { text: '' } });
    };

    return (
        <div className="site-container">
            <section className="hero">
                <div className="hero-inner">
                    <div className="left-col">
                        <h1 className="title">
                            Anonymous
                            <br />
                            Crypto
                            <br />
                            What if
                        </h1>

                        <p className="subtitle">
                            Share your anonymous what if. Turn your words into a bold image and we’ll post it to the feed.
                        </p>

                        <div className="action-row">
                            <button className="primary-btn" onClick={handleConfessClick}>
                                whatIf
                            </button>
                        </div>
                    </div>

                    <div className="right-col">
                        <div className="tweet-mock">
                            <img src={bimg} alt="whatIf preview" className="tweet-image" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
