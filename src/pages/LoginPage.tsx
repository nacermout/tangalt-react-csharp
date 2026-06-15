import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    const res = await fetch('http://localhost:5025/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      navigate('/admin')
    } else {
      setError('Email ou mot de passe incorrect.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">tang<span>alt</span></h1>
        <p className="login-subtitle">Espace administration</p>

        {error && <p className="login-error">{error}</p>}

        <div className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-btn">
            Se connecter
          </button>
        </div>
      </div>
    </div>
  )
}