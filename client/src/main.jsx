import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import store, { persistor } from './store/store'
import './styles/main.css'
import { setToken as setAuthToken } from './api/authToken'

// Récupère l'état actuel du store Redux
const state = store.getState()
// Si un token JWT existe, le restaure en mémoire pour les requêtes
if (state && state.auth && state.auth.token) {
	setAuthToken(state.auth.token)
}

// Fonction appelée quand redux-persist restaure les données du sessionStorage
const handleBeforeLift = () => {
	const s = store.getState()
	// Restaure le token JWT en mémoire après la réhydratation
	if (s && s.auth && s.auth.token) {
		setAuthToken(s.auth.token)
	}
}

// Crée la racine React
const root = createRoot(document.getElementById('root'))

// Rend l'application avec Redux et la persistance configurés
root.render(
	// Provider : rend le store Redux accessible à tous les composants
	<Provider store={store}>
		{/* PersistGate : attend que les données soient restaurées du sessionStorage avant de rendre l'app */}
		<PersistGate loading={null} persistor={persistor} onBeforeLift={handleBeforeLift}>
			<App />
		</PersistGate>
	</Provider>
)
