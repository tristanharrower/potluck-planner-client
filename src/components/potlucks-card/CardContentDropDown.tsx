import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import request from '../../api';


//food_id,potluck_id,username,food_wanted
interface IFood{
  food_id:number,
  potluck_id:number,
  person_id:number,
  username:string,
  food_wanted:string
}
interface IGuests{
    username: string
}

interface DropDownProps{
    potluckid:number,
    token:string
}
const CardContentDropDown = ({potluckid, token}: DropDownProps) => {
  const [food, setFood] = useState<Array<IFood>>()
  const [guests, setGuests] = useState<Array<IGuests>>()


  useEffect(()=> {
    request.get(`/potlucks/${potluckid}/foods`,{
      headers: { Authorization: `${token}` },
      params:{
        potluck_id:potluckid
      }
    })
    .then(resp => {
      setFood(resp.data)
    })
    .catch(err => {
      console.log(err)
    })


    request.get(`/attending-potlucks`,{
      headers: { Authorization: `${token}` },
      params:{
        potluck_id:potluckid
      }
    })
    .then(resp => {
      setGuests(resp.data)
    })
    .catch(err => {
      console.log(err)
    })



  },[potluckid, token])



  return  <CardContent>
  <Typography paragraph>Method:Update</Typography>
  {
    food && food.map(res => {
      return <Typography key={res.food_id}>Food: {res.food_wanted}</Typography>
    })
  }
  {
    guests && guests.map(guest => {
      return <Typography key={guest.username}>Guests: {guest.username}</Typography>
    })
  }
</CardContent>;
};

export default CardContentDropDown;
