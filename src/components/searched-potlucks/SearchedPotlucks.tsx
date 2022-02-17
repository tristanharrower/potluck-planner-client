import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import LockIcon from '@mui/icons-material/Lock';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip } from '@material-ui/core';
import Alert from './Alert';
import { Container } from '@mui/material';
import request from '../../api';


interface PotluckCardProps{
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
  setPotlucks:Function,
  user:{
    person_id:number,
    email:string,
    username:string,
    token:string
  },
  token:string | null,
}


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


const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    width: '420px',
  },
  [theme.breakpoints.up('md')]: {
    width: '550px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '600px',
    
  }
}));

export default function SearchedPotlucks({potluck,setPotlucks,user,token}:PotluckCardProps) {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //border:'red solid 2px',

  let requestData = {
    organizer_id:potluck.person_id,
    attendee_id:user.person_id,
    potluck_id:NaN,
    attendee_username:user.username,
    type:'request'
  }

  const handleRequest = (potluckid:any) => {
        requestData = {
            ...requestData,
            potluck_id:potluckid,
        }

        const data = JSON.stringify(requestData)

        request.post(`/messages`, data, {
            headers: { 
              'Content-Type': 'application/json',
              Authorization: `${token}`
            },
          })
          .then(res =>   {
          
          })
          .catch(err => {
        
          })
  }     


  return (
    <Root>
      <Card sx={{ m:1, height:'auto', flexGrow:1, bgcolor:'primary.dark'}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {(potluck.role==='guest') ? null : user.username.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={potluck.event_name.toUpperCase()}
          subheader={`${potluck.event_date} : ${potluck.event_time}`}
        />

        <CardMedia
          component="img"
          height="320px"
          image={require('../../images/food3.jpg')}
          alt="Paella dish"
          sx = {{backgroundPosition:'center center', 
          textAlign:'center', m:"auto", backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
        />
        <CardContent>
          <Typography variant="body2" >
          {potluck.location.toUpperCase()}
          </Typography>
          <Typography variant="body2">
          {potluck.description}
          </Typography>
        </CardContent>
        <hr></hr>
        <CardActions disableSpacing>
          <Container> 
          <Tooltip title="Request Access">
              <Alert handleRequest={handleRequest} potluck_id={potluck.potluck_id}/>
          </Tooltip>      
               
                
          </Container>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>
    </Root>
  );
}