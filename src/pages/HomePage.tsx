import { useEffect } from 'react'

import { useAppDispatch } from '@/app/hooks'
// import { AddNewPet } from '@/components/AddNewPet'
import { Header } from '@/components/Header'
import { PetList } from '@/components/PetList'
import { fetchPets } from '@/features/petSlice'
import { Container } from '@mui/material'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  // const [isAddNewPetOpen, setIsAddNewPetOpen] = useState(false)

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

      {/*<Container sx={{ marginBottom: 4, marginTop: 4 }}>*/}
      {/*  {isAddNewPetOpen ? (*/}
      {/*    <Container sx={{ marginTop: 14 }}>*/}
      {/*      <AddNewPet onClose={() => setIsAddNewPetOpen(false)} />*/}
      {/*    </Container>*/}
      {/*  ) : (*/}
      {/*    <PetList />*/}
      {/*  )}*/}
      {/*</Container>*/}
    </>
  )
}
