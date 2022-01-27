import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AvatarIcon from './AvatarIcon';
import { Button } from '@mui/material';

interface IHeader{
    user:{
        person_id:number,
        username:string,
        token:string
      },
      setIsLoggedIn:Function
}



export default function Header({user, setIsLoggedIn}:IHeader) {
  const path = window.location.pathname

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AvatarIcon user={user} setIsLoggedIn={setIsLoggedIn}/>
          <Typography align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Potluck Planner
          </Typography>
          <Button variant="contained" size="small">
            {(path==='/attend') ? 'Attend Potluck' : 'Create Event'}
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}