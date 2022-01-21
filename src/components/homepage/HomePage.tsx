import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../../src/api';

interface HomePageProps{
  isLoggedIn:boolean,
  setIsLoggedIn:Function,
  setUser:Function,
  user:{
    person_id:number,
    username:string,
    token:string
  }
}

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


const HomePage = ({isLoggedIn, setIsLoggedIn, setUser, user}: HomePageProps) => {

const [potlucks, setPotlucks] = useState<Array<IPotlucks>>([])

const navigate = useNavigate()

  useEffect(()=> {

    if(!isLoggedIn){
      navigate('/auth')
    }
    
      request.get('/potlucks',{
        headers: { Authorization: `${user.token}` }
      })
      .then((resp) => {
        setPotlucks(resp.data)
      })
      .catch(err => {
        console.log(err.request)
      })

  }, [isLoggedIn, navigate, user.token])

  return <div>
      <h1>Home Page Content</h1>
      <p>Username: {user.username}</p>
      <p>ID: {user.person_id}</p>
      <h3>Potlucks: </h3>
      {
        potlucks.map(potluck => 
          <div>
        <p key={potluck.potluck_id}>{potluck.event_name}</p>
        <p key={potluck.potluck_id}>{potluck.event_date}</p>
        </div>)
      }
      
  </div>;
};

export default HomePage;
