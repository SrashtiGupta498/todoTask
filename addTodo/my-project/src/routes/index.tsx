import Sidebar from "../component/sidebar.tsx";
import Task from "../pages/task";

import { createBrowserRouter } from "react-router-dom"


export const router = createBrowserRouter([
  {
    element: <Sidebar />,
    children: [
      {
        path: "/",
        element: <Task />,
      },
    
    ],
  },
])