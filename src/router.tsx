import { useSelector } from 'react-redux'
import { lazy, ReactNode, Suspense } from 'react'
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { selectUser } from '@/features/user/slices/auth-slice'
import { LinearProgress } from '@mui/material'

const AddNewPet = lazy(() => import('@/features/pet/components/pet-form'))
const Page404 = lazy(() => import('./pages/error-page'))
const SignIn = lazy(() => import('./pages/sign-in'))
const SignUp = lazy(() => import('./pages/sign-up'))
const FavoritePetList = lazy(() => import('./pages/favorite-pets'))
const HomePage = lazy(() => import('./pages/home-page'))

const withSuspense = (Component: ReactNode) => (
  <Suspense
    fallback={
      <div>
        <LinearProgress />
      </div>
    }
  >
    {Component}
  </Suspense>
)

const publicRoutes: RouteObject[] = [
  {
    element: withSuspense(<HomePage />),
    index: true,
    path: '/',
  },
  {
    element: withSuspense(<SignIn />),
    path: '/login',
  },
  {
    element: withSuspense(<SignUp />),
    path: '/signup',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: withSuspense(<FavoritePetList />),
    path: '/favorites',
  },
  {
    element: withSuspense(<AddNewPet />),
    path: '/add',
  },
]

export const router = createBrowserRouter(
  [
    {
      children: privateRoutes,
      element: <PrivateRoutes />,
    },
    {
      children: publicRoutes,
      element: <PublicRoutes />,
    },
    {
      element: withSuspense(<Page404 />),
      path: '/404',
    },
    {
      element: <Navigate to={'/404'} />,
      path: '*',
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
    },
  }
)

function PrivateRoutes() {
  const currentUser = useSelector(selectUser)
  return currentUser ? <Outlet /> : <Navigate to={'/login'} />
}

function PublicRoutes() {
  return <Outlet />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
