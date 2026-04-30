import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import '../styles/user.css'

export default function User() {
  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  // form fields
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/sign-in')
      return
    }

    const fetchProfile = async () => {
      try {
        setLoading(true)
        const res = await api.post('/api/v1/user/profile')
        if (res.data && res.data.body) {
          setUser(res.data.body)
          setFirstName(res.data.body.firstName || '')
          setLastName(res.data.body.lastName || '')
        } else {
          setError('Bad response from server')
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleSave = async () => {
    try {
      setLoading(true)
      const res = await api.put('/api/v1/user/profile', { firstName, lastName })
      if (res.data && res.data.body) {
        setUser(res.data.body)
      } else {
        setError('Failed to save')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFirstName(user.firstName || '')
      setLastName(user.lastName || '')
    }
    setError(null)
  }

  if (loading) return <p>Loading user...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!user) return null

  return (
    <main className="main">
        <h1>Welcome Back</h1>
        <div className="user-container">
          <div className="user-row">
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="user-row">
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div className="user-actions">
            <button className="" onClick={handleSave} disabled={loading}>
              Save
            </button>
            <button className="" onClick={handleCancel} disabled={loading}>
              Cancel
            </button>
          </div>
        
          {/* Mocked account cards - backend model has no accounts, so we display client-side mock data */}
          <div className="accounts">
            <div className="account-card">
              <div className="account-card-header">
                <h3>Argent Bank Checking (x8349)</h3>
              </div>
              <div className="account-card-body">
                <p className="account-balance">$2,082.79</p>
                <p className="account-desc">Available Balance</p>
                <button>View transactions</button>
              </div>
            </div>

            <div className="account-card">
              <div className="account-card-header">
                <h3>Argent Bank Savings (x6712)</h3>
              </div>
              <div className="account-card-body">
                <p className="account-balance">$10,928.42</p>
                <p className="account-desc">Available Balance</p>
                <button >View transactions</button>
              </div>
            </div>
          </div>
        </div>
    </main>
  )
}
