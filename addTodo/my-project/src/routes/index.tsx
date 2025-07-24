import Sidebar from "../component/sidebar.tsx";
import Task from "../pages/task";
import Stickytask from "../pages/Stickytask.tsx";
import CalenderEvent from "../pages/CalenderEvent.tsx";
import { createBrowserRouter } from "react-router-dom"
import UpComing from "../pages/UpComing.tsx";
import List from "../pages/List.tsx";
import  AddNewList  from "../pages/addNewList.tsx";
// import SignIn from "../pages/SignIn.tsx";
export const router = createBrowserRouter([
  {
    element: <Sidebar />,
    children: [
      {
        path: "*",
        element: <Task />,
      },
       {
        path: "/sticky-wall",
        element: <Stickytask/>,
      },
       {
        path: "/calendar",
        element: <CalenderEvent/>,
      },
      {
        path:"/upcoming",
        element: <UpComing />
      },
       { path:"list/:listName",
         element:<List />
       },
       { path:"/add-new-list" ,
        element:<AddNewList/>
       },
      //  { path:"/SignIn" ,
      //   element:<SignIn/>
      //  }
    
    ],
  },
])