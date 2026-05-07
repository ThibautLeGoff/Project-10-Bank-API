import { logout } from '../features/auth/authSlice'
import { clearUserProfile } from '../features/user/userSlice'

/**
 * Middleware Redux personnalisé
 * Synchronise les actions entre les différents slices
 * 
 * Exemple : Lors d'une déconnexion, efface automatiquement le profil utilisateur
 */
export const logoutMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  
  // Si l'action est une déconnexion, nettoyer le profil utilisateur
  if (logout.match(action)) {
    store.dispatch(clearUserProfile())
  }
  
  return result
}

export default logoutMiddleware
