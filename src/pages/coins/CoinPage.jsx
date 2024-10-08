import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'knS5qJgk/geryKs9C4y/4mcm6Ao9MzilyUll+a6c8xs=',
  },
}

export default function CoinPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [coin, setCoin] = useState({})
  const { coinId } = useParams()

  useEffect(() => {
    ;(async function preload() {
      await fetch(`https://openapiv1.coinstats.app/coins/${coinId}`, options)
        .then(res => res.json())
        .then(res => setCoin(res))
        .catch(err => {
          throw Error("Page doesn't exist")
        })

      setIsLoading(false)
    })()
  }, [])

  return isLoading ? (
    <Spin fullscreen />
  ) : (
    <div className="group">
      <h2 className="text-xl text-center hover:text-blue-600 transition-all duration-300 ease-in-out cursor-pointer">
        Coin {coin.id}
      </h2>
      <p className="scale-0 group-hover:scale-100 text-center transition-all duration-200 ease-out">
        Price: {coin.price.toFixed(2)}$
      </p>
    <div>
      <h2>Coin {coin.id}</h2>
      <p>Price: {coin.price.toFixed(2)}$</p>
    </div>
  )
}

//loader
// export const coinLoader = async ({ params }) => {
//   const { coinId } = params

//   const res = await fetch(`https://openapiv1.coinstats.app/coins/${coinId}`, options)

//   return res.json()
// }
