import React, { useState } from "react";
import "./SignUpForm.css";  // CSS for styling

function SignUpForm() {
  const [username, setUsername] = useState("");  // Username (email)
  const [password, setPassword] = useState("");  // Password
  const [confirmPassword, setConfirmPassword] = useState("");  // Confirm Password
  const [errorMessage, setErrorMessage] = useState("");  // Error message for validation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Create the user object
    const user = {
      username: username,
      password: password,
    };

    try {
      // Send POST request to backend API
      const response = await fetch("http://localhost:8080/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up. Please try again.");
      }

      const result = await response.text(); // Backend response (could be JSON as well)
      alert(result);  // Show result (success or failure)

      // Reset form fields after successful sign up
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setErrorMessage(""); // Clear any error message

    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error signing up. Please try again.");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2 className="signup-header">🌈 Join the PetAdopt Family!</h2>
        <p className="signup-subtext">Create your account and meet your future furry friend 🐶</p>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Display error message if any */}

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            className="signup-input"
            placeholder="📧 Username (Email)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="signup-input"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="signup-input"
            placeholder="🔒 Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
