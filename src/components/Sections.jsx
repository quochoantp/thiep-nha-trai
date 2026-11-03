import { useEffect, useState } from 'react'
import { useInvitation } from '../context'
import { dotted, mapLink, pad, parseDate, timeLeft, weekdayUpper } from '../utils/date'
import { BranchLeft, EnvelopeBack, EnvelopeFront, OrchidsRight, Petals, Swans } from './Decor'
import { Lines, Photo, Reveal } from './ui'

/* =========================================================
   0. MÀN MỞ THIỆP
   ========================================================= */
export function Opening({ onOpen }) {
  const { content, images } = useInvitation()
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className={'opening' + (leaving ? ' is-leaving' : '')}>
      <picture className="cover-img">
        <source media="(min-width: 900px)" srcSet={images.heroWide.srcSet} sizes="100vw" />
        {/* màn mở thiệp cao hơn tỉ lệ ảnh nên ảnh tràn rộng hơn màn hình */}
        <img src={images.hero.src} srcSet={images.hero.srcSet} sizes="150vw" alt="" />
      </picture>
      <div className="opening-inner">
        <p className="opening-eyebrow">{content.opening.eyebrow}</p>
        <p className="script-thin opening-script">{content.hero.script}</p>
        <p className="serif-caps opening-names">
          {content.groom.name} <span>&amp;</span> {content.bride.name}
        </p>
        <p className="opening-date">{dotted(parseDate(content.mainDate))}</p>
        <button
          className="btn btn-light"
          onClick={() => {
            setLeaving(true)
            onOpen()
          }}
        >
          {content.opening.button}
        </button>
      </div>
    </div>
  )
}

/* =========================================================
   1. BÌA — "Wedding"
   ========================================================= */
export function Hero({ started }) {
  const { content, images } = useInvitation()
  return (
    <section className={'hero' + (started ? ' is-started' : '')}>
      <picture className="hero-img">
        <source media="(min-width: 900px)" srcSet={images.heroWide.srcSet} sizes="100vw" />
        <img src={images.hero.src} srcSet={images.hero.srcSet} sizes="110vw" alt={content.groom.name + ' & ' + content.bride.name} />
      </picture>
      <div className="hero-shade" />
      {content.hero.petals && <Petals />}
      <div className="hero-text">
        <h1 className="script-thin hero-script">{content.hero.script}</h1>
        <p className="serif-caps hero-name">{content.groom.name}</p>
        <p className="serif-caps hero-name">{content.bride.name}</p>
      </div>
    </section>
  )
}

/* =========================================================
   2. SAVE THE DATE — phong bì
   ========================================================= */
