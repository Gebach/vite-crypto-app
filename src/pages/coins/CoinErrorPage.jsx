import { Link, useRouteError } from 'react-router-dom'

export default function CoinErrorPage() {
  const error = useRouteError()
  console.log(error.message)

  return (
    <div>
      <h2>Error</h2>
      <p></p>
      <Link to="/">Back to home page</Link>
    </div>
  )
}
