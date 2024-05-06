import { useSelector } from 'react-redux'

import { useAppSelector } from '@/app/hooks'
import { Header } from '@/components/Header'
import { PetCard } from '@/components/card/PetCard'
import { selectFavoritePets } from '@/features/petSlice'
import { Pet } from '@/models/Pet'
import { Container, Grid, LinearProgress, Typography } from '@mui/material'

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
          {favoritePets.length > 0 ? (
            favoritePets.map((pet: Pet) => (
              <Grid item key={pet.id}>
                <PetCard isFavorite pet={pet} />
              </Grid>
            ))
          ) : (
            <Typography sx={{ marginBottom: 2, marginTop: 4 }} variant={'h6'}>
              You don&apos;t have any favorites yet
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  )
}
