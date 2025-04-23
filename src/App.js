// src/App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./Main";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

