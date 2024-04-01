import { useState } from 'react'

import { useAppSelector } from '@/app/hooks'
import { selectPets } from '@/features/petSlice'
import { Pet } from '@/models/Pet'
import { Container, Grid, LinearProgress, Typography } from '@mui/material'

import { AddNewPet } from './AddNewPet'
import { PetItem } from './PetItem'

export const PetList = () => {
  const pets = useAppSelector(selectPets)

  const isLoading = useAppSelector(state => state.pet.isLoading)
  const [isAddNewPetVisible, setIsAddNewPetVisible] = useState(false)

  if (isLoading) {
    return <LinearProgress />
  }

  return (
    <Container>
      <Grid alignItems={'center'} container justifyContent={'center'} spacing={5}>
        {pets.length === 0 && !isAddNewPetVisible && (
          <Grid item textAlign={'center'} xs={12}>
            <Typography sx={{ marginBottom: 2, marginTop: 4 }} variant={'h6'}>
              There is no pets in the shelter.
            </Typography>
          </Grid>
        )}
        {isAddNewPetVisible ? (
          <AddNewPet
            onClose={() => {
              setIsAddNewPetVisible(false)
            }}
          />
        ) : (
          <>
            {pets.map((pet: Pet) => (
              <Grid item key={pet.id}>
                <PetItem pet={pet} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Container>
  )
}
