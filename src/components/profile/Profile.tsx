import React from 'react';

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

const Profile = ({isLoggedIn, setIsLoggedIn, setUser, user}: ProfileProps) => {
    
  return <div>{user.username}</div>;
};

export default Profile;
