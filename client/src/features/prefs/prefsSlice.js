import { createSlice } from '@reduxjs/toolkit'

/**
 * Slice des préférences utilisateur
 * Gère les paramètres persistants comme l'email mémorisé (Remember Me)
 * Ce slice est persisté dans sessionStorage via redux-persist
 */

const initialState = {
  rememberedEmail: null,
}

const prefsSlice = createSlice({
  name: 'prefs',
  initialState,
  reducers: {
    /**
     * Mémorise l'email de l'utilisateur (fonctionnalité Remember Me)
     */
    setRememberedEmail(state, action) {
      state.rememberedEmail = action.payload
    },
    /**
     * Efface l'email mémorisé
     */
    clearRememberedEmail(state) {
      state.rememberedEmail = null
    },
  },
})

export const { setRememberedEmail, clearRememberedEmail } = prefsSlice.actions
export default prefsSlice.reducer
