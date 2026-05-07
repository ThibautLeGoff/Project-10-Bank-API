import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import store, { persistor } from './store/store'
import './styles/main.css'
import { setToken as setAuthToken } from './api/authToken'

// If the store already contains a token synchronously (rare), set it.
const state = store.getState()
if (state && state.auth && state.auth.token) {
	setAuthToken(state.auth.token)
}

// Called after redux-persist has rehydrated the store (before rendering App)
const handleBeforeLift = () => {
	const s = store.getState()
	if (s && s.auth && s.auth.token) {
		setAuthToken(s.auth.token)
	}
}

// Point d'entrée React : on monte l'application et on fournit
// le store Redux via le Provider pour que tous les composants
// puissent accéder au state global.
const root = createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
			<PersistGate loading={null} persistor={persistor} onBeforeLift={handleBeforeLift}>
				<App />
			</PersistGate>
	</Provider>
)
