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
import { Header } from './components/Header'
import { PetList } from './components/PetList'
import { Page404 } from './components/auth/Page404'
import { SignIn } from './components/auth/SignIn'
import { SignUp } from './components/auth/SignUp'
import { FavoritePetList } from './pages/FavoritePetList'
import { HomePage } from './pages/HomePage'
export const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: '/login',
  },
  {
    element: <SignUp />,
    path: '/signup',
  },
  {
    element: <PetList />,
    path: '/pets',
  },

  {
    element: <Page404 />,
    path: '/404',
  },
  {
    element: <Header />,
    path: '/',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <FavoritePetList />,
    path: '/favorites',
  },
  {
    element: <AddNewPet onClose={() => {}} />,
    path: '/add',
  },
  {
    element: <HomePage />,
    path: '/',
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
    path: '/*',
  },
])

function PrivateRoutes() {
  const currentUser = useSelector(selectUser)

  return currentUser ? <Outlet /> : <Navigate to={'/login'} />
}
function PublicRoutes() {
  const currentUser = useSelector(selectUser)

  return currentUser ? <Navigate to={'/'} /> : <Outlet />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
