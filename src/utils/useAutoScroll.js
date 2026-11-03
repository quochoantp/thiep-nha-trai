import { useEffect, useRef } from 'react'

const RESUME_AFTER = 5000 // khách ngừng thao tác bao lâu thì cuộn tiếp (ms)
const MAX_STEP = 100 // tab bị ẩn thì dừng lại, không nhảy cóc khi quay về (ms)

/** Cuộn chậm từ đầu tới cuối trang trong `seconds` giây; dừng khi khách tự thao tác. */
export function useAutoScroll(active, seconds) {
  const finished = useRef(false)

  useEffect(() => {
    if (!active || finished.current) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const root = document.documentElement
    const prevBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto' // CSS đang đặt smooth, sẽ làm chậm từng bước cuộn

    let y = window.scrollY
    let last = performance.now()
    let pausedUntil = 0
    let frame = 0

    const pause = () => {
      pausedUntil = performance.now() + RESUME_AFTER
    }

    const step = (now) => {
      const dt = Math.min(now - last, MAX_STEP)
      last = now

      // Lệch vị trí nghĩa là khách vừa kéo thanh cuộn hoặc bấm nút cuộn tới một phần
      if (Math.abs(window.scrollY - y) > 3) {
        y = window.scrollY
        pause()
      }

      if (now >= pausedUntil) {
        const max = root.scrollHeight - window.innerHeight
        y = Math.min(y + (max / seconds) * (dt / 1000), max)
        window.scrollTo(0, y)
        if (y >= max) {
          finished.current = true
          return
        }
      }
      frame = requestAnimationFrame(step)
    }

    const events = ['wheel', 'touchstart', 'touchmove', 'pointerdown', 'keydown']
    events.forEach((name) => window.addEventListener(name, pause, { passive: true }))
    frame = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frame)
      events.forEach((name) => window.removeEventListener(name, pause))
      root.style.scrollBehavior = prevBehavior
    }
  }, [active, seconds])
}
