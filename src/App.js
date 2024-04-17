import React, { useEffect, useState } from 'react';
import axios from 'axios';
const MyForm = () => {
  const [formData, setFormData] = useState({
    ml: '',
    ps: ''
  });
  const [users, setUsers] = useState([]);

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
          <li key={user.id}>Username: {user.ml}  password: {user.ps}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyForm;
