import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Form } from "react-router-dom";

const fakeUsers = [];

function AttendanceForm () {
  const [users, setUsers] = useState(fakeUsers);
useEffect(() => {
  const url = "/api/users/trainee";
const fetchData =  () => {
fetch(url)
.then((res) => res.json())
.then((data) => setUsers(data.map((user) => ({ ...user, attendance: "In Person", note:"" }))));
};
fetchData();
}, []);


  const handleAttendanceChange = (index, value) => {
    const updatedUsers = [...users];
    updatedUsers[index].attendance = value;
    setUsers(updatedUsers);
  };

  const handleNoteChange = (index, value) => {
    const updatedUsers = [...users];
    updatedUsers[index].note = value;
    setUsers(updatedUsers);
  };

  const handleSave = () => {
fetch("/api/attendence", {
  method: "POST",
  headers: { "Content-Type": "application/json",
},
  body: JSON.stringify(users.map((user) => {
return { user_id: user.id, session_id: 1, notes: user.note };
  }
  )),
});

  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Attendance</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>
                <select value={user.attendance} onChange={(e) => handleAttendanceChange(index, e.target.value)}>
                  <option value="in person">In Person</option>
                  <option value="remote">Remote</option>
                  <option value="camera off">Camera Off</option>
                  <option value="left early">Left Early</option>
                </select>
              </td>
              <td><input type="text" value={user.note} onChange={(e) => handleNoteChange(index, e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default AttendanceForm;
