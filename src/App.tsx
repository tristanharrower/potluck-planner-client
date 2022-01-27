import React from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import Auth from './components/authorization/Auth'
import HomePage from './components/homepage/HomePage';
import { useState } from 'react';
import './_app.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AttendingPotlucks from './components/attending-potlucks/AttendingPotlucksPage';
import Profile from './components/profile/Profile';

interface IUser{
  person_id:number,
  email:string,
  username:string,
  token:string
}

function App() {
  const [user, setUser] = useState<IUser>({person_id:NaN, email:'', username:'', token:''})
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>

        <Route path="/" 
        element={<HomePage 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        user={user}
        setUser={setUser}/>}/>

        <Route path="attend" 
        element={<AttendingPotlucks
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setUser={setUser}
        />}/>

        <Route path="profile" 
        element={<Profile
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setUser={setUser}
        />}/>

        <Route path="auth" 
        element={<Auth 
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        />} />

    </Routes>
  </ThemeProvider>
  );
}

export default App;
