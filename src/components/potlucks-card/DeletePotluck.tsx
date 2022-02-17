import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Container, Tooltip } from '@mui/material';
import request from '../../api';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IPotlucks{
    description: string,
    event_date: string,
    event_name: string,
    event_time: string,
    location: string,
    person_id: number,
    potluck_id: number,
    role: string,
    username: string,
  }

interface DeletePotluckProps{
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
    setPotlucks:Function,
    potlucks:Array<IPotlucks>,
    user:{
      person_id:number,
      email:string,
      username:string,
      token:string
    },
    token:string | null,
    organizedPotlucks:Array<IPotlucks>,
    setOrganizedPotlucks:Function
}

export default function DeletePotluck({potluck, potlucks,setPotlucks, token, setOrganizedPotlucks,user,organizedPotlucks}:DeletePotluckProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 const handleDelete = (potluckid:number,role:string) => {
     if(role==='organizer'){
        request.delete(`/potlucks/${potluckid}`,{
            headers: { Authorization: `${token}` },
        })
        .then(resp => {
            console.log(resp)
            setOrganizedPotlucks(organizedPotlucks.filter(item=>item.potluck_id !== potluckid))
            handleClose()
        })
        .catch(err => {
            console.log(err)
        })
     } else {


         request.delete(`/attending-potlucks/${potluck.potluck_id}`, {
            headers: { 
              Authorization: `${token}`
            },
            data:{
                person_id:user.person_id
            }
          })
        .then(resp => {
            console.log(resp)
            setPotlucks(potlucks.filter(item=>item.potluck_id !== potluckid))
            handleClose()
        })
        .catch(err => {
            console.log(err)
        })
     }
       
  }

  

  return (
    <div>
        <Tooltip title="Delete Potluck">
        <DeleteIcon onClick={handleOpen}></DeleteIcon>
        </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="button" >
            Are you sure you want to delete "{potluck.event_name}" ?
          </Typography>
          <Container sx={{p:1, alignItems:'center', justifyContent:'center'}}>
                <Button sx={{backgroundColor:'red', m:1}} onClick={()=>handleDelete(potluck.potluck_id,potluck.role)}>
                    Delete
                </Button>
                <Button sx={{border:'black solid 1px'}} onClick={handleClose}>
                    Cancel
                </Button>
          </Container>
          
        </Box>
      </Modal>
    </div>
  );
}