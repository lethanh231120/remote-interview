import { Navigate } from 'react-router-dom'
import { getCookie, STORAGEKEY } from './utils/storage'


export const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = Boolean(getCookie(STORAGEKEY.USER_INFO))
  return isAuthenticated ? <Component /> : <Navigate to='/' />
}

