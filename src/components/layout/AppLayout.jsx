import { Layout, Spin } from 'antd'
import AppHeader from './Header/AppHeader'
import { useContext } from 'react'
import CryptoContext from '../../context/crypto-context'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  const { loading } = useContext(CryptoContext)

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  )
}
