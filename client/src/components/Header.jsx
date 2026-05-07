import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useUserProfile } from '../hooks/useRedux'
import '../styles/header.css'

/**
 * Header global de l'application
 * 
 * Fonctionnalités :
 * - Affiche "Connexion" si l'utilisateur n'est pas authentifié
 * - Affiche le prénom et "Déconnexion" si authentifié
 * - Utilise des hooks personnalisés pour simplifier l'accès à Redux
 */
export default function Header() {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()
  const { profile, refresh } = useUserProfile()

  // Récupérer le profil utilisateur si connecté et non chargé
  React.useEffect(() => {
    if (isAuthenticated && !profile) {
      refresh()
    }
  }, [isAuthenticated, profile, refresh])

  /**
   * Gère la déconnexion
   */
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src="/img/argentBankLogo.png" alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="log-container">
        {!isAuthenticated ? (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa-solid fa-circle-user"></i>
            Connexion
          </Link>
        ) : (
          <>
            <Link className="main-nav-item user-name" to={`/user/${profile?.id || ''}`}>
              <i className="fa-solid fa-circle-user"></i>
              {profile?.firstName ? ` ${profile.firstName}` : ''}
            </Link>
            <button 
              className="main-nav-item" 
              onClick={handleLogout} 
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Déconnexion
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
