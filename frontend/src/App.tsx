import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import UserPage from "./pages/User-page/UserPage";
import Workouts from "./pages/Workouts/Workout";
import Coaches from "./pages/Coaches/Coaches";
import SignUp from "./components/LoginPage/Signup/Signup";
import Login from "./components/LoginPage/Login/Login";
import AdminPanel from "./components/adminPanel/admin";
import CoachDetail from "./pages/Coaches/coach-detail";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin/ProtectedRouteAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // RootLayout is applied to all routes here
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/user", element: <UserPage /> },
      { path: "/workouts", element: <Workouts /> },
      { path: "/coaches", element: <Coaches /> },
      { path: "/coaches/:id", element: <CoachDetail /> },
      {
        path: "/admin",
        element: (
          <ProtectedRouteAdmin>
            <AdminPanel />
          </ProtectedRouteAdmin>
        ),
      }, // Admin route is inside RootLayout
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
