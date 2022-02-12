import { Button } from '@material-ui/core'
import { Container, Typography } from '@mui/material'
import React from 'react'
import request from '../../api'

interface MessagesProps{
  
    req:{
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
    },
    token: string| null
}


const MessageReq = ({req, token}: MessagesProps) => {

  const handleAccept = () => {
    const dataTemp = {
      potluck_id:req.potluck_id,
      person_id: req.attendee_id,
      username:req.attendee_username,
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

    request.delete(`/messages/${req.message_id}`, {
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
    request.delete(`/messages/${req.message_id}`, {
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
      {req.attendee_username} wants to attend {req.event_name}
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

export default MessageReq