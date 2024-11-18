import { authReducer } from '@/features/user/slices/auth-slice'
import { petReducer } from '@/features/pet/slices/pet-slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pet: petReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
