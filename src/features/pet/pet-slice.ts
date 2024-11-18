import {
  addPetToFirebase,
  fetchPetsFromFirebase,
  removePetFromFirebase,
  updatePetToFirebase,
} from '@/features/pet/pet-api'
import { AppDispatch, RootState } from '@/app/store'
import { Pet, PetState } from '@/features/pet/pet-types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const initialState: PetState = {
  favoritePets: [],
  isLoading: false,
  pets: [],
}

export const fetchPets = () => async (dispatch: AppDispatch) => {
  try {
    const pets = await fetchPetsFromFirebase()

    dispatch(setPets(pets))
  } catch (error) {
    // Handle error
  }
}

export const addNewPet = (newPet: Pet) => async (dispatch: AppDispatch) => {
  try {
    const addedPet = await addPetToFirebase(newPet)

    dispatch(addPet(addedPet))
  } catch (error) {
    // Handle error
  }
}

export const removePet = (petId: string) => async (dispatch: AppDispatch) => {
  try {
    await removePetFromFirebase(petId)
    dispatch(deletePet(petId))
  } catch (error) {
    // Handle error
  }
}

export const updatePet = (updatedPet: Pet) => async (dispatch: AppDispatch) => {
  try {
    await updatePetToFirebase(updatedPet)
    dispatch(updatePetName(updatedPet))
  } catch (error) {
    // Handle error
  }
}

const petSlice = createSlice({
  initialState,
  name: 'pet',
  reducers: {
    addFavoritePet: (state, action: PayloadAction<Pet>) => {
      const isIncluded = state.favoritePets.findIndex(pet => pet.id === action.payload.id) !== -1

      if (!isIncluded) {
        state.favoritePets.push(action.payload)
      }
    },
    addPet: (state, action: PayloadAction<Pet>) => {
      state.pets.push(action.payload)
    },
    deleteFavoritePet: (state, action: PayloadAction<string>) => {
      state.favoritePets = state.favoritePets.filter(pet => pet.id !== action.payload)
    },
    deletePet: (state, action: PayloadAction<string>) => {
      state.pets = state.pets.filter(pet => pet.id !== action.payload)
      state.favoritePets = state.favoritePets.filter(pet => pet.id !== action.payload)
    },
    setPets: (state, action: PayloadAction<Pet[]>) => {
      state.pets = action.payload
    },
    updatePetName: (state, action: PayloadAction<Pet>) => {
      const index = state.pets.findIndex(pet => pet.id === action.payload.id)

      if (index !== -1) {
        state.pets[index] = action.payload
      }
    },
  },
})

export const { addFavoritePet, addPet, deleteFavoritePet, deletePet, setPets, updatePetName } =
  petSlice.actions
export const petReducer = petSlice.reducer
export const selectPets = (state: RootState) => state.pet.pets
export const selectFavoritePets = (state: RootState) => state.pet.favoritePets
