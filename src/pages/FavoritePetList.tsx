import { useSelector } from 'react-redux'

import { useAppSelector } from '@/app/hooks'
import { Header } from '@/components/Header'
import { PetItem } from '@/components/PetItem'
import { selectFavoritePets } from '@/features/petSlice'
import { Pet } from '@/models/Pet'
import { Container, Grid, LinearProgress } from '@mui/material'

export const FavoritePetList = () => {
  const favoritePets = useSelector(selectFavoritePets)
  const isLoading = useAppSelector(state => state.pet.isLoading)

  if (isLoading) {
    return <LinearProgress />
  }

  return (
    <>
      <Header />
      <Container sx={{ marginTop: '35px' }}>
        <Grid alignItems={'center'} container justifyContent={'center'} spacing={5}>
          {favoritePets.map((pet: Pet) => (
            <Grid item key={pet.id}>
              <PetItem pet={pet} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
