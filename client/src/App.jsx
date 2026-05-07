import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import User from './pages/User'
import Header from './components/Header'
import Footer from './components/Footer'

/**
 * Composant principal de l'application
 * 
 * Structure :
 * - Header : Navigation principale
 * - Routes : Gestion des différentes pages
 *   - / : Page d'accueil
 *   - /sign-in : Page de connexion
 *   - /user/:userId : Page du profil utilisateur (authentification requise)
 * - Footer : Pied de page
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <div className="app-layout">
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              {/* Route protégée : nécessite un token JWT valide */}
              <Route path="/user/:userId" element={<User />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
