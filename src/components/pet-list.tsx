import { useSelector } from 'react-redux'

import { useAppSelector } from '@/app/hooks'
import { AlertDialog } from '@/components/card/alert-dialog'
import { selectUser } from '@/features/auth-slice'
import { selectPets } from '@/features/pet-slice'
import { Pet } from '@/models/pet-types'
import { CircularProgress, Container, Grid, Typography } from '@mui/material'

import { PetCard } from './card/pet-card'
import { FC } from 'react'

export const PetList: FC = () => {
  const pets = useAppSelector(selectPets)
  const currentUser = useSelector(selectUser)

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
              Luckily there is no one here...
            </Typography>
          </Grid>
        )}
        <>
          {pets.map((pet: Pet) => (
            <Grid item key={pet.id}>
              <PetCard pet={pet} />
            </Grid>
          ))}
          <Grid item>{!currentUser && <AlertDialog />}</Grid>
        </>
      </Grid>
    </Container>
  )
}
