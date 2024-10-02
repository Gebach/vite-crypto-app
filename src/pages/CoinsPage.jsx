import { useState, useEffect } from 'react'
import { useCrypto } from '../context/crypto-context'
import { List, Typography, Button, Skeleton, Avatar } from 'antd'
import { NavLink } from 'react-router-dom'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'knS5qJgk/geryKs9C4y/4mcm6Ao9MzilyUll+a6c8xs=',
  },
}

let page = 1

const coinsDataUrl = `https://openapiv1.coinstats.app/coins?page=${page}&limit=10`

export default function CoinsPage() {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const { setSlectedCoin } = useCrypto()

  function handleOnClick(value) {
    console.log(value)
  }

  const coinsDataURL = page => {
    return `https://openapiv1.coinstats.app/coins?page=${page}&limit=10`
  }

  useEffect(() => {
    fetch(coinsDataURL(page), options)
      .then(res => res.json())
      .then(res => {
        setInitLoading(false)
        setData(res.result)
        setList(res.result)
      })
      .catch(err => {
        setError('Network Error. Please try again later')
      })
  }, [])
  const onLoadMore = () => {
    setLoading(true)
    setList(
      data.concat(
        [...new Array(10)].map(() => ({
          loading: true,
          name: {},
          icon: {},
          price: 0,
          marketCap: 0,
        }))
      )
    )
    page++
    fetch(coinsDataURL(page), options)
      .then(res => res.json())
      .then(res => {
        const newData = data.concat(res.result)
        setData(newData)
        setList(newData)
        setLoading(false)
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'))
      })
      .catch(err => {
        setError('Network Error. Please try again later')
      })
  }
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null
  return !error ? (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar size={'medium'} src={item.icon} />}
              title={
                <NavLink onClick={handleOnClick} to={`/coins/${item.id}`}>
                  {item.name}
                </NavLink>
              }
              description={`${item.symbol}, Price: ${+item.price.toFixed(2)}$, Market Cap: ${+item.marketCap.toFixed(
                2
              )}$`}
            />
            {/* <div>content</div> */}
          </Skeleton>
        </List.Item>
      )}
    />
  ) : (
    <Typography.Text level={2} type="danger">
      {error}
    </Typography.Text>
  )
}
