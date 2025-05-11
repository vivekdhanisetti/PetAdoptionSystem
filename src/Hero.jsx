import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="heroContent">
        <h1 className="heroTitle">Find Your Perfect Companion</h1>
        <p className="heroSubtitle">
          Adopt a pet and change a life — theirs and yours. Browse through our wide selection of adorable cats and dogs waiting for a loving home.
        </p>
        <button className="heroButton">Explore Pets</button>
      </div>
      <div className="heroImageContainer">
        <img
          src="https://cdn.pixabay.com/photo/2020/11/18/17/46/dog-5755498_1280.jpg"
          alt="Cute pet"
          className="heroImage"
        />
      </div>
    </section>
  );
};

export default Hero;
