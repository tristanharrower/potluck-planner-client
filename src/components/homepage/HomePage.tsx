import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../../src/api';
import Header from './Header'
import OrganizedPotlucks from './OrganizedPotlucks';


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
    
      request.get(`/user/${user.person_id}/potlucks`,{
        headers: { Authorization: `${user.token}` }
      })
      .then((resp) => {
        console.log(resp.data)
        setPotlucks(resp.data)
      })
      .catch(err => {
        console.log(err.request)
      })

  }, [isLoggedIn, navigate, user.token, user.person_id])

  return <div>
      <Header user={user}/>
      {
        potlucks.map(potluck => 
          <OrganizedPotlucks potluck={potluck}/>
        )
      }
      
  </div>;
};

export default HomePage;
