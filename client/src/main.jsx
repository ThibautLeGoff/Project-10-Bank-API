import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store/store'
import './styles/main.css'

// Point d'entrée React : on monte l'application et on fournit
// le store Redux via le Provider pour que tous les composants
// puissent accéder au state global.
const root = createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
