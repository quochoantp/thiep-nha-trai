import { useEffect, useRef, useState } from 'react'
import { useInvitation } from '../context'

/**
 * Hiện dần khi cuộn tới.
 * effect: 'up' | 'left' | 'right' | 'zoom' | 'fade' | 'wipe'
 */
export function Reveal({ as, effect = 'up', delay = 0, duration, className = '', style, children, ...rest }) {
  const Tag = as || 'div'
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const s = Object.assign({}, style, { transitionDelay: delay + 'ms' })
  if (duration) s.transitionDuration = duration + 'ms'

  return (
    <Tag ref={ref} className={'reveal reveal--' + effect + (shown ? ' is-in' : '') + ' ' + className} style={s} {...rest}>
      {children}
    </Tag>
  )
}

/** Ảnh bấm để phóng to */
export function Photo({ image, sizes = '100vw', alt = '', className = '', ...rest }) {
  const { openLightbox } = useInvitation()
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={'photo ' + className}
      onClick={() => openLightbox(image)}
      {...rest}
    />
  )
}

export function Lines({ lines, className = '', as }) {
  const Tag = as || 'p'
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="line">
          {l}{' '}
        </span>
      ))}
    </Tag>
  )
}

const ICONS = {
  close: <path d="M6 6l12 12M18 6L6 18" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </>
  ),
}

export function Icon({ name, size = 20 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}
