import React from 'react';

const UserList = ({ users }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th> 
            <th>City</th> 
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td> 
              <td>{user.address.city}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;