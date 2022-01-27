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

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const navigate = useNavigate()
    const navigateAttend = () => {
        navigate('/attend')
    }
    const navigateOrganize = () => {
      navigate('/')
  }
  const navigateLogout = () => {
      setIsLoggedIn(false)
      navigate('/')
  }

  const list = (anchor: Anchor) => (
    <Box
      
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItem button key={'Profile'} >
            <ListItemIcon>
                <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
      </ListItem>
      <ListItem button key={'Organized Potlucks'} onClick={navigateOrganize} >
            <ListItemIcon>
                <EventIcon/>
              </ListItemIcon>
            <ListItemText primary={'Organized Potlucks'} />
      </ListItem>
      <ListItem button key={'Attending Potlucks'} onClick={navigateAttend}>
            <ListItemIcon>
                <DirectionsRunIcon/>
            </ListItemIcon>
            <ListItemText primary={'Attending Potlucks'} />
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