import React from "react";
import heroImage from "./icons_assets/restauranfood.jpg";
import './App.css';
import './Hero.css'


const Hero = () => {
    return (
        <div className="grid-container">
            <div className="text-container">
            <div className="hero-text">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <h3> We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</h3>
            </div>
            <button type="button">Reserve a Table</button>
            </div>
            <div className="hero-image-container">
            <img src={heroImage} alt="Little Lemon Appetizers" className="hero-image" />
            </div>
        </div>
    );
};

export default Hero;