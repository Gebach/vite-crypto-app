import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import CoinsPage from './pages/coins/CoinsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import CoinPage from './pages/coins/CoinPage.jsx'
import { CryptoContextProvider } from './context/crypto-context.jsx'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <NotFoundPage />,
//   },
//   {
//     path: '/coins',
//     element: <CoinsPage />,
//   },
//   {
//     path: '/coins/:coinId',
//     element: <CoinPage />,
//   },
// ])

const root = document.getElementById('root')

createRoot(root).render(
  <React.StrictMode>
    <CryptoContextProvider>
      <App />
      {/* <RouterProvider router={router} /> */}
    </CryptoContextProvider>
  </React.StrictMode>
)
