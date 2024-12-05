import { createBrowserRouter } from "react-router-dom"

import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Error } from "./pages/error";
import { Dashboard } from "./pages/dashboard";

const router = createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:"/dashboard",
        element:<Dashboard/>,
      },
      {
        path:"*",
        element:<Error/>
      }
    ]
  }
])

export {router};
