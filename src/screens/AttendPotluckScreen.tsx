import React, { useState } from 'react';
import AttendPotluckForm from '../components/attend-potluck/AttendPotluckForm'
import request from '../api'
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';

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
      potluck_id:number,
      person_id:number,
      username:string,
      role:string
    }

const CreatePotluck = ({isLoggedIn, setIsLoggedIn, setUser, user, token,potlucks,setPotlucks}: CreatePotluckProps) => {
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
  </div>;
};

export default CreatePotluck;
