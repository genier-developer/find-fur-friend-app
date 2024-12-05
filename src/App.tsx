import { Provider } from 'react-redux'
import { listenToAuthChanges } from '@/features/user/listen-to-auth-changes'
import { store } from '@/app/store'
import { Router } from './router'

store.dispatch(listenToAuthChanges())

export const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
