import React from "react";
import Hero from "../components/Hero";
import bruschetta from "../icons_assets/bruschetta.svg";
import greekSalad from "../icons_assets/greek salad.jpg";
import lemonDessert from "../icons_assets/lemon dessert.jpg";
import cartIcon from "../icons_assets/Basket.svg";
import '../App.css';
import './Homepage.css'

const Homepage = () =>  (
    <div className="homepage-wrapper">
      <Hero />
        <main>
            <div className="cards">
                <article class="card">
                    <img
                        src={bruschetta}
                        alt="Bruschetta" />
                    <div className="content">
                    <header>
                        <h2>Bruschetta</h2>
                        <h3 className="price">$5.99</h3>
                    </header>
                        <p>
                            Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.
                        </p>
                    </div>
                    <div className="bottom-bar">
                        <h3>Order for delivery!</h3>
                        <img
                            src={cartIcon}
                            alt="Add to Cart" />
                        </div>
                </article>
                <article className="card">
                    <img
                        src={greekSalad}
                        alt="Greek Salad" />
                    <div className="content">
                    <header>
                        <h2>Greek Salad</h2>
                        <h3 className="price">$12.99</h3>
                    </header>
                        <p>
                        The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with garlic and rosemary croutons. 
                        </p>
                    </div>
                    <div className="bottom-bar">
                        <h3>Order for delivery!</h3>
                        <img
                            src={cartIcon}
                            alt="Add to Cart" />
                        </div>
                </article>
                <article className="card">
                    <img
                        src={lemonDessert}
                        alt="Lemon Dessert" />
                    <div className="content">
                    <header>
                        <h2>Lemon Dessert</h2>
                        <h3 className="price">$5.00</h3>
                    </header>
                        <p>
                        This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.                        </p>
                    </div>
                    <div className="bottom-bar">
                        <h3>Order for delivery!</h3>
                        <img
                            src={cartIcon}
                            alt="Add to Cart" />
                        </div>
                </article>

            </div>

        </main>
        </div>
);

export default Homepage;
