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
    console.log(user)
  return <div style={{color:'white'}}>{user.username}</div>;
};

export default Profile;
