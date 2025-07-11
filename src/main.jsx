import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Home from "./pages/Home.jsx"
import RecipeDetails from './pages/RecipeDetails.jsx';
import WhatsInYourKitchen from "./pages/WhatsInYourKitchen.jsx"
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "recipe/:id",
        element: <RecipeDetails />
      },
      {
        path:"whats-there-in-your-kitchen",
        element: <WhatsInYourKitchen />
      }
    ]
  },
  

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
