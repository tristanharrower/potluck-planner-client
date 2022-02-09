import React, { useState } from 'react';
import Header from '../components/header/Header';
import CreatePotluckForm from '../components/create-potluck/CreatePotluckForm'
import request from '../api'
import { useNavigate } from 'react-router-dom';



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
    token:string | null
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
    }

const CreatePotluck = ({isLoggedIn, setIsLoggedIn, setUser, user, token}: CreatePotluckProps) => {
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
    })
    const updateForm = (inputName:string, inputValue:string) => {
      setFormValues({...formValues, [inputName]:inputValue})
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
        role:'organizer'
      }
      console.log(newPotluck)

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
        console.log(err.request.response)
      })
    }
  return <div style={{height:'100vh'}}>
     <Header user={user} setIsLoggedIn={setIsLoggedIn}/>

     <CreatePotluckForm 
     update={updateForm} 
     submit={submitForm}
     setFormValues={setFormValues}
     formValues={formValues}/>
  </div>;
};

export default CreatePotluck;
