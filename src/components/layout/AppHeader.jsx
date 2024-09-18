import { useState, useEffect } from 'react'
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const handleChange = value => {
  console.log(`selected ${value}`)
}

const options = [
  {
    label: 'China',
    value: 'china',
    emoji: '🇨🇳',
    desc: 'China (中国)',
  },
  {
    label: 'USA',
    value: 'usa',
    emoji: '🇺🇸',
    desc: 'USA (美国)',
  },
  {
    label: 'Japan',
    value: 'japan',
    emoji: '🇯🇵',
    desc: 'Japan (日本)',
  },
  {
    label: 'Korea',
    value: 'korea',
    emoji: '🇰🇷',
    desc: 'Korea (韩国)',
  },
]

export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState(null)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const { crypto } = useCrypto()

  useEffect(() => {
    const keypress = event => {
      if (event.key === '/') setSelect(prev => !prev)
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value) {
    console.log(value)
    setCoin(crypto.find(c => c.id === value))
    setModal(true)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        onSelect={handleSelect}
        onClick={() => setSelect(prev => !prev)}
        open={select}
        value="press / to open"
        optionLabelProp="label"
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={option => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} title={option.data.label} alt={option.data.label} />{' '}
            {option.data.label}
          </Space>
        )}
      />

      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(prev => !prev)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer width="600" title="Basic Drawer" onClose={() => setDrawer(false)} open={drawer}>
        <AddAssetForm />
      </Drawer>
    </Layout.Header>
  )
}
