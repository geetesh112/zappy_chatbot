import React from 'react';
import heroVideo from "../assets/Hero.mp4";

const Hero = ({ onStartChat }) => {
    return (
        <section className="hero-section">
            <div className="video-container">
                <video autoPlay muted loop className="hero-video">
                    <source src={heroVideo} type="video/mp4" />
                </video>
            </div>
            <div className="hero-content">
                <h1>Welcome to ZappyBot</h1>
                <p>Get instant assistance with our AI-powered chatbot<br />Ask anything, anytime!</p>
                <button onClick={onStartChat} className="start-chat-btn">
                    Start Chat
                </button>
            </div>
        </section>
    );
};

export default Hero;
