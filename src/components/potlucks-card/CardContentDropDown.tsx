import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import request from '../../api';
import Grid from '@material-ui/core/Grid'


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
    <Grid container spacing={2} direction="column"
  justifyContent="space-around"
  alignItems="flex-start">
      <Grid item>
      <Typography>Guests:</Typography>
      {
        guests && guests.map(guest => {
          return <Typography key={guest.username}>{guest.username}</Typography>
        })
      }  
      </Grid>
      <Grid item>
      <Typography>Food: </Typography>
      {
        food && food.map(res => {
          return <Typography key={res.food_id}>{res.food_wanted}</Typography>
        })
      }
    </Grid>
  </Grid>
</CardContent>;
};

export default CardContentDropDown;
