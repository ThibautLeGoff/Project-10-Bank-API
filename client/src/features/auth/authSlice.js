import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'
import jwtDecode from 'jwt-decode'
import { setToken as setAuthToken } from '../../api/authToken'

// Thunk asynchrone : envoie email/password au backend et récupère le JWT token
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Appel API pour se connecter
      const res = await api.post('/api/v1/user/login', { email, password })
      const token = res.data?.body?.token
      
      // Vérifie que le token est reçu
      if (!token) {
        return rejectWithValue('Token manquant dans la réponse du serveur')
      }

      // Décode le JWT pour extraire l'ID utilisateur
      let userId = null
      try {
        const decoded = jwtDecode(token)
        userId = decoded.id
      } catch (e) {
        console.warn('Impossible de décoder le token JWT', e)
      }

      // Sauvegarde le token en mémoire pour les futures requêtes
      setAuthToken(token)
      
      return { token, userId }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// État initial : utilisateur pas connecté
const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
}

// Crée le slice Redux 'auth'
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action de déconnexion : vide l'état et le token
    logout(state) {
      state.token = null
      state.userId = null
      state.loading = false
      state.error = null
      setAuthToken(null)
    },
  },
  // Gère les différents états du thunk 'login'
  extraReducers: (builder) => {
    builder
      // Connexion en cours
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Connexion réussie
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.userId = action.payload.userId
      })
      // Connexion échouée
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

// Export l'action logout
export const { logout } = authSlice.actions
// Export le reducer
export default authSlice.reducer
