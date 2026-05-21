import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import MainLayout from "../components/layout/MainLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import POS from "../pages/POS/POS";
import ProtectedRoute from "./ProtectedRoute";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Inventory from "../pages/Inventory";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Users from "../pages/Users";
import Payments from "../pages/Payments";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "POS",
        element: <POS />,
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["admin", "manager"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            element: <>Dashboard</>,
            index: true,
          },
          {
            path: "/Dashboard",
            element: <>Dashboard</>,
          },
          {
            path: "Products",
            element: <Products />,
          },
          {
            path: "Categories",
            element: <Categories />,
          },
          {
            path: "Inventory",
            element: <Inventory />,
          },
          {
            path: "Orders",
            element: <Orders />,
          },
          {
            path: "Customers",
            element: <Customers />,
          },
          {
            path: "Users",
            element: <Users />,
          },
          {
            path: "Payments",
            element: <Payments />,
          },
          {
            path: "Reports",
            element: <>Reports</>,
          },
          {
            path: "Settings",
            element: <>Settings</>,
          },
        ],
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
