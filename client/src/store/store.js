import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import { combineReducers } from 'redux'
import authReducer from '../features/auth/authSlice'
import prefsReducer from '../features/prefs/prefsSlice'
import userReducer from '../features/user/userSlice'
import logoutMiddleware from './middleware'

/**
 * Configuration du store Redux avec redux-persist
 * 
 * Stratégie de persistance :
 * - prefs : persisté dans sessionStorage (email mémorisé)
 * - auth : NON persisté (sécurité : le token JWT reste en mémoire uniquement)
 * 
 * Cette approche assure que le token JWT n'est jamais stocké en localStorage/sessionStorage
 * pour des raisons de sécurité (vulnérabilité XSS)
 */

const persistConfig = {
  key: 'root',
  storage: storageSession,
  // Seul le slice 'prefs' est persisté (email mémorisé)
  // Le slice 'auth' n'est PAS persisté pour des raisons de sécurité
  whitelist: ['prefs'],
}

const rootReducer = combineReducers({ 
  auth: authReducer, 
  prefs: prefsReducer,
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore les actions redux-persist dans les vérifications de sérialisation
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(logoutMiddleware),
})

export const persistor = persistStore(store)

export default store
