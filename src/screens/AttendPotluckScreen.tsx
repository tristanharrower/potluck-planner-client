import React, { useState } from 'react';
import AttendPotluckForm from '../components/attend-potluck/AttendPotluckForm'
import request from '../api'
import Header from '../components/header/Header';
import SearchedPotlucks from '../components/searched-potlucks/SearchedPotlucks';
import { Container, Typography } from '@mui/material';

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


interface CreatePotluckProps{
    isLoggedIn:boolean,
    setIsLoggedIn:Function,
    setUser:Function,
    user:{
      person_id:number,
      email:string,
      username:string,
      token:string
    }
    token:string | null,
    potlucks:Array<IPotlucks>,
    setPotlucks:Function
  }

    interface IFormValues{
      username:string,
    }

const CreatePotluck = ({isLoggedIn, setIsLoggedIn, setUser, user, token,potlucks,setPotlucks}: CreatePotluckProps) => {
    const [searchedPotlucks, setSearchedPotlucks] = useState([])
  
    const [formValues, setFormValues] = useState<IFormValues>({
      username:user.username,
    })
    const updateForm = (inputName:string, inputValue:string) => {
      setFormValues({...formValues, [inputName]:inputValue})
    }

    const submitForm = () => {

      request.get(`potlucks`,{
        headers: { Authorization: `${token}` },
        params: {
          username:formValues.username
        }
      })
      .then((resp) => {
        console.log(resp.data)
        setSearchedPotlucks(resp.data)
      })
      .catch(err => {         

      })
    }
  return <div>
    <Header 
    user={user} 
    setIsLoggedIn={setIsLoggedIn} 
    token={token}
    potlucks={potlucks}
    setPotlucks={setPotlucks}/>
     <AttendPotluckForm 
     update={updateForm} 
     submit={submitForm}/>

    
      <Container sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
    {
      searchedPotlucks.length !== 0 
      ? 
      <Typography variant='h4'>
        Searched Potlucks
      </Typography>
      : 
      null
    }
  {
      searchedPotlucks.map(potluck => {
        return (
        <SearchedPotlucks 
        user={user}
        potluck={potluck}
        setPotlucks = {setSearchedPotlucks}
        token={token}
        />
        )
        
      })
       
    }
    </Container>
    
    
  </div>;
};

export default CreatePotluck;
