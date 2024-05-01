// import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react'
import { Provider } from 'react-redux'

//import { selectUser } from '@/features/authSlice'

import { store } from './app/store'
import { Router } from './router'

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
