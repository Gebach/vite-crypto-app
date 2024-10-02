import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useCrypto } from '../context/crypto-context'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'knS5qJgk/geryKs9C4y/4mcm6Ao9MzilyUll+a6c8xs=',
  },
}

export default function CoinPage() {
  const params = useParams()
  const [coin, setCoin] = useState(null)
  const { coins } = useCrypto()

  // setCoin(coins.find(c => c.id === params.coindId))
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://openapiv1.coinstats.app/coins`, options)
      .then(res => res.json())
      .then(res => {
        setCoin(res.result.find(c => c.id === params.coinId))
      })
      .catch(err => {
        setError(err)
      })
  }, [])

  return <div>Coin {coin?.id}</div>
}
