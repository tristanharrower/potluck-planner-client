import React, { useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import request from '../../api';
import MessageReq from './MessageReq';
import MessageInv from './MessageInv'
import { Box } from '@mui/material';

interface NotificationProps{
    user:{
        person_id:number,
        username:string,
        token:string
      },
      token:string | null,

}

interface IRequests{
    message_id:number,
    potluck_id:number,
    organizer_id:number,
    username:string,
    attendee_id:number,
    attendee_username:string,
    type:string,
    event_name:string,
    description:string,
    event_date:string,
    event_time:string,
    location:string,
}

interface IInvites{
    message_id:number,
    potluck_id:number,
    organizer_id:number,
    username:string,
    attendee_id:number,
    attendee_username:string,
    type:string,
    event_name:string,
    description:string,
    event_date:string,
    event_time:string,
    location:string,
}



export default function Notifications({user,token}:NotificationProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [requests, setRequests] = React.useState<Array<IRequests>>([])
  const [invites, setInvites] = React.useState<Array<IInvites>>([])
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    request.get(`messages`,{
        headers: { Authorization: `${token}` },
        params: {
          organizer_id:user.person_id
        }
      })
      .then((resp) => {
        setRequests(resp.data)
      })
      .catch(err => {         
            
      })

      request.get(`messages`,{
        headers: { Authorization: `${token}` },
        params: {
          attendee_id:user.person_id
        }
      })
      .then((resp) => {
        setInvites(resp.data)
      })
      .catch(err => {         
        
      })
  }, [user.person_id, token, setInvites, setRequests])



    
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color:'secondary.light important!'}}
      >
          <Badge badgeContent={requests.length + invites.length} color="error">
        <NotificationsIcon sx={{color:'white'}}/>
      </Badge>
   
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box   sx={{ display: 'flex', flexDirection:'column' }}>
        {
              requests && requests.map(req => {
                  if(req.type==='request'){
                    return <MenuItem key={req.potluck_id}onClick={handleClose}>
                                <MessageReq 
                                req={req} 
                                token={token} 
                                setRequests={setRequests}
                                requests={requests}/>
                        </MenuItem> 
                  } else {
                      return null
                  }
              })
          }
         {
              invites && invites.map(inv => {
                  if(inv.type==='invite'){
                    return <MenuItem key={inv.potluck_id} onClick={handleClose}>
                                <MessageInv 
                                inv={inv} 
                                token={token} 
                                setInvites={setInvites}
                                invites={invites}/>
                        </MenuItem> 
                  } else {
                      return null
                  }
              
              })
          }
        </Box>
          
      </Menu>
      </div>
  )
}