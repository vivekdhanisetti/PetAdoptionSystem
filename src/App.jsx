import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import ShippingList from "./ShippingList";
import PetVisibilityList from './PetVisibilityList';
import PetDetailsList from './PetDetailsList'; 
import PetBreedList from './PetBreedList';
import OrderList from './OrderList';
import DeliveryList from './DeliveryList';
import UserManagement from "./UserManagement";

import LandingPage from "./Landing";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🏡 Welcome to Pet Adoption System</h1>
      <p style={{ fontSize: "18px", maxWidth: "600px", margin: "auto", color: "#555" }}>
        Every pet deserves a loving home! 🐾 Our Pet Adoption System helps you find the perfect companion—whether it's a playful puppy, a curious kitten, or a beautiful bird.
      </p>
      <p style={{ fontSize: "18px", maxWidth: "600px", margin: "auto", color: "#555" }}>
        Browse available pets, learn about different breeds, and take the first step toward welcoming a new furry or feathered friend into your family.
      </p>
      <p style={{ fontSize: "18px", maxWidth: "600px", margin: "auto", color: "#555" }}>
        Ready to start your journey? Click below to explore available pets and begin the adoption process!
      </p>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: "#ff9800",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onClick={() => window.location.href = "/pets"}
      >
        🐶 Find Your Pet
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 

         <Route path="/signup" element={<SignUpForm />} /> 
        

        <Route path="/login" element={<LoginForm />} />
        <Route path="/shipping" element={<ShippingList />} />
        <Route path="/visibility" element={<PetVisibilityList />} />
        <Route path="/pets" element={<PetDetailsList />} />
        <Route path="/breeds" element={<PetBreedList />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/deliveries" element={<DeliveryList />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
