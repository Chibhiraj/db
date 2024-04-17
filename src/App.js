import React, { useEffect, useState } from 'react';
import axios from 'axios';
const MyForm = () => {
  const [formData, setFormData] = useState({
    ml: '',
    ps: ''
  });
  const [users, setUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({ ml: '', ps: '' });
  const [deletedUserId, setDeletedUserId] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newUser={
      ml:formData.ml,
      ps:formData.ps
    }
    // axios.post('http://localhost:3001',newUser);
    axios.post("https://dbbackend-quiv.onrender.com", {
      ml: formData.ml,
      ps: formData.ps,
    })
    .then((response) => {
      console.log(response);
    });
    console.log(formData);

  };
 
  
  useEffect(() => {
    axios.get("https://dbbackend-quiv.onrender.com")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error.response.data);
      });
  }, []);

  const handleUpdate = (userId) => {
    
    axios.put(`https://dbbackend-quiv.onrender.com/${userId}`, updatedUser)
      .then((response) => {
        console.log("User updated:", response.data);
        
        axios.get("https://dbbackend-quiv.onrender.com")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error.response.data);
          });
      })
      .catch((error) => {
        console.error("Error updating user:", error.response.data);
      });
  };

  const handleDelete = (userId) => {
    
    axios.delete(`https://dbbackend-quiv.onrender.com/${userId}`)
      .then((response) => {
        console.log("User deleted:", response.data);
        
        axios.get("https://dbbackend-quiv.onrender.com")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error.response.data);
          });
      })
      .catch((error) => {
        console.error("Error deleting user:", error.response.data);
      });
  };

  
  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="ml"
            name="ml"
            value={formData.ml}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ps">Email:</label>
          <input
            type="text"
            id="ps"
            name="ps"
            value={formData.ps}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.ml} - {user.ps}
            <button onClick={() => handleUpdate(user._id)}>Update</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Form to update user */}
      <h2>Update User</h2>
      <input
        type="text"
        placeholder="New ML value"
        value={updatedUser.ml}
        onChange={(e) => setUpdatedUser({ ...updatedUser, ml: e.target.value })}
      />
      <input
        type="text"
        placeholder="New PS value"
        value={updatedUser.ps}
        onChange={(e) => setUpdatedUser({ ...updatedUser, ps: e.target.value })}
      />
    </div>
  );
};

export default MyForm;
