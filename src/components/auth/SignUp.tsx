import React, { useState } from 'react'

import { Header } from '@/components/Header'
import { auth } from '@/firebase'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createUserWithEmailAndPassword } from 'firebase/auth'
// import InputLabel from "@mui/material/InputLabel";
// import {OutlinedInput} from "@mui/material";
// import InputAdornment from "@mui/material/InputAdornment";
// import FormControl from '@mui/material/FormControl';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import IconButton from "@mui/material/IconButton";

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      console.log('Signed up user:', user)
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }

  // const [showPassword, setShowPassword] = React.useState(false);
  //
  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  //
  // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     event.preventDefault();
  // };

  return (
    <>
      <Header />
      <form onSubmit={onSubmit}>
        <Card
          elevation={10}
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '35px',
            maxWidth: 250,
            padding: 5,
            textAlign: 'center',
          }}
        >
          <Typography variant={'h5'}>Create an account</Typography>
          <Container sx={{ marginTop: 2 }}>
            <TextField
              id={'outlined-basic-type'}
              onChange={event => setEmail(event.target.value)}
              placeholder={'Enter email'}
              size={'small'}
              sx={{ marginBottom: 2 }}
              type={'email'}
              value={email}
              variant={'outlined'}
            />
            <TextField
              id={'outlined-basic-type'}
              onChange={event => setPassword(event.target.value)}
              placeholder={'Enter password'}
              size={'small'}
              sx={{ marginBottom: 2 }}
              type={'password'}
              value={password}
              variant={'outlined'}
            />
            {/*<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">*/}
            {/*    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="outlined-adornment-password"*/}
            {/*        type={showPassword ? 'text' : 'password'}*/}
            {/*        onChange={(event)=> setPassword(event.target.value)}*/}
            {/*        endAdornment={*/}
            {/*            <InputAdornment position="end">*/}
            {/*                <IconButton*/}
            {/*                    aria-label="toggle password visibility"*/}
            {/*                    onClick={handleClickShowPassword}*/}
            {/*                    onMouseDown={handleMouseDownPassword}*/}
            {/*                    edge="end"*/}
            {/*                >*/}
            {/*                    {showPassword ? <VisibilityOff /> : <Visibility />}*/}
            {/*                </IconButton>*/}
            {/*            </InputAdornment>*/}
            {/*        }*/}
            {/*        label="Password"*/}
            {/*    />*/}
            {/*</FormControl>*/}
            <Button type={'submit'}>Sign Up</Button>
            <Typography>Already have an account?</Typography>
            <Link href={'/login'}>Sign In</Link>
          </Container>
        </Card>
      </form>
    </>
  )
}
