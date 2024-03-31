import { useSelector } from 'react-redux'

import { useAppSelector } from '@/app/hooks'
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
    <Container>
      <Grid alignItems={'center'} container justifyContent={'center'} spacing={5}>
        {favoritePets.map((pet: Pet) => (
          <Grid item key={pet.id}>
            <PetItem pet={pet} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
