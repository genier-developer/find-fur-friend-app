import { createContext } from 'react'
import { User } from 'firebase/auth'

type UserContextType = {
  ownerId: string | null
  user: User | null
}

export const UserContext = createContext<UserContextType>({
  ownerId: null,
  user: null,
})
