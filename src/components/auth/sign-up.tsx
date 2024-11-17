import React, { useState } from 'react'

import { Header } from '@/components/header'
import { auth } from '@/firebase'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { OutlinedInput } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const SignUp = () => {
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
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

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
            maxWidth: 350,
            padding: 5,
            textAlign: 'center',
          }}
        >
          <Typography variant={'h5'}>Create an account</Typography>
          <Container sx={{ marginTop: 2 }}>
            <FormControl size={'small'} sx={{ m: 1, width: '25ch' }} variant={'outlined'}>
              <InputLabel htmlFor={'outlined-adornment-email'}>Email</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position={'end'}>
                    <IconButton edge={'end'}></IconButton>
                  </InputAdornment>
                }
                id={'outlined-adornment-password'}
                label={'Email'}
                onChange={event => setEmail(event.target.value)}
                type={'email'}
              />
            </FormControl>
            <FormControl size={'small'} sx={{ m: 1, width: '25ch' }} variant={'outlined'}>
              <InputLabel htmlFor={'outlined-adornment-password'}>Password</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position={'end'}>
                    <IconButton
                      aria-label={'toggle password visibility'}
                      edge={'end'}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                id={'outlined-adornment-password'}
                label={'Password'}
                onChange={event => setPassword(event.target.value)}
                type={showPassword ? 'text' : 'password'}
              />
            </FormControl>

            <Button sx={{ marginTop: 2 }} type={'submit'} variant={'contained'}>
              Sign Up
            </Button>
            <Typography sx={{ marginBottom: 2, marginTop: 4 }}>Already have an account?</Typography>
            <Link href={'/login'}>Sign In</Link>
          </Container>
        </Card>
      </form>
    </>
  )
}
export default SignUp
