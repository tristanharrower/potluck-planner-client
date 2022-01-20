import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({isLoggedIn, setIsLoggedIn}) => {
  console.log(isLoggedIn)
  const navigate = useNavigate()
  useEffect(()=> {
    if(!isLoggedIn){
      navigate('/auth')
    }
  }, [isLoggedIn, navigate])

  return <div>
      <p>Home Page Content</p>
      <p>{isLoggedIn}</p>

  </div>;
};

export default HomePage;
