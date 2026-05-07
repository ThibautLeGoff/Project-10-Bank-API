import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'
import jwtDecode from 'jwt-decode'
import { setToken as setAuthToken } from '../../api/authToken'

/**
 * Slice d'authentification Redux
 * Gère l'état du token JWT, l'ID utilisateur et les états de chargement/erreur
 * Le token est stocké à la fois dans Redux (state) et en mémoire (authToken)
 */

/**
 * Thunk asynchrone : Connexion utilisateur
 * Envoie les identifiants au backend et récupère le token JWT
 */
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/v1/user/login', { email, password })
      const token = res.data?.body?.token
      
      if (!token) {
        return rejectWithValue('Token manquant dans la réponse du serveur')
      }

      // Décodage optionnel du token pour extraire l'ID utilisateur
      let userId = null
      try {
        const decoded = jwtDecode(token)
        userId = decoded.id
      } catch (e) {
        console.warn('Impossible de décoder le token JWT', e)
      }

      // Stockage du token en mémoire pour les requêtes axios
      setAuthToken(token)
      
      return { token, userId }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

/**
 * État initial de l'authentification
 */
const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Action : Déconnexion
     * Supprime le token du store Redux et de la mémoire
     */
    logout(state) {
      state.token = null
      state.userId = null
      state.loading = false
      state.error = null
      setAuthToken(null)
    },
  },
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

export const { logout } = authSlice.actions
export default authSlice.reducer
