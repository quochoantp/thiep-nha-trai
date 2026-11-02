import React from 'react'
import ReactDOM from 'react-dom/client'
import WeddingInvitation from './WeddingInvitation'

// Ba nguồn dữ liệu được TRUYỀN VÀO thiệp — sửa ở các file này:
import content from './config/content'      // thông điệp, tên, ngày giờ, địa điểm
import images from './assets/images'        // ảnh (kể cả album)
import audio from './config/audio'          // nhạc nền

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeddingInvitation content={content} images={images} audio={audio} />
  </React.StrictMode>
)
