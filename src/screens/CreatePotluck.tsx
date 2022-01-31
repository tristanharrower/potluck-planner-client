import React, { useState } from 'react';
import Header from '../components/header/Header';
import CreatePotluckForm from '../components/create-potluck/CreatePotluckForm'

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

  /**
   * "person_id": 1,
        "username": "tristan-harrower",
        "event_name": "tristans second party",
        "description": "party description",
        "event_date": "january 10, 2022",
        "event_time": "6:00pm",
        "location": "columbus",
        "role": "organizer"
   */
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

const CreatePotluck = ({isLoggedIn, setIsLoggedIn, setUser, user}: CreatePotluckProps) => {
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
      console.log(formValues)
    }
  return <div>
     <Header user={user} setIsLoggedIn={setIsLoggedIn}/>

     <CreatePotluckForm 
     update={updateForm} 
     submit={submitForm}/>
  </div>;
};

export default CreatePotluck;
