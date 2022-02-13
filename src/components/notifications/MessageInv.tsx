import { Button, Container } from '@material-ui/core'
import { Typography } from '@mui/material'
import React from 'react'
import request from '../../api'

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
    invites:Array<IInvites>
}


const MessageInv = ({inv, token, setInvites, invites}: MessagesProps) => {
  
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
      console.log(resp)
      setInvites(invites.filter(item => item.message_id !== id))
    })
    .catch(err => {
      console.log(err.request.response)
    })

    request.delete(`/messages/${inv.message_id}`, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
    })
    .then(resp => {
      setTimeout(()=>{
        window.location.reload()
      },1000)
    })
    .catch(err => {
      console.log(err.request.response)
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