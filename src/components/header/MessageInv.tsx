import React from 'react'

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
}

const MessageInv = ({inv}: MessagesProps) => {
  
  return (
    <div>
        {inv.username} invites you to attend {inv.event_name}
        

    </div>
  )
}

export default MessageInv