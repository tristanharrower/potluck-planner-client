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
    if(path==='/attending'){
        navigate('/attend-potluck')
    } else {
      navigate('/create')
    }
  }

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ flexGrow: 1, bgcolor:'primary.main' }}>
        <Toolbar>
            <AvatarIcon user={user} setIsLoggedIn={setIsLoggedIn}/>
          <Typography align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Potluck Planner
          </Typography>
          {
            (path==='/create' || path==='/attend-potluck') ? null :
            <Button variant="contained" onClick={handleClick} 
            sx={{bgcolor:'secondary.light', color:'primary.main',
            ':hover': {
              bgcolor: 'secondary.main', // theme.palette.primary.main
              color: 'white',
            }
            }}>
            {(path==='/attending') ? 'Attend Potluck' : 'Create Potluck'}
            </Button> 
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}