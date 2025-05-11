import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ userId: "", userName: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/users");
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/users", form);
    setForm({ userId: "", userName: "", email: "" });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="userId"
          placeholder="User ID"
          value={form.userId}
          onChange={handleChange}
          required
        />
        <input
          name="userName"
          placeholder="User Name"
          value={form.userName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <h3>All Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            {user.userId} - {user.userName} ({user.email})
            <button onClick={() => handleDelete(user.userId)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
