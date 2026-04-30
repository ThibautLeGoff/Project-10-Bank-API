import axios from 'axios'

// Instance axios centralisée pour l'application cliente.
// - baseURL : pointe vers le backend en développement
// - on ajoute un interceptor afin d'attacher automatiquement
//   le token JWT (stocké dans localStorage) à chaque requête
//   dans l'en-tête Authorization.
const baseURL = import.meta.env.DEV ? 'http://localhost:3001' : ''

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de requête : attache Authorization si token présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
