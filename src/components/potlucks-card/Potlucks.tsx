import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardContentDropDown from './CardContentDropDown';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@material-ui/core';
import BringFood from '../food/BringFood'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface OrganizedPotlucksProps{
  potluck:{
      description: string,
      event_date: string,
      event_name: string,
      event_time: string,
      location: string,
      person_id: number,
      potluck_id: number,
      role: string,
      username: string,
  },
  user:{
    person_id:number,
    email:string,
    username:string,
    token:string
  },
  setIsLoggedIn:Function
}

export default function Potlucks({potluck, user, setIsLoggedIn}:OrganizedPotlucksProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //border:'red solid 2px',

  const path = window.location.pathname

  return (
      <Card sx={{ maxWidth: 1, m:1, height:'auto', flexGrow:1}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {(path==='/attending') ? null : user.username.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={potluck.event_name.toUpperCase()}
          subheader={`${potluck.event_date} : ${potluck.event_time}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={require('../../images/food2.jpg')}
          alt="Paella dish"
          sx = {{}}
        />
        <CardContent>
          {
            (path==='/') ? <Typography variant="body2" color="text.secondary">
            Potluck ID: {potluck.potluck_id}
            </Typography> : null
          }
      
          <Typography variant="body2" color="text.secondary">
          {potluck.location.toUpperCase()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {potluck.description}
          </Typography>
        </CardContent>
        <hr></hr>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {(path==='/attending') ?
            null
            : 
            <Tooltip title="Edit Potluck">
                <EditIcon />
            </Tooltip>
          }
          </IconButton>
          <IconButton aria-label="add to favorites">
                <BringFood user={user} potluck={potluck} setExpanded={setExpanded}/>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
       
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContentDropDown potluckid={potluck.potluck_id} 
          token={user.token}/>
        </Collapse>
      </Card>
  );
}