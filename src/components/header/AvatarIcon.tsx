import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';


type Anchor = 'left';

interface AvatarIconProps{
  user:{
    person_id:number,
    username:string,
    token:string
  },
  setIsLoggedIn:Function
}

export default function AvatarIcon({user, setIsLoggedIn}:AvatarIconProps) {
  const [state, setState] = React.useState({
    left: false,
  });

  const matches = useMediaQuery('(min-width:1200px)')
  const path = window.location.pathname

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log(matches)
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      } else if (!matches || (path !== '/')){
        setState({ ...state, [anchor]: open });
      }
    };

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

  

  const list = (anchor: Anchor) => (
    
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItem button key={'Profile'} onClick={navigateProfile} >
            <ListItemIcon>
                <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
      </ListItem>
      <ListItem button key={'Organiz Potluck'} onClick={navigateOrganize} >
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
      </List>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem button key={text} onClick={navigateLogout}>
           <LogoutIcon sx={{}}/>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>

  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>{user.username.charAt(0).toUpperCase()}
          </Avatar>
            </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}