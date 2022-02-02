import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import request from '../../api';

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

  interface IFood{
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
  color:'white',
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

  const [food, setFood] = React.useState<IFood>({
    food_wanted:'string',
    username:user.username,
    person_id:user.person_id
  })


  const onChange = (evt:any) => {
    const value = evt.target.value;
  
    setFood({
      food_wanted:value,
      username:user.username,
      person_id:user.person_id
    });
  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    
    const data = JSON.stringify(food)
    console.log(data)

    request.post(`/potlucks/${potluck.potluck_id}/foods`, data, {
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
     <Tooltip title="Add Food">
        <AddIcon onClick={handleOpen}/>
    </Tooltip>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <TextField id="outlined-basic" label="Add Food" variant="outlined" onChange={onChange} sx={{m:2}}/>
          <Button variant="outlined" type='submit'>
           Submit
        </Button>
        </Box>
        </form>
      </Modal>
    </div>
  );
}