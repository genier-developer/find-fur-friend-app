import { setUser } from '@/features/user/slices/auth-slice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebase'
import { AppDispatch } from '@/app/store'

export const listenToAuthChanges = () => (dispatch: AppDispatch) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log('User detected:', user.uid)
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
        })
      )
    } else {
      console.log('No user detected')
      dispatch(setUser(null))
    }
  })
}
