import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import api from '../api/axios'
import '../styles/header.css'

// Header global : affiche Sign In si non authentifié,
// sinon affiche le prénom récupéré depuis l'API et un bouton Sign Out.
// Le header lit le token depuis le store (useSelector) et effectue
// une requête /profile pour afficher le prénom.

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((s) => s.auth.token)
  const [firstName, setFirstName] = React.useState(null)
  const [userId, setUserId] = React.useState(null)

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return
      try {
        const res = await api.post('/api/v1/user/profile')
        if (res.data && res.data.body && res.data.body.firstName) {
          setFirstName(res.data.body.firstName)
          // récupérer l'id (le backend transforme _id en id)
          if (res.data.body.id) setUserId(res.data.body.id)
        }
      } catch (err) {
        // ignore errors here; header should not break the app
        console.warn('Could not fetch profile in Header', err.message)
      }
    }

    fetchProfile()
  }, [token])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src="/img/argentBankLogo.png" alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="log-container">
        {!token ? (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa-solid fa-circle-user"></i>
            Sign In
          </Link>
        ) : (
          <>
          <Link className="main-nav-item user-name" to={`/user/${userId || ''}`}>
            <i className="fa-solid fa-circle-user"></i>
            {firstName ? ` ${firstName}` : ''}
          </Link>
            <button className="main-nav-item" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <i className="fa-solid fa-right-from-bracket"></i>
              Sign Out
            </button>
            
          </>
        )}
      </div>
    </nav>
  )
}
