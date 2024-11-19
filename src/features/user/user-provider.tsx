import React, {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "@/services/firebase";
import {UserContext} from "@/features/user/user-context";

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