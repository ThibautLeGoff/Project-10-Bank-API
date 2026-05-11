import React from 'react'
import { useDispatch as useReduxDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice'
import { setRememberedEmail, clearRememberedEmail } from '../features/user/userSlice'

export default function SignIn() {
  const dispatch = useReduxDispatch()
  const auth = useSelector((s) => s.auth)
  const rememberedEmail = useSelector((s) => s.user?.rememberedEmail)
  const navigate = useNavigate()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [remember, setRemember] = React.useState(false)

  React.useEffect(() => {
    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRemember(true)
    }
  }, [rememberedEmail])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    dispatch(login({ email, password })).then((action) => {
      if (action.payload) {
        const userId = action.payload.userId || 1
        
        try {
          if (remember) {
            dispatch(setRememberedEmail(email))
          } else {
            dispatch(clearRememberedEmail())
          }
        } catch (e) {
          console.warn('Erreur lors de la sauvegarde des préférences', e)
        }
        
        navigate(`/user/${userId}`)
      }
    })
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa-solid fa-circle-user sign-in-icon" />
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input 
              type="checkbox" 
              id="remember-me" 
              checked={remember} 
              onChange={(e) => setRemember(e.target.checked)} 
            />
            <label htmlFor="remember-me">Se souvenir de moi</label>
          </div>

          <button className="sign-in-button" type="submit" disabled={auth.loading}>
            {auth.loading ? 'Connexion...' : 'Se connecter'}
          </button>
          {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}
        </form>
      </section>
    </main>
  )
}
