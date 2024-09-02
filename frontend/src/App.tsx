import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import axios from 'axios';


// axios.defaults.baseURL = "https://y4qagixjkd.execute-api.eu-north-1.amazonaws.com/api/v1/user";
// axios.defaults.withCredentials = true;

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import UserPage from "./pages/User-page/UserPage";
import Workouts from "./pages/Workouts/Workout";
import Coaches from "./pages/Coaches/Coaches";
import Login from "./components/LoginPage/Login/Login";
import SignUp from "./components/LoginPage/Signup/Signup";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/register", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      // { path: "/user", element: <UserPage /> },
      // { path: "/workouts", element: <Workouts /> },
      // { path: "/coaches", element: <Coaches /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;