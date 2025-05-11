// OrderList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    orderId: '',
    orderDate: '',
    customerName: '',
    petId: '',
  });

  const fetchOrders = () => {
    axios.get('http://localhost:8080/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
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
    axios.post('http://localhost:8080/api/orders', formData)
      .then(() => {
        fetchOrders();
        setFormData({
          orderId: '',
          orderDate: '',
          customerName: '',
          petId: '',
        });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (orderId) => {
    axios.delete(`http://localhost:8080/api/orders/${orderId}`)
      .then(() => fetchOrders())
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Orders</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          name="customerName" 
          placeholder="Customer Name" 
          value={formData.customerName} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="date" 
          name="orderDate" 
          value={formData.orderDate} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="petId" 
          placeholder="Pet ID" 
          value={formData.petId} 
          onChange={handleChange} 
          required 
        />
        <button type="submit" style={{ marginLeft: "10px" }}>Place Order</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Pet ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.orderDate}</td>
              <td>{order.petId}</td>
              <td>
                <button onClick={() => handleDelete(order.orderId)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
