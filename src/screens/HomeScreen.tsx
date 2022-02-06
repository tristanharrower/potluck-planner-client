import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import OrganizedPotlucks from '../components/organized-potlucks/OrganizedPotlucks';
import AttendingPotlucks from '../components/attend-potluck/AttendingPotlucks';
import { Box } from '@mui/material';
import request from '../api';



interface ProfileProps{
    isLoggedIn:boolean,
    setIsLoggedIn:Function,
    setUser:Function,
    user:{
      person_id:number,
      email:string,
      username:string,
      token:string
    }, 
    token:string | null
  }

  const potentialId = localStorage.getItem('personid')
  const potentialToken = localStorage.getItem('token')

  /**
   * 
 useEffect(() => {
    request.get(`/user/${potentialId}`, {
      headers: { Authorization:`${potentialToken}` },
    })
    .then(resp => {
      setUser(resp.data[0])
      setIsLoggedIn(true)
    })
    .catch(err => {
      console.log(err)
    })
  }, [setIsLoggedIn, setUser])
   */


const HomeScreen = ({isLoggedIn, setIsLoggedIn, setUser, user, token}: ProfileProps) => {
  

 

  return <div>
       <Header user={user} setIsLoggedIn={setIsLoggedIn}/>

      <Box sx={{display:'flex', justifyContent: 'space-evenly',width:1, flexFlow:'row wrap'}}>
      <OrganizedPotlucks 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        user={user}
        setUser={setUser}
        token={token}/>

        <AttendingPotlucks
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setUser={setUser}
          token={token}
        />
      </Box>

      
      
      </div>;
};

export default HomeScreen;

