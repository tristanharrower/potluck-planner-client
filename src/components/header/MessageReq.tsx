import React from 'react'

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
    }
}

const MessageReq = ({req}: MessagesProps) => {
    console.log('here')
  return (
    <div>
        {req.attendee_username} wants to attend {req.event_name}
        
    </div>
  )
}

export default MessageReq