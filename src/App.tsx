import React from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import Auth from './components/authorization/Auth'
import HomePage from './components/homepage/HomePage';
import { useState } from 'react';


interface userReqs{
  person_id:number,
  username:string
}

function App() {
  const [user, setUser] = useState<userReqs>({person_id:0, username:''})
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Routes>

      <Route path="/" 
      element={<HomePage 
      isLoggedIn={isLoggedIn} 
      setIsLoggedIn={setIsLoggedIn}
      user={user}
      setUser={setUser}/>}/>

      <Route path="auth" 
      element={<Auth 
      setIsLoggedIn={setIsLoggedIn}
      setUser={setUser}
      />} />

  </Routes>
  );
}

export default App;
