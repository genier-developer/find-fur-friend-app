import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {Pet, PetState} from "../models/Pet";

export const initialState: PetState = {
    pets: [],
    favoritePets: [],
    isLoading: false,
};

export const fetchPets = createAsyncThunk('pet/fetchPets', async () => {
    const response = await fetch('http://localhost:3003/pets');
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Failed to fetch pets");
    }
});

const petSlice = createSlice({
    name: 'pet',
    initialState,
    reducers: {
        addPet: (state, action: PayloadAction<Pet>) => {
            state.pets.push(action.payload);
        },
        deletePet: (state, action: PayloadAction<string>) => {
            state.pets = state.pets.filter(pet => pet.id !== action.payload);
        },
        updatePet: (state, action: PayloadAction<Pet>) => {
            const index = state.pets.findIndex((pet) => pet.id === action.payload.id);
            if (index !== -1) {
                state.pets[index] = action.payload;
            }
        },
        addFavoritePet: (state, action: PayloadAction<Pet>) => {
            const isIncluded = state.favoritePets.includes(action.payload.id);

            if (!isIncluded) {
                state.favoritePets.push(action.payload.id);
            }
        },
        deleteFavoritePet: (state, action:  PayloadAction<string>) => {
            console.log({deletedId: action.payload, favorites: state.favoritePets});
            state.favoritePets = state.favoritePets.filter(id => id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pets = action.payload;
            })
            .addCase(fetchPets.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const {addPet, deletePet, updatePet, addFavoritePet, deleteFavoritePet} = petSlice.actions;
export const petReducer = petSlice.reducer;
export const selectPets = (state: RootState) => state.pet.pets;
export const selectFavoritePets = (state: RootState) => state.pet.favoritePets
