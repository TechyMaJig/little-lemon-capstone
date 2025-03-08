import React from "react";
import logo from "./icons_assets/logo.png";
import Nav from "./Nav";
import './App.css';
import './Header.css'

const Header = () => {
    return (
      <header>
        <img src={logo} className="logo-img" alt="Little Lemon Logo" height="100" />
        <Nav />
      </header>
    );
  };

export default Header;