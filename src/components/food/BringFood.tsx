import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Tooltip } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import request from '../../api';
import FastfoodIcon from '@mui/icons-material/Fastfood';

interface IFood{
  food_id:number,
  potluck_id:number,
  person_id:number,
  username:string,
  food_wanted:string
}

interface BringFoodProps{
    potluck:{
        description: string,
        event_date: string,
        event_name: string,
        event_time: string,
        location: string,
        person_id: number,
        potluck_id: number,
        role: string,
        username: string,
    },
    user:{
      person_id:number,
      email:string,
      username:string,
      token:string
    },
    setExpanded:Function,
    token:string|null,
    food:Array<IFood>,
    setFood:Function,
  }

  interface IFoodInput{
    food_wanted:string,
    username:string,
    person_id:number
  }

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  color:'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display:'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

export default function BasicModal({user,potluck, setExpanded,token,food,setFood}:BringFoodProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [foodInput, setFoodInput] = React.useState<IFoodInput>({
    food_wanted:'string',
    username:user.username,
    person_id:user.person_id
  })


  const onChange = (evt:any) => {
    const value = evt.target.value;
  
    setFoodInput({
      food_wanted:value,
      username:user.username,
      person_id:user.person_id
    });
  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    
    const data = JSON.stringify(foodInput)

    request.post(`/potlucks/${potluck.potluck_id}/foods`, data, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
    })
    .then(res =>   {
      handleClose()

      request.get(`/potlucks/${potluck.potluck_id}/foods`,{
        headers: { Authorization: `${token}` },
        params:{
          potluck_id:potluck.potluck_id
        }
      })
      .then(resp => {
        setFood(resp.data)
      })
      .catch(err => {
        console.log(err)
      })
  
    })
    .catch(err => {
      console.log(err)
    })

    
  }



  return (
    <div>
     <Tooltip title="Add Food">
        <FastfoodIcon onClick={handleOpen}/>
    </Tooltip>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <Typography>{potluck.event_name.toUpperCase()}</Typography>
          <Typography>{`${potluck.event_date} : ${potluck.event_time}`}</Typography>
          <TextField id="outlined-basic" label="Add Food:" variant="outlined" onChange={onChange} sx={{m:2}}/>
          <Button variant="outlined" type='submit'>
           Submit
        </Button>
        </Box>
        </form>
      </Modal>
    </div>
  );
}