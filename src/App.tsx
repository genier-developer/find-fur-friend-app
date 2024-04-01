// import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react'
import { Provider } from 'react-redux'

// import { selectUser } from '@/features/authSlice'

import { store } from './app/store'
import { Router } from './router'

export const App: React.FC = () => {
  return (
    // <ErrorBoundary>
    //<UserDataInitializer>
    <Provider store={store}>
      <Router />
    </Provider>
    // </UserDataInitializer>
    //  </ErrorBoundary>
  )
}

// const UserDataInitializer = ({ children }: PropsWithChildren) => {
//   const currentUser = useSelector(selectUser)
//
//   return <>{currentUser ? { children } : ''}</>
// }
//
// interface ErrorBoundaryProps {
//   children: ReactNode
// }
//
// interface ErrorBoundaryState {
//   hasError: boolean
// }
//
// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props)
//     this.state = { hasError: false }
//   }
//
//   static getDerivedStateFromError() {
//     return { hasError: true }
//   }
//
//   public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     console.log('Unhandled errors: ', error, errorInfo)
//   }
//
//   public render(): ReactNode {
//     const { hasError } = this.state
//     const { children } = this.props
//
//     if (hasError) {
//       return <div>Unhandled Error</div>
//     }
//
//     return children
//   }
// }
