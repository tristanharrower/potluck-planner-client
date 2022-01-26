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
    }
}

const OrganizedPotlucks = ({potluck}:OrganizedPotlucksProps) => {

    
  return <div>{potluck.username}</div>;
};

export default OrganizedPotlucks;
