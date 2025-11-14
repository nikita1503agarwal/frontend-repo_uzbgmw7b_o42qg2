import { motion } from 'framer-motion'

export default function AnimeCard({ item, onAdd }) {
  const cover = item?.images?.jpg?.large_image_url || item?.images?.jpg?.image_url || item.image_url
  const title = item?.title || 'Unknown'
  const episodes = item?.episodes
  const score = item?.score || item?.scores?.score

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur p-3 flex flex-col"
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="mt-3 flex-1 flex flex-col">
        <h3 className="text-white font-semibold text-sm line-clamp-2">{title}</h3>
        <div className="mt-1 text-xs text-white/70">{episodes ? `${episodes} eps` : '—'}</div>
        {score && (
          <div className="mt-1 text-xs text-emerald-300">Score: {score}</div>
        )}
        {onAdd && (
          <button
            onClick={() => onAdd(item)}
            className="mt-3 bg-white text-black text-sm rounded-md py-1.5 hover:bg-emerald-300 transition"
          >
            Add to History
          </button>
        )}
      </div>
    </motion.div>
  )
}
