import { ReactNode } from 'react'
import { UserContext } from '@/features/user/user-context'

export const UserProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContext.Provider value={{ ownerId: null, user: null }}>{children}</UserContext.Provider>
  )
}
