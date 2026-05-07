import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

/**
 * Slice utilisateur Redux
 * Gère le profil utilisateur (récupération et mise à jour)
 * Centralise toute la logique liée aux données utilisateur
 */

/**
 * Thunk asynchrone : Récupération du profil utilisateur
 * Nécessite un token JWT valide (géré automatiquement par axios)
 */
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/v1/user/profile')
      if (!res.data?.body) {
        return rejectWithValue('Réponse invalide du serveur')
      }
      return res.data.body
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

/**
 * Thunk asynchrone : Mise à jour du profil utilisateur
 * @param {Object} payload - Les données à mettre à jour (firstName, lastName)
 */
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ firstName, lastName }, { rejectWithValue }) => {
    try {
      const res = await api.put('/api/v1/user/profile', { firstName, lastName })
      if (!res.data?.body) {
        return rejectWithValue('Échec de la sauvegarde')
      }
      return res.data.body
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

/**
 * État initial du profil utilisateur
 */
const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Réinitialise le profil utilisateur (lors de la déconnexion)
     */
    clearUserProfile(state) {
      state.profile = null
      state.error = null
      state.updateError = null
    },
  },
  extraReducers: (builder) => {
    builder
      // === Récupération du profil ===
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
      
      // === Mise à jour du profil ===
      .addCase(updateUserProfile.pending, (state) => {
        state.updateLoading = true
        state.updateError = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateLoading = false
        state.profile = action.payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateLoading = false
        state.updateError = action.payload || action.error.message
      })
  },
})

export const { clearUserProfile } = userSlice.actions
export default userSlice.reducer
