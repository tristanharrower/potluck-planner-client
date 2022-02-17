import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';
import  DatePicker from './DatePicker'


interface CreatePotluckFormProps{
   update:Function,
   submit:Function,
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

export default function CreatePotluckForm({update, submit, setFormValues, formValues}:CreatePotluckFormProps) {

  const onChange = (evt:any) => {
    const name = evt.target.name;
  
    const value = evt.target.value;
  
    update(name, value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    submit()
  }


  return (
    <div>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar >
          <Typography variant="h6" color="inherit" noWrap>
            Create Potluck
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <React.Fragment>
      <Typography variant="h6" sx={{mb:1}}>
        Potluck Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <DatePicker setFormValues={setFormValues} formValues={formValues}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="event_name"
            name="event_name"
            label="Event Name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="outlined"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="state"
            name="state"
            label="State"
            fullWidth
            variant="outlined"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="outlined"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            autoComplete="shipping description"
            variant="outlined"
            onChange={onChange}
          />
        </Grid>
        <Grid container  
        alignItems="center"
        justifyContent="center">
          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, color:'' }}
            >
              <Typography sx={{color:'#FFFF'}}>
                  Create
              </Typography>
              
            </Button>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
        </Paper>
      </Container>
      </div>
  );
}