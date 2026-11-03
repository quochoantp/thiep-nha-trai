import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { InvitationContext } from './context'
import { useAutoScroll } from './utils/useAutoScroll'
import { Album, Countdown, Couple, Events, Hero, Opening, SaveTheDate, ThankYou, Venue } from './components/Sections'
import { BottomBar, Lightbox, MusicButton } from './components/Floating'

/**
 * Thiệp cưới. Nhận 3 nguồn dữ liệu qua props:
 *   content – chữ, thông điệp, ngày giờ   (src/config/content.js)
 *   images  – ảnh + album                  (src/assets/images/index.js)
 *   audio   – nhạc nền                     (src/config/audio.js)
 */
export default function WeddingInvitation({ content, images, audio }) {
  const audioRef = useRef(null)
  const [opened, setOpened] = useState(!content.opening.enabled)
  const [started, setStarted] = useState(!content.opening.enabled)
  const [playing, setPlaying] = useState(false)
  const [lbIndex, setLbIndex] = useState(null)

  const hasAudio = !!(audio && audio.enabled && audio.src)

  // Nhạc phát ngay khi bấm "Mở thiệp", còn màn mở thiệp mất thêm 1 giây mới tắt
  const scroll = content.autoScroll
  useAutoScroll(scroll.enabled && opened && lbIndex === null, scroll.seconds - (content.opening.enabled ? 1 : 0))

  // Tất cả ảnh có thể phóng to, theo thứ tự xuất hiện — để lướt qua lại trong lightbox
  const allPhotos = useMemo(
    () => [images.envelope, images.groom, images.bride].concat(images.gallery),
    [images]
  )

  useEffect(() => {
    document.title = content.groom.name + ' & ' + content.bride.name + ' — Thiệp mời cưới'
  }, [content.groom.name, content.bride.name])

  useEffect(() => {
    if (audioRef.current && audio) audioRef.current.volume = audio.volume == null ? 0.6 : audio.volume
  }, [audio])

  const play = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    const p = el.play()
    if (p && p.then) p.then(() => setPlaying(true), () => setPlaying(false))
  }, [])

  // Không dùng màn mở thiệp: phát nhạc ở lần chạm đầu tiên
  useEffect(() => {
    if (content.opening.enabled || !hasAudio) return undefined
    const once = () => {
      play()
      window.removeEventListener('pointerdown', once)
    }
    window.addEventListener('pointerdown', once)
    return () => window.removeEventListener('pointerdown', once)
  }, [content.opening.enabled, hasAudio, play])

  const handleOpen = () => {
    play()
    setStarted(true)
    setTimeout(() => setOpened(true), 1000)
  }

  const toggleMusic = () => {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      play()
    }
  }

  const openLightbox = useCallback(
    (image) => {
      const i = allPhotos.indexOf(image)
      setLbIndex(i === -1 ? null : i)
    },
    [allPhotos]
  )
  const moveLightbox = useCallback(
    (step) => setLbIndex((i) => (i === null ? null : (i + step + allPhotos.length) % allPhotos.length)),
    [allPhotos.length]
  )
  const closeLightbox = useCallback(() => setLbIndex(null), [])

  const ctx = useMemo(
    () => ({
      content,
      images,
      audio,
      openLightbox,
    }),
    [content, images, audio, openLightbox]
  )

  return (
    <InvitationContext.Provider value={ctx}>
      {hasAudio && <audio ref={audioRef} src={audio.src} loop={audio.loop !== false} preload="auto" />}
      {!opened && <Opening onOpen={handleOpen} />}

      <main className="page">
        <Hero started={started} />
        <SaveTheDate />
        <Countdown />
        <Events />
        <Couple />
        <Album />
        <Venue />
        <ThankYou />
      </main>

      {hasAudio && <MusicButton playing={playing} onToggle={toggleMusic} />}
      <BottomBar />

      <Lightbox list={allPhotos} index={lbIndex} onClose={closeLightbox} onMove={moveLightbox} />
    </InvitationContext.Provider>
  )
}
