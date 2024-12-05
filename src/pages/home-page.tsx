import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Header } from '@/shared/components/header'
import { PetList } from '@/features/pet/components/pet-list'
import { fetchPets } from '@/features/pet/actions/pet-actions'
import { Container, LinearProgress } from '@mui/material'
import { selectUser } from '@/features/user/slices/auth-slice'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectUser)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchPets())
    }
  }, [dispatch, currentUser])

  useEffect(() => {
    if (currentUser) {
      setIsLoading(false)
    }
  }, [currentUser])

  if (isLoading) {
    return <LinearProgress sx={{ marginTop: -2 }} />
  }

  return (
    <>
      <Header />
      <Container sx={{ marginTop: '35px' }}>
        <PetList />
      </Container>
    </>
  )
}
export default HomePage
