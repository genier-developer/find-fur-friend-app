import React, { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/services/firebase'

type UserContextType = {
  ownerId: string | null
  user: User | null
}

export const UserContext = createContext<UserContextType>({
  ownerId: null,
  user: null,
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [ownerId, setOwnerId] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setOwnerId(currentUser.uid)
        setUser(currentUser)
      } else {
        setOwnerId(null)
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return <UserContext.Provider value={{ ownerId, user }}>{children}</UserContext.Provider>
}
