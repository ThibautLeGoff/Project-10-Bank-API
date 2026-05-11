import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { fetchUserProfile } from '../features/user/userSlice'

// Hook : récupère l'état d'authentification et la fonction de déconnexion
export function useAuth() {
  const dispatch = useDispatch()
  const auth = useSelector((s) => s.auth)
  
  // Fonction pour se déconnecter
  const handleLogout = () => {
    dispatch(logout())
  }
  
  // Retourne les données d'authentification
  return {
    token: auth.token,
    userId: auth.userId,
    isAuthenticated: !!auth.token,
    loading: auth.loading,
    error: auth.error,
    logout: handleLogout,
  }
}

// Hook : récupère le profil utilisateur et permet de le rafraîchir
export function useUserProfile() {
  const dispatch = useDispatch()
  const user = useSelector((s) => s.user)
  
  // Fonction pour rafraîchir les données du profil
  const refresh = () => {
    dispatch(fetchUserProfile())
  }
  
  // Retourne les données du profil
  return {
    profile: user.profile,
    loading: user.loading,
    error: user.error,
    updateLoading: user.updateLoading,
    updateError: user.updateError,
    refresh,
  }
}

// Hook : protège une page en vérifiant l'authentification et charge le profil automatiquement
export function useProtectedRoute(options = { loadProfile: true }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  // Récupère les données nécessaires du store
  const token = useSelector((s) => s.auth.token)
  const profile = useSelector((s) => s.user.profile)
  const loading = useSelector((s) => s.user.loading)
  
  // Effet : vérifie l'authentification et charge le profil si nécessaire
  useEffect(() => {
    // Si pas de token, redirige vers la connexion
    if (!token) {
      navigate('/sign-in')
      return
    }
    
    // Si demandé et que le profil n'est pas chargé, le récupère
    if (options.loadProfile && !profile) {
      dispatch(fetchUserProfile())
    }
  }, [token, profile, navigate, dispatch, options.loadProfile])
  
  // Retourne les données de la route protégée
  return {
    token,
    profile,
    loading,
    isAuthenticated: !!token,
  }
}

// Hook : récupère les préférences utilisateur (email mémorisé, etc)
export function usePreferences() {
  const prefs = useSelector((s) => s.prefs)
  
  // Retourne les préférences
  return {
    rememberedEmail: prefs.rememberedEmail,
  }
}
