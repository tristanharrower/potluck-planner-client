import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';


interface CreatePotluckFormProps{
   update:Function,
   submit:Function,
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function CreatePotluckForm({update, submit}:CreatePotluckFormProps) {

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
    <ThemeProvider theme={darkTheme}>
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
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Create Potluck
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Potluck Information
      </Typography>
      <Grid container spacing={3}>
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
            id="event_date"
            name="event_date"
            label="Event Date"
            fullWidth
            variant="outlined"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            id="event_time"
            name="event_time"
            label="Event Time"
            fullWidth
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
        <form onSubmit={handleSubmit}>
        <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            </form>
      </Grid>
    </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}