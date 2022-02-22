import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import request from '../../api';
import Grid from '@material-ui/core/Grid'
import PeopleIcon from '@mui/icons-material/People';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';


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
    token:string | null,
    user:{
      person_id:number,
      email:string,
      username:string,
      token:string
    },
    food:Array<IFood>,
    setFood:Function,
}
const CardContentDropDown = ({potluckid, token,user,food, setFood}: DropDownProps) => {
  const [guests, setGuests] = useState<Array<IGuests>>([])

  const deleteFood = (potluckid:number, foodid:number) => {
    request.delete(`/potlucks/${potluckid}/foods/${foodid}`, {
      headers: { 
        Authorization: `${token}`
      },
    })
  .then(resp => {
      setFood(food.filter(item=>item.food_id !== foodid))  
  })
  .catch(err => {
      console.log(err)
  })
  }

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



  },[potluckid, token,setFood])



  return  <CardContent>
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Tooltip title="Guests">
         <PeopleIcon/>
         </Tooltip>
      </Grid>
      <Grid container xs={10} direction="row"
  justifyContent="flex-start"
  alignItems="center">
      {
            guests && guests.map(guest => {
              return <Typography key={guest.username}>{guest.username},</Typography>
            })
          }
      </Grid>
      <Grid item xs={2}>
        <Tooltip title="Food">
          <FastfoodIcon/>
        </Tooltip>
      </Grid>
      <Grid container xs={10} direction="column">
      {
            food && food.map(res => {
              if(res.username === user.username){
                return (
                  <Grid container>
                  <Grid item xs={9}>
                    <Typography key={res.food_id}>{res.username} is bringing {res.food_wanted}</Typography>
                  </Grid>
                  <Tooltip title="Delete Food">
                      <DeleteIcon onClick={()=>deleteFood(res.potluck_id,res.food_id)}></DeleteIcon>
                  </Tooltip>
                  </Grid>
                  )
              } else {
                return (
                  <Grid>
                      <Typography key={res.food_id}>{res.username} is bringing {res.food_wanted}</Typography>
                  </Grid>
                 
                )
              }
             
            })
          }
      </Grid>
    </Grid>
</CardContent>;
};

export default CardContentDropDown;
