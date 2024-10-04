import React from 'react';

const UserList = ({ users }) => (
  <ul>
    {users.map((user, index) => (
      <li key={index}>
        {user.firstName} {user.lastName} - {user.city}
      </li>
    ))}
  </ul>
);

export default UserList;
