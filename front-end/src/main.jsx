import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard.jsx'
import Activities from './components/pages/Activities.jsx'
import Ranking from './components/pages/Ranking.jsx'
import Flashcards from './components/pages/Flashcards.jsx'
import Profile from './components/pages/Profile.jsx'
import Signup from './components/pages/Signup.jsx'
import Login from './components/pages/Login.jsx'
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
      { path: "flashcards", element: <Flashcards /> },
      { path: "perfil", element: <Profile /> },
      { path: "cadastro", element: <Signup /> },
      { path: "login", element: <Login /> },
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
