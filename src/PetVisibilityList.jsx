// PetVisibilityList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PetVisibilityList = () => {
  const [visibilities, setVisibilities] = useState([]);
  const [formData, setFormData] = useState({
    petId: '',
    visible: false
  });

  // Fetch all pet visibilities
  const fetchData = () => {
    axios.get('http://localhost:8080/api/visibility')
      .then(response => setVisibilities(response.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Submit new visibility
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/visibility', formData)
      .then(() => {
        fetchData();
        setFormData({ petId: '', visible: false });
      })
      .catch(err => console.error(err));
  };

  // Delete visibility
  const handleDelete = (petId) => {
    axios.delete(`http://localhost:8080/api/visibility/${petId}`)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🐾 Pet Visibility Records</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          name="petId"
          placeholder="Pet ID"
          value={formData.petId}
          onChange={handleChange}
          required
        />
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            name="visible"
            checked={formData.visible}
            onChange={handleChange}
          /> Visible
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>Add Visibility</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Pet ID</th>
            <th>Visible</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibilities.map((v) => (
            <tr key={v.petId}>
              <td>{v.petId}</td>
              <td>{v.visible ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleDelete(v.petId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetVisibilityList;
