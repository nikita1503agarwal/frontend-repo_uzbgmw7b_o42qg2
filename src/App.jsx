import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Suggestions, Discover, History, Stats } from './components/Sections'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [active, setActive] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const existing = localStorage.getItem('anitrack_user')
    if (existing) setUserId(existing)
    else {
      const id = `guest-${Math.random().toString(36).slice(2, 10)}`
      localStorage.setItem('anitrack_user', id)
      setUserId(id)
    }
  }, [])

  const onSearch = (q) => {
    setSearch(q)
    setActive('discover')
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar active={active} onChange={setActive} onSearch={onSearch} />
      <AnimatePresence mode="wait">
        {active === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Hero />
            <Suggestions />
          </motion.div>
        )}

        {active === 'discover' && (
          <motion.div
            key="discover"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Discover query={search} />
          </motion.div>
        )}

        {active === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <History userId={userId} />
          </motion.div>
        )}

        {active === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Stats userId={userId} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/10 mt-12 py-6 text-center text-white/50">
        Built with Jikan API • AniTrack
      </footer>
    </div>
  )
}

export default App
