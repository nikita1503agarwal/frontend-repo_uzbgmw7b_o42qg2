import { useState } from 'react'
import { Menu, Search, Sparkles, BarChart3, Clock } from 'lucide-react'

export default function Navbar({ active, onChange, onSearch }) {
  const [query, setQuery] = useState('')

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: Sparkles },
    { key: 'discover', label: 'Discover', icon: Search },
    { key: 'stats', label: 'Statistics', icon: BarChart3 },
    { key: 'history', label: 'History', icon: Clock },
  ]

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-white/10 transition">
          <Menu className="w-5 h-5 text-white/80" />
        </button>
        <div className="text-white font-semibold tracking-wide">AniTrack</div>

        <nav className="hidden md:flex items-center gap-1 ml-4">
          {tabs.map((t) => {
            const Icon = t.icon
            const isActive = active === t.key
            return (
              <button
                key={t.key}
                onClick={() => onChange(t.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
                  isActive ? 'bg-white text-black' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            )
          })}
        </nav>

        <div className="ml-auto flex-1 max-w-md">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && onSearch) onSearch(query)
              }}
              placeholder="Search anime titles..."
              className="w-full bg-white/5 text-white placeholder-white/50 rounded-md pl-10 pr-3 py-2 outline-none border border-white/10 focus:border-white/30"
            />
            <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </header>
  )
}
