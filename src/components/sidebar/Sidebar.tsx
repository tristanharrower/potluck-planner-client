import { Grid, List, ListItem, ListItemIcon } from '@mui/material';
import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

interface SidebarProps{
    setIsLoggedIn:Function
}

const Sidebar = ({setIsLoggedIn}:SidebarProps) => {

    const navigate = useNavigate()
    const navigateAttend = () => {
        navigate('/attend-potluck')
    }
    const navigateOrganize = () => {
      navigate('/create')
  }
  const navigateLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('personid')
      setIsLoggedIn(false)
      navigate('/auth')
  }
  const navigateProfile = () => {
    navigate('/')
  }

  const Root = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
   
  }));

  return <Root>
    <Grid container xs={12} sx={{bgcolor:'secondary.light', height:'100vh', width:'220px'}}>
      <List >
        <ListItem button key={'Profile'} onClick={navigateProfile} >
              <ListItemIcon>
                  <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
        </ListItem>
        <ListItem button key={'Organize Potluck'} onClick={navigateOrganize} >
              <ListItemIcon>
                  <EventIcon/>
                </ListItemIcon>
              <ListItemText primary={'Organize Potluck'} />
        </ListItem>
        <ListItem button key={'Attend Potluck'} onClick={navigateAttend}>
              <ListItemIcon>
                  <DirectionsRunIcon/>
              </ListItemIcon>
              <ListItemText primary={'Attend Potluck'} />
        </ListItem>
        <ListItem button key={'Logout'} onClick={navigateLogout}>
          <ListItemIcon>
              <LogoutIcon />
          </ListItemIcon>   
         <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </Grid>
    </Root>
};

export default Sidebar;
