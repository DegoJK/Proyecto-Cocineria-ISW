import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@pages/Login";
import Home from "@pages/Home";
import Users from "@pages/Users";
import Register from "@pages/Register";
import Error404 from "@pages/Error404";
import Root from "@pages/Root";
import ProtectedRoute from "@components/ProtectedRoute";
import Ingredients from "@pages/Ingredients";
import Dishes from "@pages/Dishes";
import Waiter from "@pages/Waiter";
import Menu from "@pages/Menu";
import Tables from "@pages/Tables";
import DailyReport from "@pages/DailyReport";
import Orders from "@pages/Orders";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@styles/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ingredients",
        element: <Ingredients />,
      },
      {
        path: "/dishes",
        element: <Dishes />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/waiter",
        element: (
          <ProtectedRoute allowedRoles={["mesero", "administrador"]}>
            <Waiter />
          </ProtectedRoute>
        ),
      },
      {
        path: "/waiter/table/:tableId",
        element: (
          <ProtectedRoute allowedRoles={["mesero", "administrador"]}>
            <Menu />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tables",
        element: <Tables />,
      },
      {
        path: "/daily-report",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "BossChef"]}>
            <DailyReport />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
