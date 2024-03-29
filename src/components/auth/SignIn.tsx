import React, {useState} from "react";
import {auth} from '../../firebase.ts'
import { signInWithEmailAndPassword } from 'firebase/auth';
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import { Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
//
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import InputLabel from "@mui/material/InputLabel";
// import IconButton from "@mui/material/IconButton";

export const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signIn = async (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Signed in user:", user);
        } catch (error) {
            console.error("Error signing in:", error);
        }

    }


    // const [showPassword, setShowPassword] = React.useState(false);
    //
    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    //
    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };

  return(
      <form onSubmit={signIn}>
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
                  placeholder={'Enter password'}
                  variant="outlined"
                  value={password}
                  onChange={(event)=> setPassword(event.target.value)}

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
              <Button type={'submit'}>Sign In</Button>
              <Typography>Don&apos;t have an account?</Typography>
              <Link href={'/signUp'}>Create an account</Link>
          </Container>
        </Card>
      </form>
  );
};
