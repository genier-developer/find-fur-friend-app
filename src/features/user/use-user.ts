import { useContext } from 'react'
import { UserContext } from '../user/user-context'

export const useUser = () => {
  return useContext(UserContext)
}
