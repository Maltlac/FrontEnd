import React, { useState } from 'react';
import Form from './components/Form';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div className="App">
      <h1>Inscription Utilisateur</h1>
      <Form addUser={addUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;
