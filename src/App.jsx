import { ProviderId } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import LoinWithgogle from "./component/LoinWithgogle";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import home from "./component/home";


const router = createBrowserRouter(
  createRoutesFromElements(
   
    <Route>
    <Route path="/" element = {<LoinWithgogle />}/>

    <Route path="/home" element = {<home />}/>

    </Route>
    
    
   
  )

)


function App() {


return <RouterProvider router = {router}></RouterProvider>

}


export default App
