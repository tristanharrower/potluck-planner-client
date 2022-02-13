import React from 'react';
import Header from '../components/header/Header';
import OrganizedPotlucks from '../components/organized-potlucks/OrganizedPotlucks';
import AttendingPotlucks from '../components/attend-potluck/AttendingPotlucks';
import { Box } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

interface IPotlucks{
  description: string,
  event_date: string,
  event_name: string,
  event_time: string,
  location: string,
  person_id: number,
  potluck_id: number,
  role: string,
  username: string,
}

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
    token:string | null,
    potlucks:Array<IPotlucks>,
    setPotlucks:Function,
    organizedPotlucks:Array<IPotlucks>,
    setOrganizedPotlucks:Function
  }

const HomeScreen = ({isLoggedIn, setIsLoggedIn, setUser, user, token,potlucks,setPotlucks,organizedPotlucks,setOrganizedPotlucks}: ProfileProps) => {
 

  return <div>
       <Header 
       user={user} 
       setIsLoggedIn={setIsLoggedIn} 
       token={token}
       potlucks={potlucks}
       setPotlucks={setPotlucks}
       />
      <Box sx={{display:'flex', justifyContent: 'space-evenly',width:1,}}>
        <Sidebar setIsLoggedIn={setIsLoggedIn}/>
        <Box sx={{display:'flex', justifyContent: 'space-evenly',width:1, flexFlow:'row wrap'}}>
          <OrganizedPotlucks 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            setUser={setUser}
            token={token}
            organizedPotlucks={organizedPotlucks}
            setOrganizedPotlucks={setOrganizedPotlucks}
            />

          <AttendingPotlucks
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            setUser={setUser}
            token={token}
            potlucks={potlucks}
            setPotlucks={setPotlucks}
            organizedPotlucks={organizedPotlucks}
            setOrganizedPotlucks={setOrganizedPotlucks}
            />
        </Box>
      </Box>
      </div>;
};

export default HomeScreen;

