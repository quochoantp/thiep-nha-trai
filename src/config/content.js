/**
 * ============================================================
 *  THÔNG ĐIỆP & NỘI DUNG CHỮ CỦA THIỆP
 *  Sửa file này để đổi mọi chữ hiển thị — không cần đụng component.
 * ============================================================
 *  - Ngày dạng 'YYYY-MM-DD', giờ dạng 'HH:mm'.
 *    Thứ trong tuần, tháng/năm, đồng hồ đếm ngược đều TỰ TÍNH.
 *  - Ngày âm lịch nhập tay ở `lunar`.
 *  - Câu nhiều dòng viết thành mảng, mỗi phần tử một dòng.
 */

// Địa điểm tổ chức — dùng chung cho các sự kiện và phần "Đường đến hôn lễ"
const PLACE = 'TẠI NHÀ VĂN HOÁ THÔN Ô MỄ 2'
const ADDRESS = 'Tổ 21, Phường Thái Bình, Tỉnh Hưng Yên'
const MAP_URL = 'https://maps.app.goo.gl/PzWgy6fuWTxwLmYcA?g_st=iz' // cùng link với mã QR

const content = {
  groom: { name: 'QUỐC HOÀN', title: 'Chú rể' },
  bride: { name: 'LINH LINH', title: 'Cô dâu' },

  // Ngày hiển thị ở "Save the date" và dùng cho đếm ngược
  mainDate: '2026-11-22',
  countdownTo: '2026-11-22T12:30:00+07:00',

  // ---------- Màn mở thiệp (cần 1 lần chạm để trình duyệt cho phát nhạc) ----------
  opening: {
    enabled: true,
    eyebrow: 'Trân trọng kính mời',
    button: 'Mở thiệp',
  },

  // ---------- 1. Bìa ----------
  hero: {
    script: 'Wedding',
    petals: true, // hiệu ứng cánh hoa rơi
  },

  // ---------- 2. Save the date ----------
  saveTheDate: {
    titleTop: 'SAVE',
    titleScript: 'the',
    titleBottom: 'DATE',
  },

  // ---------- 3. Đếm ngược ----------
  countdown: {
    title: 'Save the date....',
    units: ['ngày', 'giờ', 'phút', 'giây'],
    done: 'Hôm nay là ngày chung đôi!',
  },

  // ---------- 4. Lời mời, các sự kiện & hai bên gia đình ----------
  invitation: {
    heading: ['TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH', 'TỚI DỰ BỮA CƠM THÂN MẬT', 'CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI'],
    directionsButton: 'XEM CHỈ ĐƯỜNG',
    events: [
      {
        title: 'BỮA CƠM THÂN MẬT',
        date: '2026-11-21',
        time: '16:30',
        lunar: '(Tức ngày 13 tháng 10 năm Bính Ngọ)',
        place: PLACE,
        address: ADDRESS,
        mapUrl: MAP_URL, // để trống: tự tạo link Google Maps từ địa chỉ
      },
      {
        title: 'LỄ THÀNH HÔN',
        date: '2026-11-22',
        time: '12:30',
        lunar: '(Tức ngày 14 tháng 10 năm Bính Ngọ)',
        place: PLACE,
        address: ADDRESS,
        mapUrl: MAP_URL,
      },
    ],
    closing: 'Rất hân hạnh được đón tiếp!',
    families: [
      {
        label: 'Nhà Trai',
        parents: ['ÔNG: ĐỒNG VĂN HẬU', 'BÀ: VŨ THỊ HUẾ'],
        address: ['Tổ 21, Phường Thái Bình', 'Tỉnh Hưng Yên'],
      },
      {
        label: 'Nhà Gái',
        parents: ['ÔNG: TRẦN VĂN MAY', 'BÀ: LƯƠNG THỊ LIỄU'],
        address: ['Thôn An Thịnh, Xã Đông Tiền Hải', 'Tỉnh Hưng Yên'],
      },
    ],
  },

  // ---------- 5. Cô dâu chú rể & câu chuyện ----------
  story:
    'Mỗi câu chuyện tình yêu đều có một khởi đầu thật đẹp. Câu chuyện của chúng mình cũng vậy, được viết nên từ những điều giản dị và những khoảnh khắc không thể nào quên. Hôm nay, chúng mình rất hạnh phúc khi được chia sẻ cột mốc đặc biệt này cùng gia đình, bạn bè và những người thân yêu. Cảm ơn bạn đã đến và trở thành một phần trong câu chuyện của chúng mình.',

  // ---------- 6. Album ----------
  album: {
    titleLeft: 'GOLDEN HOUR',
    titleScript: 'of',
    titleRight: 'LOVE',
    text: 'Our wedding story unfolds through soft moments of love — filled with warm smiles, quiet tenderness, and timeless memories that will stay in our hearts forever.',
  },

  // ---------- 7. Đường đến hôn lễ ----------
  venue: {
    intro: ['Sự hiện diện của Quý khách', 'là niềm vinh hạnh', 'cho gia đình chúng tôi!'],
    title: 'Đường đến hôn lễ',
    note: 'Quét mã QR hoặc bấm nút bên dưới để mở bản đồ',
    place: PLACE,
    address: ADDRESS,
    mapUrl: MAP_URL,
    button: 'XEM CHỈ ĐƯỜNG',
  },

  // ---------- 8. Kết ----------
  thankYou: 'Thank you',

  // ---------- Thanh nổi phía dưới ----------
  bar: {
    directions: 'Đường đến hôn lễ',
    hearts: 'Bắn tim',
  },
}

export default content
