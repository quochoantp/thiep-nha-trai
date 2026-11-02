# Thiệp cưới online — React (tông kem – nâu)

Thiệp cưới một trang, chạy mượt trên **điện thoại** và **máy tính**.

## Các phần của thiệp

1. Bìa: chữ "Wedding" viết tay, tên cô dâu chú rể, cánh hoa rơi.
2. Save the date: phong bì có dấu sáp, ảnh trồi ra khỏi phong bì, cành hoa đung đưa.
3. Dải đếm ngược.
4. Lời mời và hai sự kiện: buổi tiệc, lễ thành hôn. Mỗi sự kiện có nút "Xem chỉ đường".
5. Cô dâu chú rể và câu chuyện tình yêu.
6. Golden hour of love: album ảnh ghép tự xếp.
7. Đường đến hôn lễ: mã QR mở bản đồ và nút "Xem chỉ đường".
8. Thank you.

Đây là thiệp thông báo: khách không cần nhập gì và thiệp không lưu dữ liệu.

Thanh nổi ở cạnh dưới gồm:

- **Đường đến hôn lễ:** cuộn tới mã QR địa điểm.
- **Bắn tim:** tim bay lên.

Góc trên bên phải có nút bật/tắt nhạc. Bấm vào ảnh bất kỳ để xem lớn; có thể vuốt hoặc dùng phím ← → để chuyển ảnh.

**Trên máy tính (≥ 900px)**, thiệp tự chuyển sang bố cục nhiều cột:

- Bìa tràn toàn màn hình.
- Tiêu đề nằm cạnh phong bì.
- Hai sự kiện đặt cạnh nhau, đôi thiên nga ở giữa.
- Tiêu đề album nằm cạnh đoạn văn.
- Lời nhắn nằm cạnh mã QR địa điểm.

---

## Chạy thử

Chạy được với **Node 14.18 trở lên**, kể cả Node 14 + npm 6. Hãy giải nén vào **một thư mục mới**.

```bat
npm install
npm run dev
```

Lệnh in ra hai địa chỉ:

- `http://localhost:5173`: mở trên máy tính.
- `http://192.168.x.x:5173`: mở trên điện thoại dùng chung Wi-Fi.

Xuất bản để đưa lên mạng:

```bat
npm run build
```

Kết quả nằm trong thư mục `dist/`.

> Với npm 6, khi cài sẽ hiện vài dòng `npm WARN notsup` (về rollup, fsevents, @esbuild…). Đó chỉ là cảnh báo, **không phải lỗi**.

---

## Ba thứ bạn tự truyền vào

`src/main.jsx` truyền 3 nguồn dữ liệu vào thiệp:

```jsx
<WeddingInvitation content={content} images={images} audio={audio} />
```

### 1. Thông điệp: `src/config/content.js`

File này chứa mọi chữ trên thiệp: tên, ngày đếm ngược, các sự kiện (giờ, ngày, âm lịch, địa chỉ, link bản đồ), thông tin hai bên gia đình, câu chuyện tình yêu, đoạn văn album, phần đường đến hôn lễ và chữ trên thanh nổi.

- **Tự tính:** thứ trong tuần, tháng, năm và đồng hồ đếm ngược đều tính từ ngày bạn nhập.
- **Âm lịch:** nhập tay trong `lunar`.
  - 21/11/2026 là ngày **13 tháng 10 năm Bính Ngọ** (Thứ Bảy).
  - 22/11/2026 là ngày **14 tháng 10 năm Bính Ngọ** (Chủ Nhật).
- **Thêm hoặc bớt sự kiện:** thêm hoặc xoá phần tử trong mảng `invitation.events`.

### 2. Ảnh: `src/assets/images/`

**Chép ảnh của bạn đè lên file cùng tên.**

