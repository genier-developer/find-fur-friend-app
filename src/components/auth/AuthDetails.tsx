import {useState, useEffect} from "react";
import {auth} from '../../firebase.ts'
import {onAuthStateChanged} from 'firebase/auth'
import {User} from 'firebase/auth';


export const AuthDetails = () => {
    const [userAuth, setUserAuth] = useState<User| null>(null)
    useEffect(()=>{
        const isAuth = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUserAuth(user)
                console.log(isAuth)
            } else {
                setUserAuth(null)
            }
        })
    })
    return (
        <div>
            {
                userAuth ? <p>{`Signed in ${userAuth.email}`}</p> : <></>
            }

        </div>
    );
};
