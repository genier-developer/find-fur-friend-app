// import { RootState } from '@/app/store'
// import { PayloadAction } from '@reduxjs/toolkit'
// import { User } from 'firebase/auth'
//
// import { authReducer, selectError, selectUser, setError, setUser, signOutUser } from './authSlice'
//
// describe('authSlice reducer', () => {
//   const initialState = {
//     currentUser: null as User | null,
//     error: null as null | string,
//   }
//
//   it('should handle setError', () => {
//     const errorMessage = 'An error occurred'
//     const action: PayloadAction<null | string> = setError(errorMessage)
//     const newState = authReducer(initialState, action)
//
//     expect(newState.error).toEqual(errorMessage)
//   })
//
//   it('should handle setUser', () => {
//     const user = { email: 'test@example.com', uid: '123' } as User
//     const newState = authReducer(initialState, setUser(user))
//
//     expect(newState.currentUser).toEqual(user)
//     expect(newState.error).toBeNull()
//   })
//
//   it('should handle signOutUser', () => {
//     const newState = authReducer(
//       { currentUser: { email: 'test@example.com', uid: '123' }, error: null },
//       signOutUser()
//     )
//
//     expect(newState.currentUser).toBeNull()
//   })
// })
//
// describe('authSlice selectors', () => {
//   const state = {
//     auth: {
//       currentUser: { email: 'test@example.com', uid: '123' },
//       error: 'An error occurred',
//     },
//   } as RootState
//
//   it('should selectUser', () => {
//     expect(selectUser(state)).toEqual(state.auth.currentUser)
//   })
//
//   it('should selectError', () => {
//     expect(selectError(state)).toEqual(state.auth.error)
//   })
// })
