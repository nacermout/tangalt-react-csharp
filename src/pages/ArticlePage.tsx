import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface Article {
  id: number
  title: string
  content: string
  language: string
  publishedAt: string
  author: { name: string; lastName: string } | null
  category: { name: string; color: string } | null
}

export default function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:5025/api/articles/${id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p style={{ padding: '2rem', color: 'var(--ink)' }}>Chargement...</p>
  if (!article) return <p style={{ padding: '2rem', color: 'var(--ink)' }}>Article introuvable.</p>

  return (
    <article style={{ maxWidth: '740px', margin: '0 auto', padding: '3rem 2rem' }}>
      <button onClick={() => navigate(-1)} className="btn-retour">
        ← Retour
      </button>
      {article.category && (
        <p style={{ color: 'var(--flame)', fontFamily: 'Fira Sans', fontSize: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1.5rem' }}>
          {article.category.name}
        </p>
      )}
      <h1 style={{ fontFamily: 'EB Garamond', fontSize: '2.2rem', fontWeight: 700,
        color: 'var(--ink)', lineHeight: 1.2, marginTop: '0.8rem' }}>
        {article.title}
      </h1>
      {article.author && (
        <p style={{ fontFamily: 'Fira Sans', fontSize: '0.85rem',
          color: 'var(--ember)', marginTop: '1rem' }}>
          {article.author.name} {article.author.lastName}
        </p>
      )}
      <div style={{ marginTop: '2.5rem', fontFamily: 'EB Garamond',
        fontSize: '1.1rem', lineHeight: 1.75, color: 'var(--ink)' }}>
        {article.content}
      </div>
    </article>
  )
}