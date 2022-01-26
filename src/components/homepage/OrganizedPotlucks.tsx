import React from 'react';

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

const OrganizedPotlucks = ({potluck, user, setIsLoggedIn}:OrganizedPotlucksProps) => {
    
  return <div>
    <p>{potluck.event_name}</p>
    <p>{user.username}</p>
    </div>;
};

export default OrganizedPotlucks;
