import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Tooltip } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { Button, Card, Typography } from '@mui/material';
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
    token:string | null
  }

  interface IMessage{
    organizer_id:number,
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

interface IUser{
  person_id:number,
  email:string,
  username:string,
  token:string
}

export default function BasicModal({user,potluck, setExpanded, token}:BringFoodProps) {
  const [open, setOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [search, setSearch] = React.useState<Array<IUser>>([])
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
    setSearch([])
    setErrorText('')
  } 

  const [message, setMessage] = React.useState<IMessage>({
    organizer_id:potluck.person_id,
    potluck_id:potluck.potluck_id,
    attendee_username:"",
    type:'invite'
  })


  const onChange = (evt:any) => {
    const value = evt.target.value;
  
    setMessage({
      organizer_id:potluck.person_id,
      potluck_id:potluck.potluck_id,
      attendee_username:value,
      type:'invite'
    });
  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console

    request.get(`user`,{
      headers: { Authorization: `${token}` },
      params: {
        username:message.attendee_username
      }
    })
    .then((resp) => {
      if(resp.data.length > 0){
        setSearch(resp.data)
      } else {
          setErrorText('User not found')
      }
    })
    .catch(err => {         
        console.log(err)
    })

  }

 
const handleClick =(user:IUser) => {
    const tempData = {
      organizer_id:message.organizer_id,
      potluck_id:message.potluck_id,
      attendee_username:message.attendee_username,
      attendee_id:user.person_id,
      type:'invite'
    }

    const data = JSON.stringify(tempData)
   
    request.post(`/messages`, data, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
    })
    .then(res =>   {
      handleClose()
      setExpanded(false)
    })
    .catch(err => {
    
      console.log(err.request.response)
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
          <TextField id="outlined-basic" label="Username:" variant="outlined" onChange={onChange} sx={{m:2}}/>
          <Typography>{errorText}</Typography>
          <Button variant="outlined" type='submit'>
           Search
        </Button>
        {
          search.map(sing => {
            return <Card key={sing.person_id} sx={{display:'flex', flexDirection:'row', bgcolor:'secondary.light', m:2, p:3,}}>
              <Typography>Username: {sing.username}</Typography>
              <Typography>Email: {sing.email}</Typography>
              <Button variant='contained' size='small' onClick={()=>handleClick(sing)}>+Invite</Button>
            </Card>
          })
        }
        </Box>
        </form>
      </Modal>
    </div>
  );
}