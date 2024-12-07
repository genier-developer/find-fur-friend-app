import { Provider } from 'react-redux'
import { listenToAuthChanges } from '@/features/user/listen-to-auth-changes'
import { store } from '@/app/store'
import { Router } from './router'
import { useEffect } from 'react'

export const App = () => {
  useEffect(() => {
    store.dispatch(listenToAuthChanges())
  })
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
