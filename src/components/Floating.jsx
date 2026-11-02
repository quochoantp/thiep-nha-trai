import { useCallback, useEffect, useRef, useState } from 'react'
import { useInvitation } from '../context'
import { Icon } from './ui'

/* ---------- Biểu tượng màu ---------- */
function HeartsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M9 19s-7-4.4-7-9.2C2 7.4 3.8 6 5.7 6c1.4 0 2.6.8 3.3 2 .7-1.2 1.9-2 3.3-2C14.2 6 16 7.4 16 9.8 16 14.6 9 19 9 19z" fill="#f472b6" />
      <path d="M17 9s-3.5-2.2-3.5-4.6c0-1.2.9-1.9 1.9-1.9.7 0 1.3.4 1.6 1 .3-.6.9-1 1.6-1 1 0 1.9.7 1.9 1.9C20.5 6.8 17 9 17 9z" fill="#fb7185" />
    </svg>
  )
}

/* ---------- Tim bay lên ---------- */
function useHeartBurst() {
  const [hearts, setHearts] = useState([])
  const idRef = useRef(0)

  const burst = useCallback((x, y) => {
    const batch = Array.from({ length: 12 }, () => {
      idRef.current += 1
      return {
        id: idRef.current,
        x: x,
        y: y,
        dx: (Math.random() * 2 - 1) * 90,
        rise: 180 + Math.random() * 220,
        size: 14 + Math.random() * 18,
        delay: Math.random() * 250,
        hue: ['#f43f5e', '#fb7185', '#f472b6', '#e11d48', '#fda4af'][Math.floor(Math.random() * 5)],
      }
    })
    setHearts((h) => h.concat(batch))
    const ids = batch.map((b) => b.id)
    setTimeout(() => setHearts((h) => h.filter((it) => ids.indexOf(it.id) === -1)), 2600)
  }, [])

  const layer = (
    <div className="heart-layer" aria-hidden="true">
      {hearts.map((h) => (
        <svg
          key={h.id}
          className="fly-heart"
          viewBox="0 0 24 22"
          style={{
            left: h.x + 'px',
            top: h.y + 'px',
            width: h.size + 'px',
            height: h.size + 'px',
            fill: h.hue,
            animationDelay: h.delay + 'ms',
            '--dx': h.dx + 'px',
            '--rise': -h.rise + 'px',
          }}
        >
          <path d="M12 21.5S1.5 14.8 1.5 7.6C1.5 4 4.2 1.5 7.3 1.5c2 0 3.7 1 4.7 2.6 1-1.6 2.7-2.6 4.7-2.6 3.1 0 5.8 2.5 5.8 6.1 0 7.2-10.5 13.9-10.5 13.9z" />
        </svg>
      ))}
    </div>
  )
  return [burst, layer]
}

/* ---------- Nút nhạc ---------- */
export function MusicButton({ playing, onToggle }) {
  return (
    <button className={'music-btn' + (playing ? ' is-playing' : '')} onClick={onToggle} aria-label={playing ? 'Tắt nhạc' : 'Bật nhạc'}>
      <Icon name="music" size={18} />
      {!playing && <span className="music-off" />}
    </button>
  )
}

/* ---------- Thanh nổi phía dưới ---------- */
export function BottomBar() {
  const { content } = useInvitation()
  const bar = content.bar
  const [burst, layer] = useHeartBurst()

  const shoot = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    burst(r.left + r.width / 2, r.top)
  }

  const goVenue = () => {
    const el = document.getElementById('venue')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="bottombar">
        <button className="bar-pill" onClick={goVenue}>
          <Icon name="pin" size={18} />
          <span>{bar.directions}</span>
        </button>
        <span className="bar-spacer" />
        <button className="bar-pill bar-hearts" onClick={shoot}>
          <HeartsIcon />
          <span>{bar.hearts}</span>
        </button>
      </div>
      {layer}
    </>
  )
}

/* ---------- Xem ảnh lớn (vuốt / phím mũi tên để chuyển ảnh) ---------- */
export function Lightbox({ list, index, onClose, onMove }) {
  const startX = useRef(null)

  useEffect(() => {
    if (index === null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onMove(-1)
      if (e.key === 'ArrowRight') onMove(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose, onMove])

  if (index === null) return null
  return (
    <div
      className="lightbox"
      onClick={onClose}
      onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (startX.current === null) return
        const dx = e.changedTouches[0].clientX - startX.current
        if (Math.abs(dx) > 50) onMove(dx > 0 ? -1 : 1)
        startX.current = null
      }}
    >
      <img src={list[index].src} srcSet={list[index].srcSet} sizes="min(100vw, 1100px)" alt="" onClick={(e) => e.stopPropagation()} />
      <button className="lb-btn lb-close" onClick={onClose} aria-label="Đóng">
        <Icon name="close" size={22} />
      </button>
      {list.length > 1 && (
        <>
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); onMove(-1) }} aria-label="Ảnh trước">
            ‹
          </button>
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); onMove(1) }} aria-label="Ảnh sau">
            ›
          </button>
          <span className="lb-count">
            {index + 1} / {list.length}
          </span>
        </>
      )}
    </div>
  )
}
