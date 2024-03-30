// features/AuthDetails.tsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectUser, setUser } from '@/features/authSlice'
import { auth } from '@/firebase'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export const AuthDetails = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out successful')
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch(setUser(user))
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <div>
      {user ? (
        <>
          <Button onClick={userSignOut}>Sign Out</Button>
          <Typography variant={'subtitle1'}>{`Signed in ${user.email}`}</Typography>
        </>
      ) : (
        <Typography variant={'subtitle1'}>Not signed yet</Typography>
      )}
    </div>
  )
}
