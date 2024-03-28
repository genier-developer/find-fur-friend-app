import React, {useState} from "react";
import {auth} from '../../firebase.ts'
import { signInWithEmailAndPassword } from 'firebase/auth';
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';

export const SignIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
      event.preventDefault()
      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log("Signed in user:", user);
      } catch (error) {
          console.error("Error signing in:", error);
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
          <Typography variant={"h5"}>Sign In</Typography>
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
              <Button onClick={()=>{}}>Sign In</Button>
              <Typography>Don&apos;t have an account?</Typography>
              <Link href={'/signUp'}>Create an account</Link>
          </Container>
        </Card>
      </form>
      // <form onSubmit={onSubmit}>
      //   <h1>Sign In To Your Account</h1>
      //   <input type={'email'} value={email} placeholder={'Enter email'} onChange={(event)=> setEmail(event.target.value)}/>
      //   <input type={'password'} value={password} placeholder={'Enter password'} onChange={(event)=> setPassword(event.target.value)}/>
      //   <button type={'submit'}>Sign in</button>
      // </form>
  );
};
