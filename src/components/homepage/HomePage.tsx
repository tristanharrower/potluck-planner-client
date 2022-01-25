import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../../src/api';
import Header from './Header'


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
      <Header user={user}/>
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
