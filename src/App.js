import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root/Root";
import Error from "./Pages/Error/Error";
import "./App.css";
import Home from "./Pages/Landing/Home";
import Compiler from "./Pages/Playground/Compiler";

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
      ],
    },
    {
      path: "/falah/compiler",
      element: <Compiler />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
