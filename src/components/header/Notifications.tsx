import React, { useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

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
  const [invites, setInvites] = React.useState<Array<IRequests>>([])
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {

  }, [])



    
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="secondary"
          sx={{mr:2}}
            >
          <Badge badgeContent={16} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
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
        <MenuItem onClick={handleClose}>Profiledhbchdbchdbchbdchdbchdcd</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </div>
  )
}