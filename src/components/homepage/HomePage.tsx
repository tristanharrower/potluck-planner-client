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
    <div>
      <div data-initials={user.username.charAt(0).toUpperCase()} 
      className='user_icon'></div>
      <h3>Potluck Planner</h3>
    </div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>ID: {user.person_id}</p>
      <hr></hr>
      <h3>Potlucks: </h3>
      <hr></hr>
      {
        potlucks.map(potluck => 
        <div key={potluck.potluck_id}>
          <p>{potluck.role}: {potluck.username}</p>
          <p>Event Name: {potluck.event_name}</p>
          <p>Event Date: {potluck.event_date}</p>
          <hr></hr>
        </div>)
      }
      
  </div>;
};

export default HomePage;
