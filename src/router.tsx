import { useSelector } from 'react-redux'
import { lazy, Suspense } from 'react'
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
const publicRoutes: RouteObject[] = [
  {
    element: <HomePage />,
    index: true,
    path: '/',
  },
  {
    element: <SignIn />,
    path: '/login',
  },
  {
    element: <SignUp />,
    path: '/signup',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <FavoritePetList />,
    path: '/favorites',
  },
  {
    element: <AddNewPet />,
    path: '/add',
  },
]

export const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  {
    children: publicRoutes,
    element: <PublicRoutes />,
  },
  {
    element: <Page404 />,
    path: '/404',
  },
  {
    element: <Navigate to={'/404'} />,
    path: '*',
  },
])

function PrivateRoutes() {
  const currentUser = useSelector(selectUser)

  return currentUser ? <Outlet /> : <Navigate to={'/login'} />
}
function PublicRoutes() {
  return <Outlet />
}

export const Router = () => {
  return (
    <Suspense
      fallback={
        <div>
          <LinearProgress />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  )
}
