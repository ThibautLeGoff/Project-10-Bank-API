import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

// Thunk asynchrone : récupère le profil utilisateur depuis le backend
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      // Appel API pour récupérer les données du profil
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

// Thunk asynchrone : met à jour le profil utilisateur (prénom et nom)
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ firstName, lastName }, { rejectWithValue }) => {
    try {
      // Appel API PUT pour mettre à jour le profil
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

// État initial : profil vide et pas en cours de chargement
const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
  rememberedEmail: null,
}

// Crée le slice Redux 'user'
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action : efface le profil (utilisée lors de la déconnexion)
    clearUserProfile(state) {
      state.profile = null
      state.error = null
      state.updateError = null
    },
    // Action : mémorise l'email de l'utilisateur (Remember Me)
    setRememberedEmail(state, action) {
      state.rememberedEmail = action.payload
    },
    // Action : efface l'email mémorisé
    clearRememberedEmail(state) {
      state.rememberedEmail = null
    },
  },
  // Gère les états des thunks asynchrones
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

// Export les actions
export const { clearUserProfile, setRememberedEmail, clearRememberedEmail } = userSlice.actions
// Export le reducer
export default userSlice.reducer
