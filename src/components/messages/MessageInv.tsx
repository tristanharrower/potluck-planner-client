import { Button, Container } from '@material-ui/core'
import { Typography } from '@mui/material'
import React from 'react'
import request from '../../api'
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

interface IInvites{
  message_id:number,
  potluck_id:number,
  organizer_id:number,
  username:string,
  attendee_id:number,
  attendee_username:string,
  type:string,
  event_name:string,
  description:string,
  event_date:string,
  event_time:string,
  location:string,
}

interface MessagesProps{
    inv:{
        message_id:number,
        potluck_id:number,
        organizer_id:number,
        username:string,
        attendee_id:number,
        attendee_username:string,
        type:string,
        event_name:string,
        description:string,
        event_date:string,
        event_time:string,
        location:string,
    }
    token:string | null,
    setInvites:Function,
    invites:Array<IInvites>,
    potlucks:Array<IPotlucks>,
    setPotlucks:Function,
    user:{
      person_id:number,
      username:string,
      token:string
    }
}


const MessageInv = ({inv, token, setInvites, invites,setPotlucks,user}: MessagesProps) => {
  
  const handleAccept = (id:number) => {
    const dataTemp = {
      potluck_id:inv.potluck_id,
      person_id: inv.attendee_id,
      username:inv.attendee_username,
      role:'guest'
    }
    let data = JSON.stringify(dataTemp)
    request.post('/attending-potlucks', data, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
    })
    .then(resp => {
      setInvites(invites.filter(item => item.message_id !== id))
      request.get('/attending-potlucks', {
        headers: { Authorization: `${token}` },
        params: {
          person_id:user.person_id
        }
      })
      .then(resp => {
          setPotlucks(resp.data)
      })
      .catch(err => {
        
      })
    })
    .catch(err => {
      
    })

    request.delete(`/messages/${inv.message_id}`, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
    })
    .then(resp => {
      
    })
    .catch(err => {
      
    })


  }
  
  const handleDecline = (id:number) => {
    request.delete(`/messages/${inv.message_id}`, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
    })
    .then(resp => {
      setInvites(invites.filter(item => item.message_id !== id))
    })
    .catch(err => {
      console.log(err.request.response)
    })
  }

  return (
  
      <Container>
      <Typography>
      {inv.username} invites you to attend {inv.event_name}
      </Typography>
      <Button variant="contained" onClick={()=>handleAccept(inv.message_id)}>
            Accept
      </Button>
      <Button variant="contained" onClick={()=>handleDecline(inv.message_id)}>
            Decline
      </Button>
    </Container>
      
  )
}

export default MessageInv