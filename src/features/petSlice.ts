import {
  addPetToFirebase,
  fetchPetsFromFirebase,
  removePetFromFirebase,
  updatePetToFirebase,
} from '@/api/petApi'
import { AppDispatch, RootState } from '@/app/store'
import { Pet, PetState } from '@/models/Pet'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const initialState: PetState = {
  favoritePets: [],
  isLoading: false,
  pets: [],
}

export const fetchPets = () => async (dispatch: AppDispatch) => {
  const pets = await fetchPetsFromFirebase()

  dispatch(setPets(pets))
}

export const addNewPet = (newPet: Pet) => async (dispatch: AppDispatch) => {
  const addedPet = await addPetToFirebase(newPet)

  dispatch(addPet(addedPet))
}

export const removePet = (petId: string) => async (dispatch: AppDispatch) => {
  await removePetFromFirebase(petId)
  dispatch(deletePet(petId))
}

export const updatePet = (updatedPet: Pet) => async (dispatch: AppDispatch) => {
  await updatePetToFirebase(updatedPet)
  dispatch(updatePetName(updatedPet))
}

const petSlice = createSlice({
  initialState,
  name: 'pet',
  reducers: {
    //
    addFavoritePet: (state, action: PayloadAction<Pet>) => {
      const isIncluded = state.favoritePets.find(pet => pet.id === action.payload.id)

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
