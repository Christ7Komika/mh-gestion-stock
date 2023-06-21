import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Warehouse from "../pages/Warehouse";
import Tickets from "../pages/Tickets";
import Stores from "../pages/Stores";
import Positions from "../pages/Positions";
import Categories from "../pages/Categories";
import Suppliers from "../pages/Suppliers";
import Clients from "../pages/Clients";
import Historical from "../pages/Historical";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
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
    path: "/stocks",
    element: <Stores />,
  },
  {
    path: "/emplacement",
    element: <Positions />,
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
  {
    path: "/configurations",
    element: <Settings />,
  },
]);
