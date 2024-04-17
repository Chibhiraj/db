import React, { useState } from 'react';
import axios from 'axios';
const MyForm = () => {
  const [formData, setFormData] = useState({
    ml: '',
    ps: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newUser={
      ml:formData.ml,
      ps:formData.ps
    }
    // axios.post('https://dbbackend-quiv.onrender.com',newUser);
    axios.post("http://localhost:3001", {
      ml: formData.ml,
      ps: formData.ps,
    })
    .then((response) => {
      console.log(response);
    });
    // console.log(formData);
    alert("Success");

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
    </div>
  );
};

export default MyForm;
