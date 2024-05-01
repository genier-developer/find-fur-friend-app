import { useSelector } from 'react-redux'
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  // useOutletContext,
} from 'react-router-dom'

import { selectUser } from '@/features/authSlice'

import { AddNewPet } from './components/AddNewPet'
import { Page404 } from './components/auth/Page404'
import { SignIn } from './components/auth/SignIn'
import { SignUp } from './components/auth/SignUp'
import { FavoritePetList } from './pages/FavoritePetList'
import { HomePage } from './pages/HomePage'

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
  return <RouterProvider router={router} />
}
