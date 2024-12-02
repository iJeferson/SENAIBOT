import { createBrowserRouter } from "react-router-dom"

import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Error } from "./pages/error";
import { Dashboard } from "./pages/dashboard/page";

const router = createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Dashboard/>, 
      },
      {
        path:"/pesquisas",
        element:<Home/>
      },
      {
        path:"*",
        element:<Error/>
      },
    ]
  }
])

export {router};
