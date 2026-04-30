import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'
import jwtDecode from 'jwt-decode'

// Slice d'authentification (Redux Toolkit)
// - gère le token JWT et l'état de chargement / erreur
// - createAsyncThunk permet d'encapsuler l'appel asynchrone de login

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/v1/user/login', { email, password })
      const token = res.data?.body?.token
      if (!token) return rejectWithValue('Token missing in response')
      // optional: decode id
      let userId = null
      try {
        const decoded = jwtDecode(token)
        userId = decoded.id
      } catch (e) {
        // ignore decoding errors
      }
      // persist token
      localStorage.setItem('token', token)
      return { token, userId }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

const initialState = {
  token: localStorage.getItem('token') || null,
  userId: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.userId = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.userId = action.payload.userId
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
