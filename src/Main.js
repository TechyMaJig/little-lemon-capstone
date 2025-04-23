import React from "react";
import bruschetta from "./icons_assets/bruschetta.svg";
import greekSalad from "./icons_assets/greek salad.jpg";
import lemonDessert from "./icons_assets/lemon dessert.jpg";
import cartIcon from "./icons_assets/Basket.svg";
import './App.css';
import './Main.css'

const Main = () => {
    return (
        <main>
            <div class="cards">
                <article class="card">
                    <img
                        src={bruschetta}
                        alt="Bruschetta" />
                    <div class="content">
                    <header>
                        <h2>Bruschetta</h2>
                        <h3 class="price">$5.99</h3>
                    </header>
                        <p>
                            Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.
                        </p>
                    </div>
                    <div class="bottom-bar">
                        <h3>Order for delivery!</h3>
                        <img
                            src={cartIcon}
                            alt="Add to Cart" />
                        </div>
                </article>
                <article class="card">
                    <img
                        src={greekSalad}
                        alt="Greek Salad" />
                    <div class="content">
                    <header>
                        <h2>Greek Salad</h2>
                        <h3 class="price">$12.99</h3>
                    </header>
                        <p>
                        The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with garlic and rosemary croutons. 
                        </p>
                    </div>
                    <div class="bottom-bar">
                        <h3>Order for delivery!</h3>
                        <img
                            src={cartIcon}
                            alt="Add to Cart" />
                        </div>
                </article>
                <article class="card">
                    <img
                        src={lemonDessert}
                        alt="Lemon Dessert" />
                    <div class="content">
                    <header>
                        <h2>Lemon Dessert</h2>
                        <h3 class="price">$5.00</h3>
                    </header>
                        <p>
                        This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.                        </p>
                    </div>
                    <div class="bottom-bar">
                        <h3>Order for delivery!</h3>
                        <img
                            src={cartIcon}
                            alt="Add to Cart" />
                        </div>
                </article>

            </div>

        </main>
    );
};

export default Main;