export function SaveTheDate() {
  const { content, images } = useInvitation()
  const s = content.saveTheDate

  return (
    <section className="std">
      <div className="container std-grid">
        <div className="std-head">
          <Reveal as="h2" className="std-title" effect="left">
            <span className="serif-caps">{s.titleTop}</span>
            <span className="std-title-row">
              <em className="script-thin">{s.titleScript}</em>
              <span className="serif-caps">{s.titleBottom}</span>
            </span>
          </Reveal>
          <Reveal as="p" className="std-date std-date--desk serif-light" effect="up" delay={200}>
            {dotted(parseDate(content.mainDate))}
          </Reveal>
        </div>

        <Reveal className="envelope" effect="zoom" duration={1200}>
          <BranchLeft className="decor-left" />
          <div className="env-box">
            <EnvelopeBack />
            <div className="env-photo">
              <Photo image={images.envelope} sizes="(min-width: 900px) 250px, 40vw" alt="" />
            </div>
            <EnvelopeFront />
          </div>
          <OrchidsRight className="decor-right" />
        </Reveal>

        <Reveal as="p" className="std-date std-date--mobile serif-light" effect="up">
          {dotted(parseDate(content.mainDate))}
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   3. ĐẾM NGƯỢC
   ========================================================= */
export function Countdown() {
  const { content } = useInvitation()
  const c = content.countdown
  const target = new Date(content.countdownTo).getTime()
  const [left, setLeft] = useState(() => timeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setLeft(timeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const values = [left.days, left.hours, left.minutes, left.seconds]
  return (
    <section className="countdown">
      <Reveal as="h2" className="script countdown-title" effect="wipe" duration={1600}>
        {c.title}
      </Reveal>
      {left.done ? (
        <p className="serif countdown-done">{c.done}</p>
      ) : (
        <Reveal className="countdown-grid" effect="up" delay={200}>
          {values.map((v, i) => (
            <div key={i} className="countdown-cell">
              <span className="countdown-num">{v}</span>
              <span className="countdown-unit">{c.units[i]}</span>
            </div>
          ))}
        </Reveal>
      )}
    </section>
  )
}

/* =========================================================
   4. LỜI MỜI & SỰ KIỆN
   ========================================================= */
function EventBlock({ ev, index }) {
  const d = parseDate(ev.date)
  return (
    <Reveal className="event" effect="up" delay={index * 120}>
      <h3 className="serif-caps event-title">{ev.title}</h3>
      <p className="serif event-when">
        ĐƯỢC TỔ CHỨC VÀO LÚC {ev.time}, {weekdayUpper(d)}
      </p>
      <div className="event-date">
        <span className="serif event-side">THÁNG {pad(d.getMonth() + 1)}</span>
        <span className="event-day">{pad(d.getDate())}</span>
        <span className="serif event-side">NĂM {d.getFullYear()}</span>
      </div>
      <p className="serif event-lunar">{ev.lunar}</p>
      <p className="serif-caps event-place">{ev.place}</p>
      <p className="serif event-address">{ev.address}</p>
    </Reveal>
  )
}

export function Events() {
  const { content } = useInvitation()
  const inv = content.invitation
  return (
    <section className="events">
      <div className="container">
        <Reveal effect="up">
          <Lines lines={inv.heading} className="serif-caps events-heading" />
        </Reveal>
        <div className="events-grid">
          {inv.events.map((ev, i) => (
            <div key={ev.title + i} className="events-item">
              {i > 0 && (
                <Reveal className="events-divider" effect="zoom">
                  <Swans />
                </Reveal>
              )}
              <EventBlock ev={ev} index={i} />
            </div>
          ))}
        </div>
        <Reveal as="p" className="script events-closing" effect="up">
          {inv.closing}
        </Reveal>
        <div className="families">
          {inv.families.map((f, i) => (
            <Reveal key={f.label} className="family" effect="up" delay={i * 120}>
              <h3 className="script-thin family-label">{f.label}</h3>
              <Lines lines={f.parents} className="serif-caps family-parents" />
              <Lines lines={f.address} className="serif family-address" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   5. CÔ DÂU CHÚ RỂ & CÂU CHUYỆN
   ========================================================= */
export function Couple() {
  const { content, images } = useInvitation()
  const people = [
    { p: content.groom, img: images.groom },
    { p: content.bride, img: images.bride },
  ]
  return (
    <section className="couple">
      <img className="couple-bg" src={images.coupleBg.src} srcSet={images.coupleBg.srcSet} sizes="100vw" alt="" loading="lazy" decoding="async" />
      <div className="couple-inner container">
        <div className="couple-grid">
          {people.map(({ p, img }, i) => (
            <Reveal key={p.name} className="couple-card" effect={i === 0 ? 'left' : 'right'} duration={1200}>
              <div className="frame">
                <Photo image={img} sizes="(min-width: 900px) 375px, 46vw" alt={p.title + ' ' + p.name} />
              </div>
              <p className="script-thin couple-title">{p.title}</p>
              <p className="serif-caps couple-name">{p.name}</p>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="couple-story" effect="up">
          {content.story}
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   6. GOLDEN HOUR OF LOVE — album ghép
   ========================================================= */
const PATTERN = ['wide', 'big', 'small', 'small', 'tall', 'tall', 'tall', 'tall']
// Bề rộng hiển thị của từng kiểu ô, để trình duyệt chọn đúng cỡ ảnh
const GALLERY_SIZES = {
  wide: '(min-width: 1120px) 1040px, 100vw',
  big: '(min-width: 1120px) 690px, 67vw',
  small: '(min-width: 1120px) 340px, 33vw',
  tall: '(min-width: 1120px) 515px, 50vw',
}

export function Album() {
  const { content, images } = useInvitation()
  const a = content.album
  return (
    <section className="album">
      <div className="container album-head">
        <Reveal as="h2" className="album-title" effect="left">
          <span className="serif-caps">{a.titleLeft}</span> <em className="script-thin">{a.titleScript}</em>{' '}
          <span className="serif-caps">{a.titleRight}</span>
        </Reveal>
        <Reveal as="p" className="serif album-text" effect="up" delay={150}>
          {a.text}
        </Reveal>
      </div>
      <div className="container gallery">
        {images.gallery.map((image, i) => {
          const kind = PATTERN[i % PATTERN.length]
          return (
            <Reveal key={image.src} className={'g-item g-' + kind} effect={i % 2 ? 'right' : 'left'} duration={1100}>
              <Photo image={image} sizes={GALLERY_SIZES[kind]} alt={'Ảnh cưới ' + (i + 1)} />
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* =========================================================
   7. ĐƯỜNG ĐẾN HÔN LỄ — mã QR bản đồ
   ========================================================= */
export function Venue() {
  const { content, images } = useInvitation()
  const v = content.venue
  const href = mapLink(v.address, v.mapUrl)
  return (
    <section className="venue" id="venue">
      <div className="container venue-grid">
        <Reveal effect="up">
          <Lines lines={v.intro} className="serif venue-intro" />
        </Reveal>

        <Reveal className="venue-card" effect="zoom" delay={100}>
          <h2 className="serif venue-title">{v.title}</h2>
          <a className="venue-qr" href={href} target="_blank" rel="noreferrer">
            <img src={images.qrLocation} alt={'Mã QR bản đồ đường đến ' + v.place} />
          </a>
          <p className="venue-note">{v.note}</p>
          <p className="serif-caps venue-place">{v.place}</p>
          <p className="serif venue-address">{v.address}</p>
          <a className="btn btn-brown" href={href} target="_blank" rel="noreferrer">
            {v.button}
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   8. THANK YOU
   ========================================================= */
export function ThankYou() {
  const { content, images } = useInvitation()
  return (
    <section className="thanks">
      <img src={images.thankYou.src} srcSet={images.thankYou.srcSet} sizes="100vw" alt="" loading="lazy" decoding="async" />
      <Reveal as="p" className="script-thin thanks-text" effect="wipe" duration={1800}>
        {content.thankYou}
      </Reveal>
    </section>
  )
}
