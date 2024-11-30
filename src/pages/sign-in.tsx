import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Header } from '@/shared/components/header'
import { setUser } from '@/features/user/slices/auth-slice'
import { auth } from '@/services/firebase'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { OutlinedInput, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import { signInWithEmailAndPassword } from 'firebase/auth'

const SignIn: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isFormValid = isEmailValid && password.length >= 6

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
        })
      )
      setIsOpen(false)
      navigate('/')
    } catch (error) {
      setError('Invalid email or password. Please try again.')
      console.log(error)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    navigate('/')
  }

  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    textAlign: 'center',
  }

  return (
    <>
      <Header />
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={modalStyle}>
          <form onSubmit={signIn}>
            <Typography variant="h5">Sign In</Typography>
            <Container sx={{ marginTop: 2 }}>
              <FormControl size="small" sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  label="Email"
                  onChange={event => setEmail(event.target.value)}
                  type="email"
                />
                {!isEmailValid && email && (
                  <Typography color="error" variant="caption">
                    Please enter a valid email.
                  </Typography>
                )}
              </FormControl>
              <FormControl size="small" sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  label="Password"
                  onChange={event => setPassword(event.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {password && password.length < 6 && (
                  <Typography color="error" variant="caption">
                    Password must be at least 6 characters.
                  </Typography>
                )}
              </FormControl>

              {error && (
                <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                sx={{ marginTop: 2 }}
                type="submit"
                variant="contained"
                disabled={!isFormValid}
              >
                Sign In
              </Button>
              <Typography sx={{ marginBottom: 1, marginTop: 4 }}>
                Don&apos;t have an account?
              </Typography>
              <Link href="/signup">Create an account</Link>
            </Container>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default SignIn
