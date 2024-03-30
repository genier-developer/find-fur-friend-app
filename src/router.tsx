import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  // useOutletContext,
} from 'react-router-dom'

// import { Layout } from "./Layout";

import { AddNewPet } from './components/AddNewPet'
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

  {
    element: <Page404 />,
    path: '/404',
  },
  {
    element: <Navigate to={'/404'} />,
    path: '/*',
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
])

function PrivateRoutes() {
  // const isAuthenticated = useOutletContext();
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
function PublicRoutes() {
  // const isAuthenticated = useOutletContext();
  const isAuthenticated = true

  return isAuthenticated ? <Navigate to={'/'} /> : <Outlet />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
