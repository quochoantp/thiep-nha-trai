/**
 * Tạo nhiều cỡ cho mỗi ảnh trong src/assets/images, lưu vào optimized/.
 * Ảnh gốc giữ nguyên. Thiệp chỉ dùng các bản đã tạo, trình duyệt tự chọn cỡ
 * vừa với khung ảnh và màn hình nên ảnh nét mà vẫn nhẹ.
 *
 * Tự chạy trước `npm run dev` và `npm run build`; ảnh đã tạo rồi thì bỏ qua.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const IMAGES_DIR = fileURLToPath(new URL('../src/assets/images/', import.meta.url))
const OUT_DIR = path.join(IMAGES_DIR, 'optimized')
const WIDTHS = [480, 768, 1080, 1440, 1920, 2560]
const IS_PHOTO = /\.(jpe?g|png|webp)$/i
const IS_QR = /^qr-/i

function listPhotos() {
  const inDir = (dir, prefix) =>
    !fs.existsSync(dir)
      ? []
      : fs
          .readdirSync(dir)
          .filter((f) => IS_PHOTO.test(f) && !IS_QR.test(f))
          .map((f) => ({ file: path.join(dir, f), name: prefix + path.parse(f).name }))
  return inDir(IMAGES_DIR, '').concat(inDir(path.join(IMAGES_DIR, 'gallery'), 'gallery/'))
}

function isUpToDate(output, source) {
  return fs.existsSync(output) && fs.statSync(output).mtimeMs >= fs.statSync(source).mtimeMs
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? listFiles(p) : [p]
  })
}

async function main() {
  // Trên GitHub không có ảnh gốc: giữ nguyên optimized/, không được xoá
  const photos = listPhotos()
  if (!photos.length) {
    console.log('[images] Không có ảnh gốc, dùng các ảnh đã tạo sẵn trong optimized/.')
    return
  }

  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch (e) {
    console.warn('[images] Chưa có sharp, dùng các ảnh đã tạo sẵn trong optimized/.')
    return
  }

  const expected = new Set()
  let created = 0

  for (const { file, name } of photos) {
    const { width: sourceWidth } = await sharp(file).metadata()
    const widths = WIDTHS.filter((w) => w <= sourceWidth)
    if (!widths.length) widths.push(sourceWidth)

    for (const width of widths) {
      const output = path.join(OUT_DIR, name + '-' + width + '.webp')
      expected.add(output)
      if (isUpToDate(output, file)) continue
      fs.mkdirSync(path.dirname(output), { recursive: true })
      await sharp(file)
        .rotate()
        .resize({ width, kernel: 'lanczos3' })
        .sharpen({ sigma: 0.6 })
        .webp({ quality: 84, smartSubsample: true, effort: 5 })
        .toFile(output)
      created += 1
    }
  }

  // Xoá bản của những ảnh gốc không còn nữa
  for (const f of listFiles(OUT_DIR)) {
    if (!expected.has(f)) fs.unlinkSync(f)
  }

  console.log('[images] Tạo mới ' + created + ' file, tổng ' + expected.size + ' file.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
