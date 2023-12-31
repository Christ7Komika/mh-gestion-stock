import { createBrowserRouter } from "react-router-dom";
import Warehouse from "../pages/Warehouse";
import Tickets from "../pages/Tickets";
import Stores from "../pages/Stores";
import Categories from "../pages/Categories";
import Suppliers from "../pages/Suppliers";
import Clients from "../pages/Clients";
import StockManagement from "../pages/StockManagement.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Stores />,
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
    path: "//stock-management",
    element: <StockManagement />,
  },
]);
