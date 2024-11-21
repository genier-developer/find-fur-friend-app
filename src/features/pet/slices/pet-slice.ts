import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Pet, PetState } from '@/features/pet/pet-types'
import { RootState } from '@/app/store'
import { addNewPet, fetchPets, removePet, updatePet } from '@/features/pet/actions/pet-actions'

export const initialState: PetState = {
  favoritePets: [],
  isLoading: false,
  pets: [],
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
  extraReducers: builder => {
    builder
      .addCase(fetchPets.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.isLoading = false
        state.pets = action.payload
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.isLoading = false
        console.error(action.payload) // Логируем ошибку из rejectValue
      })

      .addCase(addNewPet.pending, state => {
        state.isLoading = true
      })
      .addCase(addNewPet.fulfilled, (state, action) => {
        state.isLoading = false
        state.pets.push(action.payload)
      })
      .addCase(addNewPet.rejected, (state, action) => {
        state.isLoading = false
        console.error(action.payload)
      })

      .addCase(removePet.pending, state => {
        state.isLoading = true
      })
      .addCase(removePet.fulfilled, (state, action) => {
        state.isLoading = false
        state.pets = state.pets.filter(pet => pet.id !== action.payload)
      })
      .addCase(removePet.rejected, (state, action) => {
        state.isLoading = false
        console.error(action.payload)
      })

      .addCase(updatePet.pending, state => {
        state.isLoading = true
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.pets.findIndex(pet => pet.id === action.payload.id)
        if (index !== -1) {
          state.pets[index] = action.payload
        }
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.isLoading = false
        console.error(action.payload)
      })
  },
})

export const { addFavoritePet, addPet, deleteFavoritePet, deletePet, setPets, updatePetName } =
  petSlice.actions

export const petReducer = petSlice.reducer
export const selectPets = (state: RootState) => state.pet.pets
export const selectFavoritePets = (state: RootState) => state.pet.favoritePets
