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
import DeletePotluck from './DeletePotluck'
import AddPerson from './AddPerson'
import { Container } from '@mui/material';

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
  potlucks:Array<IPotlucks>,
  setPotlucks:Function,
  user:{
    person_id:number,
    email:string,
    username:string,
    token:string
  },
  token:string | null,
  setIsLoggedIn:Function,
  organizedPotlucks:Array<IPotlucks>,
  setOrganizedPotlucks:Function
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

export default function Potlucks({potluck,user,token,
  setIsLoggedIn,potlucks,setPotlucks,organizedPotlucks,setOrganizedPotlucks}:PotluckCardProps) {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //border:'red solid 2px',


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
          <Container sx={{flexWrap:'none'}}>
        <IconButton aria-label="add to favorites">
            {(potluck.role==='guest') ?
            <div></div>
            :  
            <Tooltip title="Edit Potluck Information" >
                <EditIcon />
            </Tooltip>
          }
          </IconButton>
          <IconButton aria-label="add person">
            {(potluck.role==='guest') ?
            <p></p>
            :  
              <AddPerson potluck={potluck} user={user} 
              setExpanded={setExpanded} token={token}/>
            
          }
          </IconButton>
          <IconButton aria-label="bring food">
                <BringFood user={user} potluck={potluck} 
                setExpanded={setExpanded} token={token}/>
          </IconButton>
          <IconButton aria-label="delete potluck">   
            <DeletePotluck 
            potluck={potluck} 
            potlucks={potlucks}
            setPotlucks={setPotlucks}
            organizedPotlucks={organizedPotlucks}
            setOrganizedPotlucks={setOrganizedPotlucks}
            user={user}
            token={token}/>
          </IconButton>
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
       
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContentDropDown potluckid={potluck.potluck_id} 
          token={token}/>
        </Collapse>
      </Card>
    </Root>
  );
}