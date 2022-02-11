import React, { useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import request from '../../api';
import MessageReq from './MessageReq';
import MessageInv from './MessageInv'

interface NotificationProps{
    user:{
        person_id:number,
        username:string,
        token:string
      },
      token:string | null
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
            console.log(err)
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
        console.log(err)
      })
  }, [user.person_id, token, setInvites, setRequests])



    
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color:'secondary.light'}}
      >
          <Badge badgeContent={5} color="error">
        <NotificationsIcon />
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
          {
              requests && requests.map(req => {
                  if(req.type==='request'){
                    return <MenuItem key={req.potluck_id}onClick={handleClose}>
                                <MessageReq req={req}/>
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
                                <MessageInv inv={inv}/>
                        </MenuItem> 
                  } else {
                      return null
                  }
              
              })
          }
      </Menu>
      </div>
  )
}