import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AvatarIcon from './AvatarIcon';
import Notifications from '../notifications/Notifications';

interface IHeader{
    user:{
        person_id:number,
        username:string,
        token:string
      },
      setIsLoggedIn:Function, 
      token:string | null
}

export default function Header({user, setIsLoggedIn, token}:IHeader) {


  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ flexGrow: 1, bgcolor:'primary.main' }}>
        <Toolbar>
            <AvatarIcon user={user} setIsLoggedIn={setIsLoggedIn}/>
          <Typography align='center' variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Potluck Planner
          </Typography>
          <Notifications user={user} token={token}/>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}