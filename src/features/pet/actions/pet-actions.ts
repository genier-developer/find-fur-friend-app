import { AppDispatch } from '@/app/store'
import {
  addPetToFirebase,
  fetchPetsFromFirebase,
  removePetFromFirebase,
  updatePetToFirebase,
} from '@/features/pet/pet-api'
import { addPet, deletePet, setPets, updatePetName } from '@/features/pet/slices/pet-slice'
import { Pet } from '@/features/pet/pet-types'

export const fetchPets = () => async (dispatch: AppDispatch) => {
  try {
    const pets = await fetchPetsFromFirebase()
    console.log('Successful fetching pets')
    dispatch(setPets(pets))
  } catch (error) {
    console.log('Failed to fetch pets.', error)
  }
}

export const addNewPet = (newPet: Pet) => async (dispatch: AppDispatch) => {
  try {
    const addedPet = await addPetToFirebase(newPet)
    console.log('Successful added pet')
    dispatch(addPet(addedPet))
  } catch (error) {
    console.log('Failed to add new pet.', error)
  }
}

export const removePet = (petId: string) => async (dispatch: AppDispatch) => {
  try {
    await removePetFromFirebase(petId)
    dispatch(deletePet(petId))
  } catch (error) {
    console.log('Failed to remove pet.', error)
  }
}

export const updatePet = (updatedPet: Pet) => async (dispatch: AppDispatch) => {
  try {
    await updatePetToFirebase(updatedPet)
    dispatch(updatePetName(updatedPet))
  } catch (error) {
    console.log('Failed to update pet.', error)
  }
}
