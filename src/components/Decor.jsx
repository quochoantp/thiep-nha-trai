/**
 * Hình trang trí vẽ bằng SVG (tự vẽ, không dùng ảnh ngoài):
 * phong bì + dấu sáp, cành hoa, đôi thiên nga, cánh hoa rơi.
 */
import { useMemo } from 'react'

/* ---------- Phong bì: 2 lớp, ảnh nằm kẹp giữa ---------- */
export function EnvelopeBack() {
  return (
    <svg className="env-svg env-back" viewBox="0 0 400 300" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="liner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a3d2b" />
          <stop offset="1" stopColor="#7a5640" />
        </linearGradient>
      </defs>
      {/* nắp mở hất lên phía sau */}
      <path d="M6 118 L200 14 L394 118 Z" fill="#efe6d6" />
      <path d="M22 118 L200 26 L378 118 Z" fill="url(#liner)" />
      {/* thân sau */}
      <rect x="6" y="116" width="388" height="180" rx="4" fill="#e7dcc8" />
      <rect x="18" y="118" width="364" height="60" fill="#6a4a36" opacity="0.85" />
    </svg>
  )
}

export function EnvelopeFront() {
  return (
    <svg className="env-svg env-front" viewBox="0 0 400 300" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6f0e4" />
          <stop offset="1" stopColor="#e2d6c1" />
        </linearGradient>
        <radialGradient id="wax" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ead9a6" />
          <stop offset="0.55" stopColor="#c6a35e" />
          <stop offset="1" stopColor="#8c6c33" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* túi trước hình chữ V */}
      <path d="M6 128 L200 222 L394 128 L394 292 Q394 296 390 296 L10 296 Q6 296 6 292 Z" fill="url(#paper)" />
      <path d="M6 296 L172 206 M394 296 L228 206" stroke="#cdbfa6" strokeWidth="1.2" fill="none" />
      <path d="M6 128 L200 222 L394 128" stroke="#d5c8b0" strokeWidth="1.4" fill="none" />
      {/* dấu sáp */}
      <g filter="url(#soft)">
        <path
          d="M200 178c9 0 13 5 20 6 8 2 13 7 14 15 1 7-3 11-3 18 0 8-6 13-14 15-7 2-10 6-17 6s-11-4-18-6c-8-2-13-7-14-15 0-7-4-11-3-18 1-8 7-13 14-15 7-1 12-6 21-6z"
          fill="url(#wax)"
        />
        <circle cx="200" cy="211" r="22" fill="none" stroke="#9c7a3b" strokeWidth="2" />
        <circle cx="200" cy="211" r="16" fill="none" stroke="#e9d8a8" strokeWidth="1" strokeDasharray="2 3" />
      </g>
    </svg>
  )
}

/* ---------- Cành hoa (bên trái): nụ xanh + hoa trắng ---------- */
export function BranchLeft({ className = '' }) {
  return (
    <svg className={'decor ' + className} viewBox="0 0 160 420" aria-hidden="true">
      <path d="M90 410 C70 330 96 260 80 190 C66 128 84 70 120 20" stroke="#7d9a52" strokeWidth="3" fill="none" />
      {[
        [118, 26, -30],
        [104, 58, -50],
        [92, 92, -20],
        [80, 130, -60],
        [76, 172, -25],
      ].map(([x, y, r], i) => (
        <g key={i} transform={'translate(' + x + ' ' + y + ') rotate(' + r + ')'}>
          <ellipse rx="26" ry="11" fill="#9db66b" />
          <ellipse rx="22" ry="6" cx="-3" fill="#c3d79a" />
        </g>
      ))}
      {[
        [64, 230],
        [96, 268],
        [70, 310],
      ].map(([x, y], i) => (
        <g key={i} transform={'translate(' + x + ' ' + y + ')'}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} rx="9" ry="16" cy="-12" fill="#fbfaf5" stroke="#e3e0cf" transform={'rotate(' + a + ')'} />
          ))}
          <circle r="4" fill="#d9c56a" />
        </g>
      ))}
      {[[86, 350], [98, 380]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="6" ry="10" fill="#a8c174" />
      ))}
    </svg>
  )
}

/* ---------- Chùm lan trắng (bên phải) ---------- */
export function OrchidsRight({ className = '' }) {
  const flowers = [
    [70, 60, 1],
    [104, 92, 0.9],
    [60, 120, 0.85],
    [96, 150, 1],
    [72, 190, 0.8],
    [110, 220, 0.75],
  ]
  return (
    <svg className={'decor ' + className} viewBox="0 0 160 280" aria-hidden="true">
      <path d="M140 0 C110 60 120 140 86 200 C70 230 90 260 80 280" stroke="#8aa45e" strokeWidth="2.4" fill="none" />
      {flowers.map(([x, y, s], i) => (
        <g key={i} transform={'translate(' + x + ' ' + y + ') scale(' + s + ')'}>
          {[0, 72, 144, 216, 288].map((a) => (
            <path
              key={a}
              d="M0 0 C-10 -8 -12 -26 0 -32 C12 -26 10 -8 0 0z"
              fill="#fffdf8"
              stroke="#e6e1d2"
              strokeWidth="1"
              transform={'rotate(' + (a + i * 9) + ')'}
            />
          ))}
          <circle r="5" fill="#e9d98a" />
          <circle r="2" fill="#b98c4c" />
        </g>
      ))}
    </svg>
  )
}

/* ---------- Đôi thiên nga làm vạch phân cách ---------- */
export function Swans({ className = '' }) {
  return (
    <svg className={'swans ' + className} viewBox="0 0 120 70" aria-hidden="true">
      <g fill="#fbf8f1" stroke="#b9ad98" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M58 58 C40 62 14 58 8 46 C20 46 30 40 34 32 C36 22 30 14 36 8 C42 2 52 6 52 14 C52 22 44 26 46 36 C48 44 54 50 58 58z" />
        <path d="M62 58 C80 62 106 58 112 46 C100 46 90 40 86 32 C84 22 90 14 84 8 C78 2 68 6 68 14 C68 22 76 26 74 36 C72 44 66 50 62 58z" />
      </g>
      <path d="M36 9 l-4 -2 M84 9 l4 -2" stroke="#9b6b3e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- Cánh hoa rơi ---------- */
export function Petals({ count = 22 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        size: 6 + Math.random() * 9,
        delay: -Math.random() * 14,
        duration: 9 + Math.random() * 9,
        drift: (Math.random() * 2 - 1) * 80,
        opacity: 0.55 + Math.random() * 0.4,
        key: i,
      })),
    [count]
  )
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <i
          key={p.key}
          style={{
            left: p.left + '%',
            width: p.size + 'px',
            height: p.size * 0.7 + 'px',
            opacity: p.opacity,
            animationDelay: p.delay + 's',
            animationDuration: p.duration + 's',
            '--drift': p.drift + 'px',
          }}
        />
      ))}
    </div>
  )
}
