const WEEKDAYS = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY']

export const pad = (n) => (n < 10 ? '0' + n : String(n))

/** 'YYYY-MM-DD' -> Date theo giờ địa phương */
export function parseDate(str) {
  const p = str.split('-').map(Number)
  return new Date(p[0], p[1] - 1, p[2])
}

export const weekdayUpper = (d) => WEEKDAYS[d.getDay()]

/** 29.01.2027 */
export const dotted = (d) => pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear()

export function timeLeft(target) {
  const ms = Math.max(0, target - Date.now())
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    done: ms === 0,
  }
}

export function mapLink(address, mapUrl) {
  return mapUrl || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address)
}
