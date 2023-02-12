import React from "react";
import Index from "./components/Index";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import Signin from './components/Auth/Signin'
import Login from "./components/Auth/Login";
import ContactMsg from "./components/Contact/ContactMsg";
const router = createBrowserRouter([
  {
    path: "v/:username",
    element: <Index/>,
    // errorElement: <ErrorPage />
  },
  {
    path: "/signin",
    element: <Signin/>,
    // errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login/>,
    // errorElement: <ErrorPage />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
