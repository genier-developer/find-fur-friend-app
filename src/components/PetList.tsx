import { useAppSelector } from '@/app/hooks'
import { selectPets } from '@/features/petSlice'
import { Pet } from '@/models/Pet'
import { CircularProgress, Container, Grid, Typography } from '@mui/material'

import { PetItem } from './PetItem'

export const PetList = () => {
  const pets = useAppSelector(selectPets)

  const isLoading = useAppSelector(state => state.pet.isLoading)

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Container>
      <Grid alignItems={'center'} container justifyContent={'center'} marginBottom={5} spacing={5}>
        {pets.length === 0 && isLoading && (
          <Grid item textAlign={'center'} xs={12}>
            <Typography sx={{ marginBottom: 2, marginTop: 4 }} variant={'h6'}>
              There is no pets in the shelter.
            </Typography>
          </Grid>
        )}

        <>
          {pets.map((pet: Pet) => (
            <Grid item key={pet.id}>
              <PetItem pet={pet} />
            </Grid>
          ))}
        </>
      </Grid>
    </Container>
  )
}
