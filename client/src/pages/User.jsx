import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useProtectedRoute } from '../hooks/useRedux'
import { updateUserProfile } from '../features/user/userSlice'
import '../styles/user.css'

export default function User() {
  // Récupère dispatch pour envoyer des actions à Redux
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // Hook personnalisé : protège la route et charge le profil automatiquement
  // Récupère profile et loading du Redux store (client/src/features/user/userSlice.js)
  const { profile, loading } = useProtectedRoute({ loadProfile: true })

  // États locaux pour modifier le prénom et nom
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  // États pour gérer la mise à jour
  const [updateLoading, setUpdateLoading] = React.useState(false)
  const [updateError, setUpdateError] = React.useState(null)

  // Effet : pré-remplis les champs avec les données du profil quand elles se chargent
  React.useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '')
      setLastName(profile.lastName || '')
    }
  }, [profile])

  // Fonction : enregistre les modifications du profil
  const handleSave = async () => {
    setUpdateLoading(true)
    setUpdateError(null)
    
    try {
      // Envoie la mise à jour à Redux (client/src/features/user/userSlice.js)
      await dispatch(updateUserProfile({ firstName, lastName })).unwrap()
    } catch (error) {
      // Affiche l'erreur si la mise à jour échoue
      setUpdateError(error)
    } finally {
      // Arrête le chargement
      setUpdateLoading(false)
    }
  }

  // Fonction : annule les modifications et revient aux données d'avant
  const handleCancel = () => {
    if (profile) {
      setFirstName(profile.firstName || '')
      setLastName(profile.lastName || '')
    }
    setUpdateError(null)
  }

  // Affiche un loader pendant le chargement du profil
  if (loading) return <p>Chargement du profil...</p>
  // N'affiche rien si pas de profil
  if (!profile) return null

  return (
    <main className="main">
      <h1>Bienvenue</h1>
      <div className="user-container">
        <div className="user-row">
          <input 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Prénom"
          />
        </div>
        <div className="user-row">
          <input 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nom"
          />
        </div>

        <div className="user-actions">
          <button onClick={handleSave} disabled={updateLoading}>
            {updateLoading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          <button onClick={handleCancel} disabled={updateLoading}>
            Annuler
          </button>
        </div>
        
        {updateError && <p style={{ color: 'red' }}>{updateError}</p>}
      
        <div className="accounts">
          <div className="account-card">
            <div className="account-card-header">
              <h3>Argent Bank Checking (x8349)</h3>
            </div>
            <div className="account-card-body">
              <p className="account-balance">$2,082.79</p>
              <p className="account-desc">Solde disponible</p>
              <button onClick={() => navigate('/transactions/x8349')}>Voir les transactions</button>
            </div>
          </div>

          <div className="account-card">
            <div className="account-card-header">
              <h3>Argent Bank Savings (x6712)</h3>
            </div>
            <div className="account-card-body">
              <p className="account-balance">$10,928.42</p>
              <p className="account-desc">Solde disponible</p>
              <button onClick={() => navigate('/transactions/x6712')}>Voir les transactions</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