| File | Dùng ở đâu | Gợi ý |
|---|---|---|
| `hero.jpg` | Bìa trên điện thoại | dọc ~ 3:4.4 |
| `hero-wide.jpg` | Bìa trên máy tính | ngang 16:9 |
| `envelope.jpg` | Ảnh trồi ra từ phong bì | dọc 2:3 |
| `couple-bg.jpg` | Ảnh nền (tự làm mờ, tối) phía sau phần cô dâu chú rể | phong cảnh |
| `groom.jpg`, `bride.jpg` | Hai khung ảnh cô dâu chú rể | dọc 2:3 |
| `thank-you.jpg` | Ảnh cuối "Thank you" | ngang |
| `qr-location.png` | Mã QR bản đồ đến địa điểm tổ chức | vuông |
| `gallery/01.jpg`, `02.jpg`… | **Album**: bao nhiêu ảnh cũng được, không cần sửa code | xem bên dưới |

Album tự xếp theo tên file và lặp lại theo chu kỳ 8 ảnh:

- Ảnh **01**: ngang, tràn hết chiều rộng.
- Ảnh **02**: dọc, lớn.
- Ảnh **03, 04**: dọc, nhỏ, xếp chồng cạnh ảnh 02.
- Ảnh **05 – 08**: dọc, cao, xếp từng cặp.

Nên chọn ảnh có hướng (ngang/dọc) khớp với vị trí của nó.

**Không cần tự nén ảnh.** `npm run dev` và `npm run build` tự tạo nhiều cỡ từ ảnh gốc vào `optimized/`, và trình duyệt chọn cỡ vừa với màn hình để ảnh nét mà vẫn nhẹ. Ảnh gốc giữ nguyên và không nằm trong bản đưa lên mạng.

Cần cài `sharp` (có sẵn sau `npm install`, cần Node 20.9 trở lên) để tạo ảnh mới. Nếu thiếu `sharp`, thiệp vẫn chạy bằng các ảnh đã tạo trước đó, nhưng ảnh vừa thay sẽ chưa được cập nhật.

### 3. Âm thanh: `public/audio/` và `src/config/audio.js`

- Chép file nhạc vào `public/audio/background.mp3`. File có sẵn chỉ là đoạn nhạc thử.
- Đổi tên file thì sửa `src` trong `audio.js`.
- Chỉnh âm lượng ở `volume`.
- Tắt hẳn nhạc: `enabled: false`.

Trình duyệt chỉ cho phát nhạc sau lần chạm đầu tiên của khách, nên nhạc bắt đầu khi bấm **"Mở thiệp"**.

---

## Đổi màu và font

Đầu file `src/styles/global.css` là bảng màu (`--cream`, `--band`, `--brown`…) và tên các font.

Chữ viết tay mảnh ("Wedding", "the", "of", "Thank you", "Chú rể") dùng font **Ephesis**.

## Đưa lên mạng

**Đang dùng GitHub Pages:** mỗi lần đẩy code lên nhánh `main`, GitHub tự build và đăng lại thiệp (`.github/workflows/deploy.yml`). Ảnh gốc không được đưa lên GitHub, nên khi thay ảnh hãy chạy `npm run images` rồi commit cả thư mục `optimized/`.

Cách khác:

Chạy `npm run build`, rồi chọn một trong hai cách:

- Kéo thư mục `dist/` vào **Netlify Drop** (app.netlify.com/drop).
- Import repo vào **Vercel** hoặc **Netlify**, với build command `npm run build` và output `dist`.

## Cấu trúc thư mục

```
src/
├── main.jsx                 truyền content / images / audio vào thiệp
├── WeddingInvitation.jsx    khung chính: nhạc, lightbox, thứ tự các phần
├── config/content.js        ← THÔNG ĐIỆP
├── config/audio.js          ← ÂM THANH
├── assets/images/           ← ẢNH (+ gallery/ cho album, optimized/ tự tạo)
├── components/
│   ├── Sections.jsx         các phần của thiệp
│   ├── Decor.jsx            phong bì, cành hoa, thiên nga, cánh hoa rơi (SVG)
│   ├── Floating.jsx         thanh nổi, bắn tim, nút nhạc, lightbox
│   └── ui.jsx               hiệu ứng hiện dần, icon
├── utils/                   ngày tháng
└── styles/global.css        màu, font, hiệu ứng, bố cục điện thoại / máy tính
public/audio/background.mp3  nhạc nền
```
