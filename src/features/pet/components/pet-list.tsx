import { useSelector } from 'react-redux'

import { useAppSelector } from '@/app/hooks'
import { AlertDialog } from '@/shared/components/alert-dialog'
import { selectUser } from '@/features/user/slices/auth-slice'
import { selectPets } from '@/features/pet/slices/pet-slice'
import { Pet } from '@/features/pet/pet-types'
import { Container, Grid, LinearProgress, Typography } from '@mui/material'

import { PetCard } from './pet-card'
import { FC } from 'react'

export const PetList: FC = () => {
  const pets = useAppSelector(selectPets)
  const currentUser = useSelector(selectUser)

  const isLoading = useAppSelector(state => state.pet.isLoading)

  if (isLoading) {
    return <LinearProgress />
  }

  return (
    <Container>
      <Grid alignItems={'center'} container justifyContent={'center'} marginBottom={5} spacing={5}>
        {pets.length === 0 && (
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
