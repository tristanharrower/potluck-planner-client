import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import request from '../../api';
import Potlucks from '../potlucks-card/PotlucksCard';

interface AttendingProps{
    isLoggedIn:boolean,
    setIsLoggedIn:Function,
    setUser:Function,
    user:{
      person_id:number,
      email:string,
      username:string,
      token:string
    },
    token:string|null
  }

  interface IAttendingPotlucks{
      potluck_id:number,
      person_id: number,
      username: string,
      description: string,
      event_date: string,
      event_name: string,
      event_time: string,
      location: string,
      role: string,
      
  }

const AttendingPotlucks = ({isLoggedIn, setIsLoggedIn, setUser, user, token}: AttendingProps) => {

  const [attendingPotlucks, setAttendingPotlucks] = useState<Array<IAttendingPotlucks>>([])

  useEffect(()=> {

    request.get('attending-potlucks', {
      headers: { Authorization: `${token}` },
      params: {
        person_id:user.person_id
      }
    })
    .then(resp => {
        setAttendingPotlucks(resp.data)
    })
    .catch(err => {
      console.log(err)
    })

    
  }, [token, user.person_id])
      
  return <div>
      
      <Container >
      {
        attendingPotlucks.map(attendingPotluck => 
          <Potlucks 
          key={attendingPotluck.potluck_id}
          potluck={attendingPotluck} 
          user={user}
          setIsLoggedIn={setIsLoggedIn}/>
        )
      }
      </Container>
  
  </div>;
};

export default AttendingPotlucks;
