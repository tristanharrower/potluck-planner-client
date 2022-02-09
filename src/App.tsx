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
import CreatePotluck from './screens/CreatePotluckScreen';
import AttendPotluck from './screens/AttendPotluckScreen'
import HomeScreen from './screens/HomeScreen';
import request from './api';

interface IUser{
  person_id:number,
  email:string,
  username:string,
  token:string
}



const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#e9f2f5',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f3fcff',
      main: '#c0c9e8',
      dark: '#8f98b6',
      contrastText: '#000000',
    },
  },
});

function App() {
  const [user, setUser] = useState<IUser>({person_id:NaN, email:'', username:'', token:''})
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
 
  const potentialToken = localStorage.getItem('token')
  const potentialId = localStorage.getItem('personid')
  const navigate = useNavigate()

  useEffect(() => {
    
    if(!potentialId || !potentialToken){
      navigate('/auth')
    }
    request.get(`/user/${potentialId}`, {
      headers: { Authorization:`${potentialToken}` },
    })
    .then(resp => {
      setUser(resp.data[0])
      setIsLoggedIn(true)
      
    })
    .catch(err => {
      if(Object.values(JSON.parse(err.request.response))[0] === 'token invalid'){
        localStorage.removeItem('token')
        localStorage.removeItem('personid')
        navigate('/auth')
      }
    })

    
  },[isLoggedIn, navigate, potentialId, potentialToken])



  return (
    
    <ThemeProvider theme={theme}>
      <Routes>

        <Route path="/" 
        element={<HomeScreen
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setUser={setUser}
          token={potentialToken}
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
