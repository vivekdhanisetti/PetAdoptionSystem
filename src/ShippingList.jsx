// ShippingList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShippingList.css';
const ShippingList = () => {
  const [shippingData, setShippingData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/shipping')
      .then(response => {
        setShippingData(response.data);
      })
      .catch(error => {
        console.error('Error fetching shipping data:', error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>📦 Shipping Records</h2>
      <table border="1" cellPadding="10" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Shipping ID</th>
            <th>Shipping Date</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {shippingData.map((ship) => (
            <tr key={ship.shippingId}>
              <td>{ship.shippingId}</td>
              <td>{new Date(ship.shippingDate).toLocaleDateString()}</td>
              <td>{ship.phoneNum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingList;
