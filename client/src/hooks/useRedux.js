import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { fetchUserProfile } from '../features/user/userSlice'

/**
 * Hook personnalisé : Gestion de l'authentification
 * Retourne les informations d'authentification et une fonction de déconnexion
 * 
 * @returns {Object} { token, userId, isAuthenticated, loading, error, logout }
 */
export function useAuth() {
  const dispatch = useDispatch()
  const auth = useSelector((s) => s.auth)
  
  const handleLogout = () => {
    dispatch(logout())
  }
  
  return {
    token: auth.token,
    userId: auth.userId,
    isAuthenticated: !!auth.token,
    loading: auth.loading,
    error: auth.error,
    logout: handleLogout,
  }
}

/**
 * Hook personnalisé : Profil utilisateur
 * Retourne le profil utilisateur et les fonctions de gestion
 * 
 * @returns {Object} { profile, loading, error, updateLoading, updateError, refresh }
 */
export function useUserProfile() {
  const dispatch = useDispatch()
  const user = useSelector((s) => s.user)
  
  const refresh = () => {
    dispatch(fetchUserProfile())
  }
  
  return {
    profile: user.profile,
    loading: user.loading,
    error: user.error,
    updateLoading: user.updateLoading,
    updateError: user.updateError,
    refresh,
  }
}

/**
 * Hook personnalisé : Protection de route
 * Redirige vers /sign-in si l'utilisateur n'est pas authentifié
 * Charge automatiquement le profil utilisateur si disponible
 * 
 * @param {Object} options - Options de configuration
 * @param {boolean} options.loadProfile - Charger le profil automatiquement (défaut: true)
 * @returns {Object} { token, profile, loading, isAuthenticated }
 */
export function useProtectedRoute(options = { loadProfile: true }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const token = useSelector((s) => s.auth.token)
  const profile = useSelector((s) => s.user.profile)
  const loading = useSelector((s) => s.user.loading)
  
  useEffect(() => {
    if (!token) {
      navigate('/sign-in')
      return
    }
    
    if (options.loadProfile && !profile) {
      dispatch(fetchUserProfile())
    }
  }, [token, profile, navigate, dispatch, options.loadProfile])
  
  return {
    token,
    profile,
    loading,
    isAuthenticated: !!token,
  }
}

/**
 * Hook personnalisé : Préférences utilisateur
 * Retourne l'email mémorisé
 * 
 * @returns {Object} { rememberedEmail }
 */
export function usePreferences() {
  const prefs = useSelector((s) => s.prefs)
  
  return {
    rememberedEmail: prefs.rememberedEmail,
  }
}
