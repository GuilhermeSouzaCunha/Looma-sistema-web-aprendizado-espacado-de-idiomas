import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard.jsx'
import Activities from './components/pages/Activities.jsx'
import Ranking from './components/pages/Ranking.jsx'
import Profile from './components/pages/Profile.jsx'
import RootLayout from './components/RootLayout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      //{ index: true, element: <App /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "atividades", element: <Activities /> },
      { path: "ranking", element: <Ranking /> },
      { path: "perfil", element: <Profile /> },
      //{ path: "ranking", element: <Ranking /> },
      //{ path: "profile", element: <Profile /> }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
