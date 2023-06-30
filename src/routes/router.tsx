import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Warehouse from "../pages/Warehouse";
import Tickets from "../pages/Tickets";
import Stores from "../pages/Stores";
import Categories from "../pages/Categories";
import Suppliers from "../pages/Suppliers";
import Clients from "../pages/Clients";
import Historical from "../pages/Historical";

export const router = createBrowserRouter([
  {
    path: "/stocks",
    element: <Stores />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/entrepot",
    element: <Warehouse />,
  },
  {
    path: "/ticket",
    element: <Tickets />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/fournisseurs",
    element: <Suppliers />,
  },
  {
    path: "/clients",
    element: <Clients />,
  },
  {
    path: "/historique",
    element: <Historical />,
  },
]);
