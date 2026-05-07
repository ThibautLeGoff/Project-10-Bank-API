import axios from 'axios'
import { getToken } from './authToken'

/**
 * Instance axios centralisée pour l'application
 * Configuration :
 * - baseURL : pointe vers le backend (localhost:3001 en dev)
 * - Intercepteur de requête : ajoute automatiquement le token JWT
 *   dans l'en-tête Authorization pour chaque requête authentifiée
 */
const baseURL = import.meta.env.DEV ? 'http://localhost:3001' : ''

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Intercepteur de requête
 * Attache automatiquement le token JWT à l'en-tête Authorization
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Gestion des erreurs de requête
    return Promise.reject(error)
  }
)

/**
 * Intercepteur de réponse
 * Gère les erreurs d'authentification (401, 403)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si l'utilisateur n'est pas authentifié ou le token a expiré
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Le composant React gérera la redirection via le store Redux
      console.warn('Token invalide ou expiré')
    }
    return Promise.reject(error)
  }
)

export default api
