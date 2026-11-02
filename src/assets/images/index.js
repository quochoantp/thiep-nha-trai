/**
 * ============================================================
 *  ẢNH CỦA THIỆP — tất cả nằm trong thư mục này (src/assets/images)
 * ============================================================
 *  Cách thay: chép ảnh của bạn ĐÈ LÊN file cùng tên.
 *  Muốn dùng tên/đuôi khác (.png, .webp…) thì sửa dòng import tương ứng.
 *
 *  hero.jpg          Ảnh bìa trên ĐIỆN THOẠI (dọc ~ 3:4.4)
 *  hero-wide.jpg     Ảnh bìa trên MÁY TÍNH (ngang ~ 16:9)
 *  envelope.jpg      Ảnh nhỏ trồi ra từ phong bì "Save the date" (dọc ~ 2:3)
 *  couple-bg.jpg     Ảnh nền mờ phía sau phần cô dâu chú rể (phong cảnh)
 *  groom.jpg         Ảnh khung bên trái phần cô dâu chú rể (dọc ~ 2:3)
 *  bride.jpg         Ảnh khung bên phải (dọc ~ 2:3)
 *  thank-you.jpg     Ảnh cuối thiệp "Thank you" (ngang ~ 16:10)
 *  qr-location.png   Mã QR bản đồ đến địa điểm tổ chức
 *
 *  gallery/          ALBUM — thả bao nhiêu ảnh cũng được, không cần sửa code.
 *                    Sắp xếp theo tên file: 01.jpg, 02.jpg, …
 *                    Bố cục ghép tự lặp theo chu kỳ 8 ảnh:
 *                      01 ngang lớn · 02 dọc lớn + 03, 04 nhỏ xếp chồng ·
 *                      05–08 dọc cao từng cặp
 *
 *  optimized/        Các cỡ ảnh tự tạo từ ảnh gốc (scripts/optimize-images.mjs),
 *                    không cần sửa tay. Thiệp chỉ dùng thư mục này.
 */
import qrLocation from './qr-location.png'

const files = import.meta.glob('./optimized/**/*.webp', { eager: true, import: 'default' })

// { 'gallery/01': [{ width: 480, url }, ...], hero: [...] }
const versions = {}
Object.keys(files).forEach((key) => {
  const [, name, width] = key.match(/^\.\/optimized\/(.+)-(\d+)\.webp$/)
  versions[name] = (versions[name] || []).concat({ width: Number(width), url: files[key] })
})

/** { src, srcSet } để trình duyệt tự chọn cỡ vừa với màn hình */
function responsive(name) {
  const list = versions[name].slice().sort((a, b) => a.width - b.width)
  return {
    src: list[list.length - 1].url,
    srcSet: list.map((v) => v.url + ' ' + v.width + 'w').join(', '),
  }
}

export const gallery = Object.keys(versions)
  .filter((name) => name.startsWith('gallery/'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map(responsive)

const images = {
  hero: responsive('hero'),
  heroWide: responsive('hero-wide'),
  envelope: responsive('envelope'),
  coupleBg: responsive('couple-bg'),
  groom: responsive('groom'),
  bride: responsive('bride'),
  thankYou: responsive('thank-you'),
  qrLocation,
  gallery,
}

export default images
