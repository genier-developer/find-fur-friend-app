import { Provider } from 'react-redux'
import { store } from './app/store'
import { Router } from './router'

export const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
