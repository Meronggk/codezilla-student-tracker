import React, { useState } from 'react';

function RegisterUser() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [region, setRegion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/registerUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, role, region })
    });
    if (response.ok) {
      const user = await response.json();
      alert(`User ${user.name} created!`);
      
      setName('');
      setRole('');
      setRegion('');
    } else {
      alert('Error creating user.');
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Role:
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
        <br />
        <label>
          Region:
          <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register New User</button>
      </form>
    </div>
  );
}

export default RegisterUser;
