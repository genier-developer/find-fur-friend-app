import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Header } from '@/components/Header'
import { setUser } from '@/features/authSlice'
import { auth } from '@/firebase'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { OutlinedInput, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import { signInWithEmailAndPassword } from 'firebase/auth'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      dispatch(setUser(user))
      setIsOpen(false)
      navigate('/')
      console.log('Signed in user:', user)
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <>
      {isOpen && (
        <>
          <Header />
          <form onSubmit={signIn}>
            <Card
              elevation={10}
              sx={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '35px',
                maxWidth: 350,
                paddingBottom: 5,
                paddingLeft: 2,
                paddingTop: 5,
                textAlign: 'center',
              }}
            >
              <Typography variant={'h5'}>Sign In</Typography>
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
                  Sign In
                </Button>
                <Typography sx={{ marginBottom: 2, marginTop: 4 }}>
                  Don&apos;t have an account?
                </Typography>
                <Link href={'/signUp'}>Create an account</Link>
              </Container>
            </Card>
          </form>
        </>
      )}
    </>
  )
}
export default SignIn
