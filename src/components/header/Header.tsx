import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AvatarIcon from './AvatarIcon';
import { Button } from '@mui/material';

/**
 * <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
 */

interface IHeader{
    user:{
        person_id:number,
        username:string,
        token:string
      }
}

export default function Header({user}:IHeader) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AvatarIcon user={user}/>
          <Typography align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Potluck Planner
          </Typography>
          <Button variant="contained" size="small">Create Event</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}