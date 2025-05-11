import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetBreedList = () => {
  const [breeds, setBreeds] = useState([]);
  const [formData, setFormData] = useState({ breed: '' });

  const fetchBreeds = () => {
    axios.get('http://localhost:8080/api/breeds')
      .then(res => setBreeds(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/breeds', formData)
      .then(() => {
        fetchBreeds();
        setFormData({ breed: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (breedId) => {
    axios.delete(`http://localhost:8080/api/breeds/${breedId}`)
      .then(() => fetchBreeds())
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🐶 Pet Breeds</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="breed"
          placeholder="Enter breed name"
          value={formData.breed}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ marginLeft: "10px" }}>Add Breed</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Breed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {breeds.map((breed) => (
            <tr key={breed.breedId}>
              <td>{breed.breedId}</td>
              <td>{breed.breed}</td>
              <td>
                <button onClick={() => handleDelete(breed.breedId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetBreedList;
