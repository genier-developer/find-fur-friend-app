import { useDispatch, useSelector } from 'react-redux'

import { selectUser, signOutUser } from '@/features/user/slices/auth-slice'
import { auth } from '@/services/firebase'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { signOut } from 'firebase/auth'

export const AuthDetails = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(signOutUser())
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <Button onClick={userSignOut}>Sign Out</Button>
      <Typography variant={'h6'}>{`Signed in ${user?.email}`}</Typography>
    </div>
  )
}
