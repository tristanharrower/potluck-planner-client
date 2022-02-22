import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface SignInProps{
    submitForm:Function,
    update:Function,
    errorText:string,
    setLogin:Function
}

export default function SignIn({submitForm, update, errorText, setLogin}: SignInProps) {

    const onChange = (evt:any) => {
        const name = evt.target.name;
      
        const value = evt.target.value;

        update(name, value);
      }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    submitForm()
    
  }
  return (
    
      <Container component="main" maxWidth="xs" sx={{bgcolor:'secondary.main'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h3'>
              Potluck Planner
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
              sx={{bgcolor:'secondary.light', borderRadius:1}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
              sx={{bgcolor:'secondary.light', borderRadius:1}}
            />
             <div className='text-center'>
                <p className='error'>{errorText}</p>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Typography sx={{color:'#FFFF'}}>
              Sign-In
              </Typography>
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={()=>setLogin(false)} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
   
  );
}