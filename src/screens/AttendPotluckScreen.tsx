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
    const [errorText, setErrorText] = useState('')
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
        if(resp.data.length ===0){
          setErrorText('No potlucks found')
        } else {
          setErrorText('')
          setSearchedPotlucks(resp.data)
        }
        
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

    
      <Container sx={{display:'flex', flexDirection:'column', alignItems:'center', minHeight:'100vh'}}>
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
    searchedPotlucks.length !== 0 
    ? 
     searchedPotlucks.map((potluck:any) => {
        return (
        <SearchedPotlucks 
        key={potluck.potluck_id}
        user={user}
        potluck={potluck}
        setPotlucks = {setSearchedPotlucks}
        token={token}
        />
        )
      })    
      :
      <Typography variant='h4'>
          {errorText}
    </Typography>
    }
    </Container>
    
    
  </div>;
};

export default CreatePotluck;
