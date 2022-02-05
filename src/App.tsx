import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Auth from './screens/AuthScreen'
import { useState } from 'react';
import './_app.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AttendingPotlucks from './screens/AttendingScreen';
import Profile from './components/profile/Profile';
import CreatePotluck from './screens/CreatePotluckScreen';
import OrganizedPotlucks from './screens/OrganizedPotlucksScreen';
import AttendPotluck from './screens/AttendPotluckScreen'

interface IUser{
  person_id:number,
  email:string,
  username:string,
  token:string
}

function App() {
  const [user, setUser] = useState<IUser>({person_id:NaN, email:'', username:'', token:''})
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

 

  const navigate = useNavigate()

  useEffect(() => {
    
    if(!isLoggedIn){
      navigate('/auth')
    }
  },[isLoggedIn, navigate])

  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });


  return (
    
    <ThemeProvider theme={theme}>
      <Routes>
    
        <Route path="/" 
        element={<OrganizedPotlucks 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        user={user}
        setUser={setUser}/>}/>

        <Route path="attending" 
        element={<AttendingPotlucks
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setUser={setUser}
        />}/>

      <Route path="attend-potluck" 
        element={<AttendPotluck
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setUser={setUser}
        />}/>

        <Route path="create" 
          element={<CreatePotluck
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

        <Route path="*" 
        element={<Auth 
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        />} />

    </Routes>
  </ThemeProvider>
  );
}

export default App;
