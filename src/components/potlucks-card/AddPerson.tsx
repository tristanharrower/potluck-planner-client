import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Tooltip } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import request from '../../api';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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
  }

  interface IMessage{
    organizer_id:number,
    attendee_id:number,
    potluck_id:number,
    attendee_username:string,
    type:string
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

export default function BasicModal({user,potluck, setExpanded}:BringFoodProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [message, setMessage] = React.useState<IMessage>({
    organizer_id:potluck.person_id,
    attendee_id:NaN,
    potluck_id:potluck.potluck_id,
    attendee_username:"",
    type:'invite'
  })


  const onChange = (evt:any) => {
    const value = evt.target.value;
  
    setMessage({
      organizer_id:potluck.person_id,
      attendee_id:NaN,
      potluck_id:potluck.potluck_id,
      attendee_username:value,
      type:'invite'
    });
  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console

    
    
    const data = JSON.stringify(message)

    request.post(`/messages`, data, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `${user.token}`
      },
    })
    .then(res =>   {
      handleClose()
      setExpanded(false)
    })
    .catch(err => {
      console.log(err)
    })
    
  }



  return (
    <div>
     <Tooltip title="Invite">
        <PersonAddIcon onClick={handleOpen}/>
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
          <TextField id="outlined-basic" label="Invite:" variant="outlined" onChange={onChange} sx={{m:2}}/>
          <Button variant="outlined" type='submit'>
           Submit
        </Button>
        </Box>
        </form>
      </Modal>
    </div>
  );
}