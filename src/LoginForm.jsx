import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggedIn(true); // Simulate login
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🐾 Welcome Back to PetAdopt</h2>
        <p className="subtitle">Log in to find your furry friend!</p>

        {!loggedIn ? (
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email address" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Log In</button>
          </form>
        ) : (
          <div className="success-message">
            <p>✅ You are now logged in!</p>
            <a href="#" className="continue-link">Continue to Pet Listings →</a>
          </div>
        )}

        <p className="footer-text">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
