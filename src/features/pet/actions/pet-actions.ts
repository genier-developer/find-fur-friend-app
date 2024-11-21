import {
  addPetToFirebase,
  fetchPetsFromFirebase,
  removePetFromFirebase,
  updatePetToFirebase,
} from '@/features/pet/pet-api'
import { Pet } from '@/features/pet/pet-types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPets = createAsyncThunk<Pet[], void, { rejectValue: string }>(
  'pet/fetchPets',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchPetsFromFirebase()
    } catch (error) {
      console.error('Error fetching pets:', error)
      return rejectWithValue('Failed to fetch pets')
    }
  }
)

export const addNewPet = createAsyncThunk<Pet, Pet, { rejectValue: string }>(
  'pet/addNewPet',
  async (newPet, { rejectWithValue }) => {
    try {
      const addedPet = await addPetToFirebase(newPet)
      console.log('Pet added successfully:', addedPet)
      return addedPet
    } catch (error) {
      console.error('Failed to add new pet:', error)
      return rejectWithValue('Failed to add new pet')
    }
  }
)

export const removePet = createAsyncThunk<string, string, { rejectValue: string }>(
  'pet/removePet',
  async (petId, { rejectWithValue }) => {
    try {
      await removePetFromFirebase(petId)
      console.log(`Pet with ID ${petId} removed successfully.`)
      return petId
    } catch (error) {
      console.error(`Failed to remove pet with ID ${petId}:`, error)
      return rejectWithValue('Failed to remove pet')
    }
  }
)

export const updatePet = createAsyncThunk<Pet, Pet, { rejectValue: string }>(
  'pet/updatePet',
  async (updatedPet, { rejectWithValue }) => {
    try {
      await updatePetToFirebase(updatedPet)
      console.log('Pet updated successfully:', updatedPet)
      return updatedPet
    } catch (error) {
      console.error('Failed to update pet:', error)
      return rejectWithValue('Failed to update pet')
    }
  }
)
