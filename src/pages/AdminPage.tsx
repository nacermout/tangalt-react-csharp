import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Article {
  id: number
  title: string
  language: string
  isPublished: boolean
}

export default function AdminPage() {
  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newLanguage, setNewLanguage] = useState('fr')
  const [newSlug, setNewSlug] = useState('')
  const [articles, setArticles] = useState<Article[]>([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetch('http://localhost:5025/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data))
  }, [])

  const handleCreate = async () => {
    const res = await fetch('http://localhost:5025/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        language: newLanguage,
        slug: newSlug,
        imageUrl: '',
        isPublished: true,
        authorId: 1,
        categoryId: 1
      })
    })

    if (res.ok) {
      const created = await res.json()
      setArticles([...articles, created])
      setShowForm(false)
      setNewTitle('')
      setNewContent('')
      setNewSlug('')
    }
  }

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5025/api/articles/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    setArticles(articles.filter(a => a.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Fira Sans', fontSize: '0.82rem',
          textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--flame)' }}>
          Administration — Articles
        </h2>
        <button onClick={handleLogout} className="btn-retour">
          Déconnexion
        </button>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          fontFamily: 'Fira Sans', fontSize: '0.82rem', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.06em',
          background: 'var(--flame)', color: '#fff', border: 'none',
          padding: '0.6rem 1.2rem', cursor: 'pointer'
        }}>
        {showForm ? '✕ Annuler' : '+ Nouvel article'}
      </button>

      {showForm && (
        <div style={{ marginTop: '1.5rem', padding: '1.5rem',
          background: 'var(--surface)', borderTop: '2px solid var(--flame)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              placeholder="Titre"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              style={{ background: 'var(--card)', border: '1px solid var(--border)',
                color: 'var(--ink)', padding: '0.7rem 1rem',
                fontFamily: 'EB Garamond', fontSize: '1rem' }}
            />
            <textarea
              placeholder="Contenu"
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              rows={5}
              style={{ background: 'var(--card)', border: '1px solid var(--border)',
                color: 'var(--ink)', padding: '0.7rem 1rem',
                fontFamily: 'EB Garamond', fontSize: '1rem', resize: 'vertical' }}
            />
            <input
              placeholder="Slug (ex: mon-article)"
              value={newSlug}
              onChange={e => setNewSlug(e.target.value)}
              style={{ background: 'var(--card)', border: '1px solid var(--border)',
                color: 'var(--ink)', padding: '0.7rem 1rem',
                fontFamily: 'Fira Sans', fontSize: '0.88rem' }}
            />
            <select
              value={newLanguage}
              onChange={e => setNewLanguage(e.target.value)}
              style={{ background: 'var(--card)', border: '1px solid var(--border)',
                color: 'var(--ink)', padding: '0.7rem 1rem',
                fontFamily: 'Fira Sans', fontSize: '0.88rem' }}>
              <option value="fr">Français</option>
              <option value="tiz">Tamazight</option>
            </select>
            <button onClick={handleCreate}
              style={{ background: 'var(--flame)', color: '#fff', border: 'none',
                padding: '0.8rem', fontFamily: 'Fira Sans', fontSize: '0.88rem',
                fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '0.1em', cursor: 'pointer' }}>
              Publier l'article
            </button>
          </div>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)' }}>
            <th style={{ fontFamily: 'Fira Sans', fontSize: '0.72rem',
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'var(--ink-faint)', textAlign: 'left', padding: '0.5rem 0.7rem' }}>
              Titre
            </th>
            <th style={{ fontFamily: 'Fira Sans', fontSize: '0.72rem',
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'var(--ink-faint)', textAlign: 'left', padding: '0.5rem 0.7rem' }}>
              Langue
            </th>
            <th style={{ fontFamily: 'Fira Sans', fontSize: '0.72rem',
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'var(--ink-faint)', textAlign: 'left', padding: '0.5rem 0.7rem' }}>
              Statut
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}
              style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.8rem 0.7rem', fontFamily: 'EB Garamond',
                color: 'var(--ink)', fontSize: '1rem' }}>
                {article.title}
              </td>
              <td style={{ padding: '0.8rem 0.7rem', fontFamily: 'Fira Sans',
                fontSize: '0.78rem', color: 'var(--ink-faint)' }}>
                {article.language === 'fr' ? 'Français' : 'Tamazight'}
              </td>
              <td style={{ padding: '0.8rem 0.7rem', fontFamily: 'Fira Sans',
                fontSize: '0.78rem',
                color: article.isPublished ? 'var(--vert, #2E6E4E)' : 'var(--ink-faint)' }}>
                {article.isPublished ? '✓ Publié' : 'Brouillon'}
              </td>
              <td style={{ padding: '0.8rem 0.7rem', textAlign: 'right' }}>
                <button onClick={() => handleDelete(article.id)}
                  style={{ fontFamily: 'Fira Sans', fontSize: '0.72rem',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: '#B0413E', background: 'none', border: 'none',
                    cursor: 'pointer' }}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
