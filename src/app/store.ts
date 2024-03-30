// src/app/store.ts
import { authReducer } from '@/features/authSlice'
import { petReducer } from '@/features/petSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pet: petReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
