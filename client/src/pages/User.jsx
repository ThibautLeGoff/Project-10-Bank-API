import React from 'react'
import { useDispatch } from 'react-redux'
import { useProtectedRoute } from '../hooks/useRedux'
import { updateUserProfile } from '../features/user/userSlice'
import '../styles/user.css'

/**
 * Page utilisateur (profil et comptes)
 * 
 * Fonctionnalités :
 * - Affiche et permet de modifier le profil utilisateur
 * - Protection de route : redirige vers /sign-in si non authentifié
 * - Utilise Redux Toolkit pour gérer l'état du profil
 * - Affiche les comptes bancaires mockés côté client
 */
export default function User() {
  const dispatch = useDispatch()
  
  // Hook personnalisé : protection de route + chargement du profil
  const { profile, loading } = useProtectedRoute({ loadProfile: true })

  // State local uniquement pour les champs du formulaire
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [updateLoading, setUpdateLoading] = React.useState(false)
  const [updateError, setUpdateError] = React.useState(null)

  // Synchroniser les champs du formulaire avec le profil Redux
  React.useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '')
      setLastName(profile.lastName || '')
    }
  }, [profile])

  /**
   * Enregistrer les modifications du profil
   */
  const handleSave = async () => {
    setUpdateLoading(true)
    setUpdateError(null)
    
    try {
      await dispatch(updateUserProfile({ firstName, lastName })).unwrap()
    } catch (error) {
      setUpdateError(error)
    } finally {
      setUpdateLoading(false)
    }
  }

  /**
   * Annuler les modifications et restaurer les valeurs initiales
   */
  const handleCancel = () => {
    if (profile) {
      setFirstName(profile.firstName || '')
      setLastName(profile.lastName || '')
    }
    setUpdateError(null)
  }

  // États de chargement
  if (loading) return <p>Chargement du profil...</p>
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
      
        {/* Comptes bancaires mockés - Le backend ne gère pas les comptes, 
            donc on affiche des données fictives côté client */}
        <div className="accounts">
          <div className="account-card">
            <div className="account-card-header">
              <h3>Argent Bank Checking (x8349)</h3>
            </div>
            <div className="account-card-body">
              <p className="account-balance">$2,082.79</p>
              <p className="account-desc">Solde disponible</p>
              <button>Voir les transactions</button>
            </div>
          </div>

          <div className="account-card">
            <div className="account-card-header">
              <h3>Argent Bank Savings (x6712)</h3>
            </div>
            <div className="account-card-body">
              <p className="account-balance">$10,928.42</p>
              <p className="account-desc">Solde disponible</p>
              <button>Voir les transactions</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
