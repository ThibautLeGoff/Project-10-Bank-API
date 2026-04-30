import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice'

// Page SignIn : formulaire d'authentification
// - utilise la thunk `login` définie dans authSlice
// - après succès, le token est stocké dans localStorage et
//   l'utilisateur est redirigé vers sa page /user/:id

export default function SignIn() {
  const dispatch = useDispatch()
  const auth = useSelector((s) => s.auth)
  const navigate = useNavigate()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password })).then((action) => {
      if (action.payload) {
        const userId = action.payload.userId || 1
        navigate(`/user/${userId}`)
      }
    })
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
  <i className="fa-solid fa-circle-user sign-in-icon" />
        <h1>Sign In</h1>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button" type="submit" disabled={auth.loading}>
            {auth.loading ? 'Signing in...' : 'Sign In'}
          </button>
          {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}
        </form>
      </section>
    </main>
  )
}
