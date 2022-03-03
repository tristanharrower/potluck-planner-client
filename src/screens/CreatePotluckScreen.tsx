import React, { useState } from 'react';
import Header from '../components/header/Header';
import CreatePotluckForm from '../components/create-potluck/CreatePotluckForm'
import request from '../api'
import { useNavigate } from 'react-router-dom';

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
  picture:string
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
    },
    token:string | null,
    potlucks:Array<IPotlucks>,
    setPotlucks:Function
  }

    interface IFormValues{
        event_name: string,
        description: string,
        event_date: string,
        event_time: string,
        address:string,
        city:string,
        state:string,
        zip:string,
        picture:string
    }

const CreatePotluck = ({isLoggedIn, setIsLoggedIn, setUser, user, token,potlucks,setPotlucks}: CreatePotluckProps) => {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<IFormValues>({
        event_name: '',
        description: '',
        event_date: '',
        event_time: '',
        address:'',
        city:'',
        state:'',
        zip:'',  
        picture:''  
    })
    const updateForm = (inputName:string, inputValue:string) => {
      setFormValues({...formValues, [inputName]:inputValue})

      console.log(formValues)
    }

    const submitForm = () => {
      const newPotluck = {
        person_id:user.person_id,
        username:user.username,
        description:formValues.description,
        event_name:formValues.event_name,
        event_date:formValues.event_date,
        event_time:formValues.event_time,
        location:`${formValues.address} ${formValues.city} ${formValues.state} ${formValues.zip}`,
        role:'organizer',
        picture:formValues.picture
      }

      let data = JSON.stringify(newPotluck)
      request.post('/potlucks', data, {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
      })
      .then(resp => {
        navigate('/')
      })
      .catch(err => {
        
      })
    }
  return <div style={{height:'160vh'}}>
     <Header 
     user={user} 
     setIsLoggedIn={setIsLoggedIn} 
     token={token}
     potlucks={potlucks}
     setPotlucks={setPotlucks}/>

     <CreatePotluckForm 
     update={updateForm} 
     submit={submitForm}
     setFormValues={setFormValues}
     formValues={formValues}/>
  </div>;
};

export default CreatePotluck;
