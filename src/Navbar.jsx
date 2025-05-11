import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🐾 Pet Adoption</div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/adopt" style={styles.link}>Adopt a Pet</Link></li>
        <li><Link to="/favorites" style={styles.link}>Favorites</Link></li>
        <li><Link to="/signup" style={styles.link}>Sign In</Link></li> 
        <li><Link to="/login" style={styles.link}>Login</Link></li>
        <li><Link to="/shipping">Shipping</Link></li> 
        <li><Link to="/visibility">Pet Visibility</Link></li>
        <Link to="/pets">Pet Details</Link>
        <Link to="/breeds">Pet Breeds</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/deliveries">Deliveries</Link>



      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: "10px 20px",
    color: "#fff",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ff9800",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "15px",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Navbar;
