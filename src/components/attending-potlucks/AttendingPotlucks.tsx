import { Container } from '@mui/material';
import React from 'react';
import Header from '../header/Header';

interface AttendingProps{
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

const AttendingPotlucks = ({isLoggedIn, setIsLoggedIn, setUser, user}: AttendingProps) => {

  return <div>
   <Header user={user}/>
      
      <Container maxWidth='lg' >
      <p>Potlucks</p>
      </Container>
  
  </div>;
};

export default AttendingPotlucks;
