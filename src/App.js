import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root/Root";
import Error from "./Pages/Error/Error";
import "./App.css";
import Home from "./Pages/Landing/Home";
import Compiler from "./Pages/Playground/Compiler";
import DevelopedBy from "./Pages/DevelopedBy/DevelopedBy";
import Login from "./Pages/Login/Login";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/developer",
          element: <DevelopedBy />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/compiler",
      element: <Compiler />,
      errorElement: <Error />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
