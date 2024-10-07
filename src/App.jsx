import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import { CryptoContextProvider } from './context/crypto-context'

//pages
import HomePage from './pages/HomePage'
import CoinsPage from './pages/coins/CoinsPage'
import CoinPage from './pages/coins/CoinPage'
import NotFoundPage from './pages/NotFoundPage'
import CoinErrorPage from './pages/coins/CoinErrorPage'
import ContactPage, { contactAction } from './pages/ContactPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/coins" element={<CoinsPage />} />
      <Route path="/coins/:coinId" element={<CoinPage />} errorElement={<CoinErrorPage />} />
      <Route path="/contact" element={<ContactPage />} action={contactAction} />

      <Route path="*" element={<NotFoundPage />} />
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
