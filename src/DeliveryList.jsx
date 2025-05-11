// DeliveryList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [formData, setFormData] = useState({
    deliveryId: '',
    deliveryDate: '',
    address: '',
    deliveryStatus: ''
  });

  const fetchDeliveries = () => {
    axios.get('http://localhost:8080/api/deliveries')
      .then(res => setDeliveries(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/deliveries', formData)
      .then(() => {
        fetchDeliveries();
        setFormData({
          deliveryId: '',
          deliveryDate: '',
          address: '',
          deliveryStatus: ''
        });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (deliveryId) => {
    axios.delete(`http://localhost:8080/api/deliveries/${deliveryId}`)
      .then(() => fetchDeliveries())
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚚 Deliveries</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          name="address" 
          placeholder="Delivery Address" 
          value={formData.address} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="date" 
          name="deliveryDate" 
          value={formData.deliveryDate} 
          onChange={handleChange} 
          required 
        />
        <select 
          name="deliveryStatus" 
          value={formData.deliveryStatus} 
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button type="submit" style={{ marginLeft: "10px" }}>Schedule Delivery</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Delivery ID</th>
            <th>Address</th>
            <th>Delivery Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.deliveryId}>
              <td>{delivery.deliveryId}</td>
              <td>{delivery.address}</td>
              <td>{delivery.deliveryDate}</td>
              <td>{delivery.deliveryStatus}</td>
              <td>
                <button onClick={() => handleDelete(delivery.deliveryId)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList;
