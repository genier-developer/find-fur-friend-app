// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// // import {  RootState } from "../app/store";
// //
// // import { User } from "firebase/auth";
// //
// // type AuthState = {
// //     user: User | null;
// // }
// //
// // const initialState: AuthState = {
// //     user: null,
// // };
// //
// // const authSlice = createSlice({
// //     name: "auth",
// //     initialState,
// //     reducers: {
// //         setUser: (state, action: PayloadAction<User | null>) => {
// //             state.user = action.payload;
// //         },
// //     },
// // });
// //
// // export const { setUser } = authSlice.actions;
// // export const authReducer = authSlice.reducer;
// //
// // export const selectUser = (state: RootState) => state.auth.user;
// //
// //
//
//
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../app/store";
// import { User } from "firebase/auth";
//
// type AuthState = {
//     user: User | null;
//     error: string | null; // Добавляем поле для хранения ошибок аутентификации
// }
//
// const initialState: AuthState = {
//     user: null,
//     error: null,
// };
//
// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setUser: (state, action: PayloadAction<User | null>) => {
//             state.user = action.payload;
//             state.error = null; // Сбрасываем ошибку при успешном установлении пользователя
//         },
//         setError: (state, action: PayloadAction<string | null>) => {
//             state.error = action.payload;
//         },
//         signOutUser: (state) => {
//             state.user = null;
//         }
//     },
// });
//
// export const { setUser, setError, signOutUser } = authSlice.actions;
// export const authReducer = authSlice.reducer;
//
// export const selectUser = (state: RootState) => state.auth.user;
// export const selectError = (state: RootState) => state.auth.error;

import { RootState } from '@/app/store'
// features/authSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

type AuthState = {
  currentUser: User | null
  error: null | string
}

const initialState: AuthState = {
  currentUser: null,
  error: null,
}

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setError: (state, action: PayloadAction<null | string>) => {
      state.error = action.payload
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload
      state.error = null
    },
    signOutUser: state => {
      state.currentUser = null
    },
  },
})

export const { setError, setUser, signOutUser } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectUser = (state: RootState) => state.auth.currentUser
export const selectError = (state: RootState) => state.auth.error
