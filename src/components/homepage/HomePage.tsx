import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface HomePageProps{
  isLoggedIn:boolean,
  setIsLoggedIn:Function,
  setUser:Function,
  user:{
    person_id:number,
    username:string
  }
}

const HomePage = ({isLoggedIn, setIsLoggedIn, setUser, user}: HomePageProps) => {


  const navigate = useNavigate()

  useEffect(()=> {
    if(!isLoggedIn){
      navigate('/auth')
    }
  }, [isLoggedIn, navigate])

  return <div>
      <p>Home Page Content</p>
      <p>Username: {user.username}</p>
      <p>ID: {user.person_id}</p>
      <p>{isLoggedIn}</p>

  </div>;
};

export default HomePage;
