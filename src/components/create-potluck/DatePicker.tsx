import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import { Grid } from '@mui/material';

interface DatePickerProps{
    setFormValues:Function,
    formValues:{
        event_name: string,
        description: string,
        event_date: string,
        event_time: string,
        address:string,
        city:string,
        state:string,
        zip:string, 
   }
}

export default function BasicDatePicker({setFormValues, formValues}:DatePickerProps) {
  const [date, setDate] = React.useState<string | null>(null);
  const [time, setTime] = React.useState<string | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} >
      
      <Grid item xs={12} sx={{mb:2}}>
      <DatePicker
        label="Date"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
          setFormValues({...formValues, event_date:newValue?.toString().substring(0,15)})
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </Grid>

      <Grid item xs={12}>
      <TimePicker
          label="Time"
          value={time}
          onChange={(newValue) => {
            setTime(newValue);
            setFormValues({...formValues, event_time:newValue?.toString().substring(16,24)})
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
      
    </LocalizationProvider>
    
  );
}