import React, { useState } from 'react';
import './_auth.css'
import request from '../../api';
import Login from './Login';
import { useNavigate } from 'react-router-dom';



const initialFormValues = {
  username:'',
  password:''
}

const Auth = (props) => {

  const navigate = useNavigate()

  const {setIsLoggedIn, user, setUser} = props
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errorText, setErrorText] = useState('')

  const updateForm = (inputName, inputValue) => {
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
        .then(resp=> {
          
          const loggedUser = {
            person_id:resp.data.person_id,
            username:resp.data.username
          }
          setUser(loggedUser)
          setIsLoggedIn(true)
          navigate('/')
        })
        .catch(err => {
          console.log(err)
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
