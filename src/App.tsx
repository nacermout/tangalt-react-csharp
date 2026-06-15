import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <div className="header-top">
            <span className="header-vol">Vol. 4 / N° 190</span>
            <h1 className="logo">tang<span>alt</span></h1>
            <div className="header-right">
              <span className="header-lang">FR · TIZ</span>
              <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
          <nav className="nav">
            <a href="#">Accueil</a>
            <a href="#">Revue</a>
            <a href="#">Création</a>
            <a href="#">Bibliothèque</a>
            <a href="#">Tamazight</a>
          </nav>
        </header>

        <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/articles/:id" element={<ArticlePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/admin" element={<AdminPage />} />
</Routes>
      </div>
    </BrowserRouter>
  )
}

export default App