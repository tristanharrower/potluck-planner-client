import { Button, Container } from '@material-ui/core'
import { Typography } from '@mui/material'
import React from 'react'
import request from '../../api'

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
    token:string | null
}

const MessageInv = ({inv, token}: MessagesProps) => {
  
  const handleAccept = () => {
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
      console.log(resp)
    })
    .catch(err => {
      console.log(err.request.response)
    })
  }
  
  const handleDecline = () => {
    request.delete(`/messages/${inv.message_id}`, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
    })
    .then(resp => {
      console.log(resp)
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
      <Button variant="contained" onClick={handleAccept}>
            Accept
      </Button>
      <Button variant="contained" onClick={handleDecline}>
            Decline
      </Button>
    </Container>
      
  )
}

export default MessageInv