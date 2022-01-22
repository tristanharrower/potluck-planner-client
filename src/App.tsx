import React from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import Auth from './components/authorization/Auth'
import HomePage from './components/homepage/HomePage';
import { useState } from 'react';
import './_app.css'

interface IUser{
  person_id:number,
  username:string,
  token:string
}

function App() {
  const [user, setUser] = useState<IUser>({person_id:NaN, username:'', token:''})
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

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
