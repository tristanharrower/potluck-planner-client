import React, { useEffect, useState } from 'react';
import './_auth.css'
import request from '../../api';


const Auth = (isLoggedIn, setIsLoggedIn) => {

  const initialFormValues = {
    username:'',
    password:''
  }
  const [formValues, setFormValues] = useState(initialFormValues)

  const updateForm = (inputName, inputValue) => {
    setFormValues({...formValues, [inputName]:inputValue})
    console.log(formValues)
  }

  const onChange = evt => {
    const name = evt.target.name;
    
    const value = evt.target.value;

   
    updateForm(name, value);

  }
 
  return  <div className='container'>
    <form>
      <div className="mb-3 w-50 mx-auto">
        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
        <input type="text" name='username' className="form-control" 
        id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>
      </div>
      <div className="mb-3 w-50 mx-auto">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" name='password' className="form-control" 
        id="exampleInputPassword1" onChange={onChange}/>
      </div>
      <div className='text-center'>
      <button type="submit" className="btn btn-primary">Submit</button>
      </div>
      
  </form> 
</div>
};

export default Auth;
