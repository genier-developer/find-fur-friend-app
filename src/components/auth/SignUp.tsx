import React, {useState} from "react";
import {auth} from '../../firebase.ts'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Card from '@mui/material/Card'
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container'
import Link from '@mui/material/Link';


export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Signed up user:", user);
    } catch (error) {
      console.error("Error signing up:", error);
    }

  }
  return(
      <form onSubmit={onSubmit}>
          <Card elevation={10}
                sx={{
                    marginTop: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    maxWidth: 250,
                    padding: 5,
                    textAlign: 'center'
                }}>
              <Typography variant={"h5"}>Create an account</Typography>
              <Container sx={{marginTop: 2}}>
                  <TextField
                      sx={{marginBottom: 2}}
                      type={'email'}
                      id="outlined-basic-type"
                      size="small"
                      placeholder={'Enter email'}
                      variant="outlined"
                      value={email}
                      onChange={(event)=> setEmail(event.target.value)}
                  />
                  <TextField
                      sx={{marginBottom: 2}}
                      type={'password'}
                      id="outlined-basic-type"
                      size="small"
                      placeholder={'Enter email'}
                      variant="outlined"
                      value={password}
                      onChange={(event)=> setPassword(event.target.value)}

                  />
                  <Button onClick={()=>{}}>Sign Up</Button>
                  <Typography >Already have an account?</Typography>
                  <Link href="/login">
                      Sign In
                  </Link>
              </Container>
          </Card>
        {/*<h1>Create an account</h1>*/}
        {/*<input type={'email'} value={email} placeholder={'Enter email'} onChange={(event)=> setEmail(event.target.value)}/>*/}
        {/*<input type={'password'} value={password} placeholder={'Enter password'} onChange={(event)=> setPassword(event.target.value)}/>*/}
        {/*<button type={'submit'}>Sign up</button>*/}
      </form>
  );
};
