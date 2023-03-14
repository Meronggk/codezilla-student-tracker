import React, { useState } from 'react';
import './Form.css'

const Form = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [attending, setAttending] = useState(false);
    const [notes, setNotes] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { name, attending, notes };
        setUsers([...users, newUser]);
        setName('');
        setAttending(false);
        setNotes('');
    };

    return (
        <div>
            <h2>List of Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Attendance</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.attending ? 'Yes' : 'No'}</td>
                            <td>{user.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <label>
                    Attendance
                    <input type="checkbox" checked={attending} onChange={(event) => setAttending(event.target.checked)} />
                </label>
                <label>
                    Notes:
                    <textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
                </label>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default Form;
