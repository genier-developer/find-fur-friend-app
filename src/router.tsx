import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  // useOutletContext,
} from "react-router-dom";

// import { Layout } from "./Layout";

import { PetList } from "./components/PetList.tsx";
import { SignIn } from "./components/auth/SignIn.tsx";
import { SignUp } from "./components/auth/SignUp.tsx";
import { Page404 } from "./components/auth/Page404.tsx";
import { FavoritePetList } from "./components/FavoritePetList.tsx";
import { AddNewPet } from "./components/AddNewPet.tsx";
import { HomePage } from "./pages/HomePage.tsx";
export const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: "/login",
  },
  {
    element: <SignUp />,
    path: "/signup",
  },
  {
    element: <PetList />,
    path: "/pets",
  },

  {
    element: <Page404 />,
    path: "/404",
  },
  {
    element: <HomePage />,
    path: "/homePage",
  },
];

const privateRoutes: RouteObject[] = [
  {
    element: <FavoritePetList />,
    path: "/favoritePets",
  },
  {
    element: <AddNewPet onClose={() => {}} />,
    path: "/addPet",
  },

  {
    element: <Page404 />,
    path: "/404",
  },
  {
    element: <Navigate to={"/404"} />,
    path: "/*",
  },
];

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        children: publicRoutes,
        element: <PublicRoutes />,
      },
    ],
    // element: <Layout />,
    element: <HomePage />,
  },
]);

function PrivateRoutes() {
  // const isAuthenticated = useOutletContext();
  const isAuthenticated = false;

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
}
function PublicRoutes() {
  // const isAuthenticated = useOutletContext();
  const isAuthenticated = true;

  return isAuthenticated ? <Navigate to={"/"} /> : <Outlet />;
}

export const Router = () => {
  return <RouterProvider router={router} />;
};
