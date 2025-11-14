import { useEffect, useState } from 'react'
import AnimeCard from './AnimeCard'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function Suggestions() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/suggestions`)
        const data = await res.json()
        setItems(data?.data || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-white text-xl font-semibold mb-4">Trending Suggestions</h2>
      {loading ? (
        <div className="text-white/70">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <AnimeCard key={item.mal_id} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}

export function Discover({ query }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) return
    const controller = new AbortController()
    const run = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${BACKEND}/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setItems(data?.data || [])
      } catch (e) {
        if (e.name !== 'AbortError') console.error(e)
      } finally {
        setLoading(false)
      }
    }
    run()
    return () => controller.abort()
  }, [query])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-white text-xl font-semibold mb-4">Discover</h2>
      {loading && <div className="text-white/70">Searching...</div>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <AnimeCard key={item.mal_id} item={item} />
        ))}
      </div>
    </section>
  )
}

export function History({ userId }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/watch/${userId}`)
        const data = await res.json()
        setItems(data || [])
      } catch (e) {
        console.error(e)
      }
    }
    run()
  }, [userId])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-white text-xl font-semibold mb-4">Your History</h2>
      {items.length === 0 ? (
        <div className="text-white/70">No history yet. Add some anime from Discover.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <AnimeCard key={item._id} item={{ title: item.title, images: { jpg: { image_url: item.image_url } }, episodes: item.total_episodes, score: item.score }} />
          ))}
        </div>
      )}
    </section>
  )
}

export function Stats({ userId }) {
  const [stats, setStats] = useState({ count: 0, avg: 0, completed: 0 })

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/rate/${userId}`)
        const data = await res.json()
        const count = data.length
        const avg = count ? (data.reduce((a, b) => a + (b.score || 0), 0) / count).toFixed(2) : 0
        setStats({ count, avg, completed: count })
      } catch (e) {
        console.error(e)
      }
    }
    run()
  }, [userId])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-white text-xl font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white">
          <div className="text-sm text-white/70">Total Ratings</div>
          <div className="text-3xl font-bold">{stats.count}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white">
          <div className="text-sm text-white/70">Average Score</div>
          <div className="text-3xl font-bold">{stats.avg}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white">
          <div className="text-sm text-white/70">Completed</div>
          <div className="text-3xl font-bold">{stats.completed}</div>
        </div>
      </div>
    </section>
  )
}
