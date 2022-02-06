import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../api';
import Potlucks from '../potlucks-card/PotlucksCard';


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

const OrganizedPotlucks = ({isLoggedIn, setIsLoggedIn, setUser, user}: HomePageProps) => {

const [potlucks, setPotlucks] = useState<Array<IPotlucks>>([])

const navigate = useNavigate()

  useEffect(()=> {
    
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
      
      <Container maxWidth='sm' >
      {
        (potlucks.length!==0) ?
        potlucks.map(potluck => 
         <Potlucks 
          key={potluck.potluck_id}
          potluck={potluck} 
          user={user}
          setIsLoggedIn={setIsLoggedIn}/>
        )
        : 
        <Typography sx={{color:'white'}}>Help</Typography>
      }
      </Container>
      
  </div>;
};

export default OrganizedPotlucks;
