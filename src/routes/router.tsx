import { Favorites, Home, Popular, Show, TopRated } from "../pages";
import { RouteObject, createBrowserRouter } from "react-router-dom";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { ROUTES } from "./constants";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PrivateRouter />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.POPULAR, element: <Popular /> },
      { path: ROUTES.TOP_RATED, element: <TopRated /> },
      { path: `${ROUTES.SHOW}:id`, element: <Show /> }, // /show/:id
      { path: ROUTES.FAVORITES, element: <Favorites /> },
    ],
  },
  {
    path: "/login",
    element: <PublicRouter />,
    children: [{ path: "/login", element: <div> Login </div> }],
  },
];

export const router = createBrowserRouter(routes);
