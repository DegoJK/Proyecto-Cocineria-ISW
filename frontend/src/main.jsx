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
import Waiter from "@pages/Waiter/Waiter";
import DailyReport from "@pages/DailyReport";
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
        path: "/waiter",
        element: <Waiter />,
      },
      {
        path: '/daily-report',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'BossChef']}>
            <DailyReport />
          </ProtectedRoute>
        )
      }
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