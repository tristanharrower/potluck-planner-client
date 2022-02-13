import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AvatarIcon from './AvatarIcon';
import Notifications from '../messages/Messages';
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

interface IHeader{
    user:{
        person_id:number,
        username:string,
        token:string
      },
      setIsLoggedIn:Function, 
      token:string | null,
      potlucks:Array<IPotlucks>,
      setPotlucks:Function,
}

export default function Header({user, setIsLoggedIn, token,potlucks,setPotlucks}:IHeader) {


  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ flexGrow: 1, bgcolor:'primary.main' }}>
        <Toolbar>
            <AvatarIcon user={user} setIsLoggedIn={setIsLoggedIn}/>
          <Typography align='center' variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Potluck Planner
          </Typography>
          <Notifications 
          user={user} 
          token={token}
          potlucks={potlucks}
          setPotlucks={setPotlucks}/>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}