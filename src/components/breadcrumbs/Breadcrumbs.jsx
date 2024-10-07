import { Link, useLocation } from 'react-router-dom'
import classes from './breadcrumbs.module.css'

export default function Breadcrumbs() {
  const location = useLocation()

  let currentLinks = ''

  const crumbs = location.pathname
    .split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLinks += `/${crumb}`

      return (
        <div className={classes.crumb} key={crumb}>
          <Link to={currentLinks}>{crumb}</Link>
        </div>
      )
    })

  return <div className={classes.breadcrumbs}>{crumbs}</div>
}
