import { logout } from '../features/auth/authSlice'
import { clearUserProfile } from '../features/user/userSlice'

export const logoutMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  
  if (logout.match(action)) {
    store.dispatch(clearUserProfile())
  }
  
  return result
}

export default logoutMiddleware
