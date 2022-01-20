import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {

  const {isLoggedIn, user} = props

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
