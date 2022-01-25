import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Avatar sx={{ bgcolor: deepPurple[500] }}>{user.username.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
          <Typography align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Potluck Planner
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}