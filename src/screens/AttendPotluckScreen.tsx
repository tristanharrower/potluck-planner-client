import React, { useState } from 'react';
import Header from '../components/header/Header';
import AttendPotluckForm from '../components/attend-potluck/AttendPotluckForm'
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
    }
  }

    interface IFormValues{
      potluck_id:number,
      person_id:number,
      username:string,
      role:string
    }

const CreatePotluck = ({isLoggedIn, setIsLoggedIn, setUser, user}: CreatePotluckProps) => {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<IFormValues>({
      potluck_id:NaN,
      person_id:user.person_id,
      username:user.username,
      role:'guest' 
    })
    const updateForm = (inputName:string, inputValue:string) => {
      setFormValues({...formValues, [inputName]:inputValue})
      console.log(formValues)
    }

    const submitForm = () => {

      let data = JSON.stringify(formValues)
      request.post('/attending-potlucks', data, {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `${user.token}`
        },
      })
      .then(resp => {
        navigate('/attending')
      })
      .catch(err => {
        console.log(err.request.response)
      })
    }
  return <div>
     <Header user={user} setIsLoggedIn={setIsLoggedIn}/>

     <AttendPotluckForm 
     update={updateForm} 
     submit={submitForm}/>
  </div>;
};

export default CreatePotluck;