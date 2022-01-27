import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../../src/api';
import Header from '../header/Header'
import Potlucks from './Potlucks';


interface HomePageProps{
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
    
      request.get(`potlucks`,{
        headers: { Authorization: `${user.token}` },
        params: {
          person_id:user.person_id
        }
      })
      .then((resp) => {
        setPotlucks(resp.data)
      })
      .catch(err => {
        console.log(err.request)
      })

  }, [isLoggedIn, navigate, user.token, user.person_id])

  return <div>
      <Header user={user} setIsLoggedIn={setIsLoggedIn}/>
      
      <Container maxWidth='lg' >
      {
        potlucks.map(potluck => 
         <Potlucks 
          key={potluck.potluck_id}
          potluck={potluck} 
          user={user}
          setIsLoggedIn={setIsLoggedIn}/>
        )
      }
      </Container>
      
  </div>;
};

export default HomePage;
