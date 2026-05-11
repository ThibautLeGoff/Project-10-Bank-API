import axios from 'axios'
import { getToken } from './authToken'

// URL de base de l'API : localhost en développement, chemin relatif en production
const baseURL = import.meta.env.DEV ? 'http://localhost:3001' : ''

// Crée une instance axios préconfigurée
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur de requête : ajoute le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}` // Ajoute le token dans l'en-tête
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur de réponse : gère les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si erreur 401 (non authentifié) ou 403 (forbidden), affiche un avertissement
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn('Token invalide ou expiré')
    }
    return Promise.reject(error)
  }
)

export default api
