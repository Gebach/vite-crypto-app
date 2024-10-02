import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import { CryptoContextProvider } from './context/crypto-context'

//pages
import HomePage from './pages/HomePage'
import CoinsPage from './pages/CoinsPage'
import CoinPage from './pages/CoinPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/coins" element={<CoinsPage />} />
      <Route path="/coins/:coinId" element={<CoinPage />} />
    </Route>
  )
)

export default function App() {
  return (
    // <CryptoContextProvider>
    <RouterProvider router={router} />
    // </CryptoContextProvider>
  )
}
