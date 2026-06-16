import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Article {
  id: number
  title: string
  content: string
  language: string
  slug: string
  isPublished: boolean
  publishedAt: string
  author: { name: string; lastName: string } | null
  category: { name: string; color: string } | null
}

function getBadgeStyle(categoryName: string): React.CSSProperties {
  const styles: Record<string, React.CSSProperties> = {
    'Tribune':         { color: '#7e22ce', background: '#fdf4ff' },
    'Éditorial':       { color: '#9d174d', background: '#fdf2f8' },
    'Chronique':       { color: '#b45309', background: '#fef3c7' },
    'Grand entretien': { color: '#0066cc', background: '#e8f0ff' },
    'Dossier':         { color: '#0f766e', background: '#e0f2f1' },
    'Critique':        { color: '#BF5700', background: '#fff3e0' },
    'Plumes':          { color: '#1e40af', background: '#eff6ff' },
    'Rencontre':       { color: '#007a3d', background: '#e8f5ee' },
  }
  return styles[categoryName] || { color: '#374151', background: '#f3f4f6' }
}

function ArticleCard({ article }: { article: Article }) {
  const navigate = useNavigate()

  return (
    <div className="card" onClick={() => navigate(`/articles/${article.id}`)}
      style={{ cursor: 'pointer' }}>
      <div className="card-image" />
      <div className="card-body">
        {article.category && (
          <span className="badge" style={getBadgeStyle(article.category.name)}>
            {article.category.name}
          </span>
        )}
        <h2 className="card-title">{article.title}</h2>
        <p className="card-excerpt">{article.content.slice(0, 120)}...</p>
        <div className="card-meta">
          {article.author && (
            <span className="card-author">
              {article.author.name} {article.author.lastName}
            </span>
          )}
          <span className="card-lang">
            {article.language === 'fr' ? 'Français' : 'Tamazight'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://tangalt-dotnet-rebuild-production.up.railway.app/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data)
        setLoading(false)
      })
  }, [])

  return (
    <main className="main">
      <h2 className="section-title">Cette semaine</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  )
}