import { Button, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../api';
import PotluckCard from '../potlucks-card/PotlucksCard';

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

interface HomePageProps{
  isLoggedIn:boolean,
  setIsLoggedIn:Function,
  setUser:Function,
  user:{
    person_id:number,
    email:string,
    username:string,
    token:string
  },
  token:string | null,
  potlucks:Array<IPotlucks>,
  setPotlucks:Function,
  organizedPotlucks:Array<IPotlucks>,
  setOrganizedPotlucks:Function,
}


const OrganizedPotlucks = ({isLoggedIn, setIsLoggedIn, 
  setUser,setPotlucks, user, token,organizedPotlucks,setOrganizedPotlucks}: HomePageProps) => {



const navigate = useNavigate()

  useEffect(()=> {
    
      request.get(`potlucks`,{
        headers: { Authorization: `${token}` },
        params: {
          person_id:user.person_id
        }
      })
      .then((resp) => {
        setOrganizedPotlucks(resp.data)
      })
      .catch(err => {         

      })

  }, [isLoggedIn, navigate, user.person_id, token,setOrganizedPotlucks])

  return <div>
      
      <Container sx={{bgcolor:'secondary.light', borderRadius:5, mt:2}}>
        <Typography align='center' variant="h5" sx={{mt:1,  pt:2}}>
          Organized Potlucks
        </Typography>
      {
        (organizedPotlucks.length!==0) ?
        organizedPotlucks.map(organizedPotluck => 
         <PotluckCard 
          key={organizedPotluck.potluck_id}
          potluck={organizedPotluck} 
          setPotlucks={setPotlucks}
          user={user}
          setIsLoggedIn={setIsLoggedIn}
          token={token}
          organizedPotlucks={organizedPotlucks}
          setOrganizedPotlucks={setOrganizedPotlucks}/>
        )
        : 
        <Button variant='contained'>
          Create Potluck
        </Button>
      }
      </Container>
      
  </div>;
};

export default OrganizedPotlucks;
