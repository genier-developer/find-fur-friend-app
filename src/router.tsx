import { ComponentType, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { selectUser } from '@/features/user/slices/auth-slice'
import { LinearProgress } from '@mui/material'

function LazyComponent<T>(
  importFunc: () => Promise<{ default: ComponentType<T> }>
): ComponentType<T> {
  const Component = lazy(importFunc)
  return (props: T) => (
    <Suspense
      fallback={
        <div>
          <LinearProgress />
        </div>
      }
    >
      <Component {...(props as any)} />
    </Suspense>
  )
}

const AddNewPet = LazyComponent(() => import('@/features/pet/components/pet-form'))
const Page404 = LazyComponent(() => import('./pages/error-page'))
const SignIn = LazyComponent(() => import('./pages/sign-in'))
const SignUp = LazyComponent(() => import('./pages/sign-up'))
const FavoritePetList = LazyComponent(() => import('./pages/favorite-pets'))
const HomePage = LazyComponent(() => import('./pages/home-page'))

function PrivateRoutes() {
  const currentUser = useSelector(selectUser)
  return currentUser ? <Outlet /> : <Navigate to={'/login'} />
}

function PublicRoutes() {
  return <Outlet />
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicRoutes />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
    ],
  },
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      { path: 'favorites', element: <FavoritePetList /> },
      { path: 'add', element: <AddNewPet /> },
    ],
  },
  { path: '404', element: <Page404 /> },
  { path: '*', element: <Navigate to="/404" /> },
]

// Create router with Future Flags (for v.7)
export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
})

// Компонент Router
export const Router = () => {
  return <RouterProvider router={router} />
}
