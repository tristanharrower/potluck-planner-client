import React from 'react';
import Header from '../components/header/Header';
import OrganizedPotlucks from '../components/organized-potlucks/OrganizedPotlucks';
import AttendingPotlucks from '../components/attend-potluck/AttendingPotlucks';

interface ProfileProps{
    isLoggedIn:boolean,
    setIsLoggedIn:Function,
    setUser:Function,
    user:{
      person_id:number,
      email:string,
      username:string,
      token:string
    }
  }

const HomeScreen = ({isLoggedIn, setIsLoggedIn, setUser, user}: ProfileProps) => {
    
  return <div>
       <Header user={user} setIsLoggedIn={setIsLoggedIn}/>

       <OrganizedPotlucks 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        user={user}
        setUser={setUser}/>

        <AttendingPotlucks
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setUser={setUser}
        />
      
      </div>;
};

export default HomeScreen;

