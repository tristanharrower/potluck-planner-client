import { Button, Container, Typography } from '@mui/material';
import React, { useEffect} from 'react';
import request from '../../api';
import Potlucks from '../potlucks-card/PotlucksCard';

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
    token:string|null,
    potlucks:Array<IPotlucks>,
    setPotlucks:Function,
    organizedPotlucks:Array<IPotlucks>,
    setOrganizedPotlucks:Function
  }
const AttendingPotlucks = ({isLoggedIn, setIsLoggedIn, 
  setUser, user, token,potlucks,setPotlucks,organizedPotlucks,setOrganizedPotlucks}: AttendingProps) => {

  

  useEffect(()=> {

    request.get('attending-potlucks', {
      headers: { Authorization: `${token}` },
      params: {
        person_id:user.person_id
      }
    })
    .then(resp => {
        setPotlucks(resp.data)
    })
    .catch(err => {
      
    })
  }, [token, user.person_id,setPotlucks])
      
  return <div>
      <Container sx={{bgcolor:'secondary.light', borderRadius:5, mt:2}}>
      <Typography align='center' variant="h5" sx={{mt:1, pt:2}}>
          Attending Potlucks
      </Typography>
      {
          (potlucks.length!==0) ?
        potlucks.map(potluck => 
          <Potlucks 
          key={potluck.potluck_id}
          potluck={potluck} 
          user={user}
          setIsLoggedIn={setIsLoggedIn}
          token={token}
          organizedPotlucks={organizedPotlucks}
          setOrganizedPotlucks={setOrganizedPotlucks}
          />
        )
        : 
        <Button variant='contained'>
          Create Potluck
        </Button>
      }
      </Container>
  
  </div>;
};

export default AttendingPotlucks;
