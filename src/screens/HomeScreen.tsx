import React from 'react';
import Header from '../components/header/Header';
import OrganizedPotlucks from '../components/organized-potlucks/OrganizedPotlucks';
import AttendingPotlucks from '../components/attend-potluck/AttendingPotlucks';
import { Box } from '@mui/material';



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

