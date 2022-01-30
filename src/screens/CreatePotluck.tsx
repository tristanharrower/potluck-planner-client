import React from 'react';
import Header from '../components/header/Header';

interface CreatePotluckProps{
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

const CreatePotluck = ({isLoggedIn, setIsLoggedIn, setUser, user}: CreatePotluckProps) => {
  return <div>
     <Header user={user} setIsLoggedIn={setIsLoggedIn}/>
  </div>;
};

export default CreatePotluck;
