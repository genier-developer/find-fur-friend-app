import { Provider } from 'react-redux'
import { store } from './app/store'
import { Router } from './router'
import { UserProvider } from '@/features/user/user-provider'

export const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router />
      </UserProvider>
    </Provider>
  )
}
