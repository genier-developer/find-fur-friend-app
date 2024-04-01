import { useEffect } from 'react'

import { useAppDispatch } from '@/app/hooks'
import { Header } from '@/components/Header'
import { PetList } from '@/components/PetList'
import { fetchPets } from '@/features/petSlice'
import { Container } from '@mui/material'

export const HomePage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPets())
  }, [dispatch])

  return (
    <>
      <Header />
      <Container
        sx={{
          marginTop: '35px',
        }}
      >
        <PetList />
      </Container>
    </>
  )
}
