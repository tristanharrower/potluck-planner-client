import React, { useState } from 'react';
import './_auth.css'
import Login from './Login';
import { useNavigate } from 'react-router-dom';

import request from '../../../src/api';
import Register from './Register';

interface AuthProps {
  setIsLoggedIn:Function,
  setUser:Function,
}

interface IFormValues {
  username:string,
  password:string
}



const Auth = ({setIsLoggedIn, setUser}: AuthProps) => {

  const navigate = useNavigate()

  const [formValues, setFormValues] = useState<IFormValues>({username:'',password:''})
  const [errorText, setErrorText] = useState<string>('')
  const [login, setLogin] = useState<boolean>(true)

  const updateForm = (inputName:string, inputValue:string) => {
    setFormValues({...formValues, [inputName]:inputValue})
  }

  const submitForm = () => {
  
      if(!formValues.username || !formValues.password){
  
        setErrorText('Please input Username and Password')
      } else {
        let authType = '';
        if(login){
          authType = 'login'
        } else {
          authType = 'register'
        }
       
        request.post(`/authorization/${authType}`, {
          username:formValues.username,
          password:formValues.password
        })
        .then((resp:any)=> {
          if(authType==='login'){
            const loggedUser = {
              person_id:resp.data.person_id,
              username:resp.data.username,
              token:resp.data.token
            }
            setUser(loggedUser)
            setIsLoggedIn(true)
            navigate('/')
          }else {
            navigate('/auth')
            setLogin(true)
          }
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
 
  return  <div className='container'>
    <h1 className='text-center'>Potluck Planner</h1>
      
      <div className="auth mb-3 w-50 mx-auto">
      {
        login ? 

        <Login 
        update={updateForm} 
        submitForm={submitForm}
        errorText={errorText}/>
        : 
        <Register 
        update={updateForm} 
        submitForm={submitForm}
        errorText={errorText}/>
      }
      {
        login ?
        <p>Don't have an account yet? Register here! 
          <button className="btn btn-primary " onClick={()=>setLogin(false)}>Register</button>
        </p>
        :
        <p>Already have an account? Login here! 
          <button className="btn btn-primary" onClick={()=>setLogin(true)}>Login</button>
        </p>
      }
      </div>
    </div>
  
};

export default Auth;
