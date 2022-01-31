import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AvatarIcon from './AvatarIcon';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate()
  
  const handleClick = () => {
    if(path==='/attend'){
        navigate('/profile')
    } else {
      navigate('/create')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AvatarIcon user={user} setIsLoggedIn={setIsLoggedIn}/>
          <Typography align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Potluck Planner
          </Typography>
          <Button variant="contained" onClick={handleClick}>
            {(path==='/attend') ? 'Attend Potluck' : 'Create Potluck'}
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}