import { useEffect } from 'react'

import { useAppDispatch } from '@/app/hooks'
import { Header } from '@/components/header'
import { PetList } from '@/components/pet-list'
import { fetchPets } from '@/features/pet-slice'
import { Container } from '@mui/material'

const HomePage = () => {
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
export default HomePage
