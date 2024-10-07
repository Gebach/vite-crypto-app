import { Breadcrumb, Layout, Spin } from 'antd'
import AppHeader from './Header/AppHeader'
import { useContext } from 'react'
import CryptoContext from '../../context/crypto-context'
import { Outlet } from 'react-router-dom'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs'

export default function AppLayout() {
  const { loading } = useContext(CryptoContext)

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout>
      <AppHeader />
      <Layout className="container">
        <Breadcrumbs />
        <Outlet style={{ maxWidth: '1200px', width: '100%', margin: 'auto' }} />
      </Layout>
    </Layout>
  )
}
