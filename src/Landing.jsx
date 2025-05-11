import React from "react";
import "./LandingPage.css";
import cat1 from "./images/cat1.jpeg";
import cat2 from "./images/cat2.jpeg";
import fly from "./images/fly.jpeg";

const LandingPage = () => {
  return (
    <div className="container">
      <header>
        <h1 className="title">🐾 Pet Adoption System 🐾</h1>
        <div className="buttons">
          <button className="btn">Login</button>
          <button className="btn">Sign Up</button>
        </div>
      </header>



      

      <main className="image-grid">
        <img src={fly} alt="Parrot" className="pet-image" />
        <img src={cat2} alt="Cat" className="pet-image" />
        <img src={cat1} alt="Dog" className="pet-image" />
      </main>
    </div>
  );
};

export default LandingPage;
