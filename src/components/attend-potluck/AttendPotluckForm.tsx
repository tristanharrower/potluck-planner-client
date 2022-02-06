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
    <div style={{height:'100vh'}}>
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
            Attend Potluck
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter unique Potluck ID
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="potluck_id"
            name="potluck_id"
            label="Potluck ID"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            onChange={onChange}
          />
        </Grid>
        <Grid container xs={12} 
        alignItems="center"
        justifyContent="center">
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
      </Grid>
    </React.Fragment>
        </Paper>
      </Container>
      </div>
  );
}