import {useState, useEffect} from "react";
import {auth} from '../../firebase.ts'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import {User} from 'firebase/auth';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


export const AuthDetails = () => {
    const [userAuth, setUserAuth] = useState<User| null>(null)

    const userSignOut = ()=>{
        signOut(auth).then(()=>{
            console.log('signed out successful')
        }).catch(error => console.log(error))
    }

    useEffect(()=>{
        const isAuth = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUserAuth(user)

                console.log(isAuth)
            } else {
                setUserAuth(null)
            }
        })
        return ()=>isAuth()
    }, [])

    return (
        <div>
            {
                userAuth ? <><Button onClick={userSignOut}>Sign Out</Button><Typography variant={'subtitle1'}>{`Signed in ${userAuth.email}`}</Typography></> : <Typography variant={'subtitle1'}>Not signed yet</Typography>
            }

        </div>
    );
};
