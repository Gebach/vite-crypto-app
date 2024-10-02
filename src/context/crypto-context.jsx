import { createContext, useState, useEffect, useContext } from 'react'
import { fakeFetchCrypto, fetchAssets } from '../api'
import { percentDifference } from '../utils'

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
})

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])
  const [coins, setCoins] = useState([])
  const [selectedCoin, setSelectedCoin] = useState({})

  function mapAssets(assets, result) {
    return assets.map(asset => {
      const coin = result.find(c => c.id === asset.id)

      return {
        name: coin.name,
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        ...asset,
      }
    })
  }

  useEffect(() => {
    ;(async function preload() {
      setLoading(true)
      const { result } = await fakeFetchCrypto()
      const assets = await fetchAssets()
      setAssets(mapAssets(assets, result))
      setCrypto(result)
      setLoading(false)
    })()
    // preload()

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': 'knS5qJgk/geryKs9C4y/4mcm6Ao9MzilyUll+a6c8xs=',
      },
    }

    fetch(`https://openapiv1.coinstats.app/coins`, options)
      .then(res => res.json())
      .then(res => {
        setCoins(res.result)
      })
  }, [])

  function addAsset(newAsset) {
    setAssets(prev => mapAssets([...prev, newAsset], crypto))
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, coins }}>{children}</CryptoContext.Provider>
  )
}

export default CryptoContext

export function useCrypto() {
  return useContext(CryptoContext)
}
