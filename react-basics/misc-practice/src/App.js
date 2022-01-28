import React, { useState} from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [...prevUsersList,
        {name: uName, age: uAge, id: Math.random().toString()},
      ];
    });
    // when updating new state with setUsersList() we need special function form
    // this is because it relies on the previous state 
    // it relies on previous state because previous state is an empty array or in case there was anything in there previously
  };

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
  // we are passing the userlist component the userslist
}

export default App;
