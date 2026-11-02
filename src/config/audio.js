/**
 * ============================================================
 *  ÂM THANH
 * ============================================================
 *  Đặt file nhạc vào thư mục  public/audio/  rồi ghi tên file ở `src`.
 *  Ví dụ: public/audio/nhac-cuoi.mp3  →  src: 'audio/nhac-cuoi.mp3'
 *  Muốn tắt hẳn nhạc: đặt  enabled: false
 */
const audio = {
  enabled: true,
  src: 'audio/background.mp3',
  volume: 0.6, // 0 → 1
  loop: true,
}

export default audio
