import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PetDetailsList.css';

const PetDetailsList = () => {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    breed: { breedId: '' },
    petAge: '',
    colour: '',
    description: '',
    imageUrl: ''
  });

  const fetchPets = () => {
    axios
      .get('http://localhost:8080/pets')
      .then(res => setPets(res.data))
      .catch(err => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'breedId') {
      setFormData(prev => ({
        ...prev,
        breed: { breedId: parseInt(value || 0) }
      }));
    } else if (name === 'petAge') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value || 0)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/pets/petadd', formData)
      .then(() => {
        fetchPets();
        setFormData({
          breed: { breedId: '' },
          petAge: '',
          colour: '',
          description: '',
          imageUrl: ''
        });
      })
      .catch(err => console.error("Submit error:", err));
  };

  const handleDelete = (petId) => {
    axios
      .delete(`http://localhost:8080/pets/${petId}`)
      .then(() => fetchPets())
      .catch(err => console.error("Delete error:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🐾 Pet Details</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          name="breedId"
          placeholder="Breed ID"
          value={formData.breed.breedId}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          name="petAge"
          placeholder="Age"
          value={formData.petAge}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="colour"
          placeholder="Color"
          value={formData.colour}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image file name (e.g. dog1.jpg)"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add Pet</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Breed ID</th>
            <th>Age</th>
            <th>Color</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.petId}>
              <td>{pet.petId}</td>
              <td>{pet.breed?.breedId || 'N/A'}</td>
              <td>{pet.petAge}</td>
              <td>{pet.colour}</td>
              <td>{pet.description}</td>
              <td>
                {pet.imageUrl ? (
                  <img
                    src={`http://localhost:8080/${pet.imageUrl}`}
                    alt="Pet"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover'
                    }}
                  />
                ) : 'No image'}
              </td>
              <td>
                <button onClick={() => handleDelete(pet.petId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetDetailsList;
