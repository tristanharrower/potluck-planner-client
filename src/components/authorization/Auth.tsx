import React, { useState } from 'react';
import './_auth.css'
import Login from './Login';
import { useNavigate } from 'react-router-dom';

import request from '../../../src/api';


interface AuthProps {
  setIsLoggedIn:Function,
  setUser:Function,
}

interface initialFormValues {
  username:string,
  password:string
}


const Auth = ({setIsLoggedIn, setUser}: AuthProps) => {

  const navigate = useNavigate()

  const [formValues, setFormValues] = useState<initialFormValues>({username:'',password:''})
  const [errorText, setErrorText] = useState<string>('')

  const updateForm = (inputName:string, inputValue:string) => {
    setFormValues({...formValues, [inputName]:inputValue})
  }

  const submitForm = () => {
  
      if(!formValues.username || !formValues.password){
  
        setErrorText('Please input Username and Password')
      } else {
        request.post('/authorization/login', {
          username:formValues.username,
          password:formValues.password
        })
        .then((resp:any)=> {
          
          const loggedUser = {
            person_id:resp.data.person_id,
            username:resp.data.username
          }
          setUser(loggedUser)
          setIsLoggedIn(true)
          navigate('/')
        })
        .catch((err:any) => {
          if(err.request.status === 401){
            setErrorText('Please input a valid username and password or register a new account')
          } else {
            setErrorText('Oops, something went wrong on the server')
          }
          
        })
      }
  }
 
  return  <div>
    <Login 
    update={updateForm} 
    submitForm={submitForm}
    errorText={errorText}/>
  </div>
};

export default Auth;
