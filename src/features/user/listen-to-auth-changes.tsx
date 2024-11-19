import { setUser } from '@/features/user/slices/auth-slice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebase'
import { AppDispatch } from '@/app/store'

export const listenToAuthChanges = () => (dispatch: AppDispatch) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      )
    } else {
      dispatch(setUser(null))
    }
  })
}
