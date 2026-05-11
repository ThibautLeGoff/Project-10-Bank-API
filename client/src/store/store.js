import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import { combineReducers } from 'redux'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import logoutMiddleware from './middleware'

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user'],
}

const rootReducer = combineReducers({ 
  auth: authReducer, 
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(logoutMiddleware),
})

export const persistor = persistStore(store)

export default store
