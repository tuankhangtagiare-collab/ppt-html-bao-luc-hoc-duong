# BẠO LỰC HỌC ĐƯỜNG — Cinematic Web Presentation Engine

> **Hiểu đúng – Ngăn chặn – Cùng xây dựng trường học an toàn**  
> Dự án Presentation Engine cao cấp chạy trên trình duyệt web với **Morph transitions (PowerPoint-style)**, **3D WebGL (Three.js)**, **Cinematic Motion Design** và **Storytelling liền mạch qua 12 slide**.

---

## 🚀 I. HƯỚNG DẪN KHỞI CHẠY NHANH

### Cách 1: Double-click file `start.bat` (Khuyên dùng trên Windows)
1. Mở thư mục dự án trên máy tính.
2. Double-click trực tiếp vào file **`start.bat`**.
3. Hệ thống sẽ tự động:
   - Kiểm tra **Node.js** và **npm**.
   - Tự động chạy `npm install` nếu chưa có thư mục `node_modules`.
   - Khởi động presentation server tại `http://localhost:5173`.
   - **Tự động mở Google Chrome** đưa bạn trực tiếp vào bài thuyết trình.
   - Không cần mở trình duyệt hay gõ lệnh thủ công.

---

### Cách 2: Sử dụng dòng lệnh Terminal / Command Prompt

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi chạy Presentation và tự động mở Google Chrome
npm run start
```

---

## 🎮 II. BẢNG ĐIỀU KHIỂN & PHÍM TẮT (PRESENTATION CONTROLS)

| Phím tắt / Hành động | Chức năng |
| :--- | :--- |
| **`→`** / **`Space`** / **`PageDown`** / **`L`** | Chuyển tới slide kế tiếp |
| **`←`** / **`Backspace`** / **`PageUp`** / **`H`** | Quay lại slide phía trước |
| **`Home`** | Về slide đầu tiên (Slide 01) |
| **`End`** | Đến slide kết thúc (Slide 12) |
| **`F`** | Bật / tắt chế độ toàn màn hình (**Fullscreen**) |
| **`M`** hoặc **`O`** | Mở bảng **Overview Grid** (xem thumbnails 12 slide) |
| **`P`** | Bật **Presentation Mode** (ẩn con trỏ chuột & HUD) |
| **`Esc`** | Đóng bảng Overview hoặc thoát toàn màn hình |
| **Click chuột trái / phải** | Vùng biên màn hình 15% trái/phải để chuyển slide |
| **Nút Loa ở HUD** | Bật/tắt hiệu ứng âm thanh tổng hợp (Web Audio API) |

---

## 🎨 III. HỆ THỐNG HÌNH ẢNH NANO BANANA

Tất cả 12 hình ảnh 3D minh họa chất lượng cao đã được tạo sẵn và đặt tại:
- `assets/images/slide-01.jpg` đến `slide-12.jpg`
- `public/images/slide-01.jpg` đến `slide-12.jpg`

Nếu bạn muốn tạo lại hình ảnh theo phong cách riêng bằng **Nano Banana** hoặc Midjourney:
1. Mở thư mục `assets/nano-banana-prompts/`.
2. Mở file tương ứng: `slide-01.md`, `slide-02.md`, ... `slide-12.md`.
3. Copy toàn bộ đoạn prompt tiếng Anh bên trong.
4. Dán vào công cụ tạo ảnh AI (**Nano Banana**).
5. Lưu file ảnh tạo được vào thư mục `assets/images/` với tên tương ứng (ví dụ: `slide-01.jpg`).
6. Tải lại trang web thuyết trình, hệ thống sẽ tự động hiển thị ảnh mới!

---

## 🏛️ IV. CẤU TRÚC MÃ NGUỒN DỰ ÁN

```text
school-violence-presentation/
│
├─ index.html                     # Giao diện cấu trúc HTML của 12 slide & HUD
├─ package.json                   # Cấu hình dự án (Vite, Three.js, Open)
├─ start.bat                      # Script 1-click khởi chạy trên Windows
├─ run-presentation.js            # Runner khởi động server & kích hoạt Chrome
├─ vite.config.js                 # Cấu hình Vite dev server
├─ README.md                      # Hướng dẫn chi tiết dự án
│
├─ src/
│  ├─ main.js                     # Điểm vào chính (Entry Point)
│  ├─ presentation.js             # Bộ điều phối trạng thái slide & Overview Grid
│  ├─ morph.js                    # Morph Transition Engine (PowerPoint-style)
│  ├─ scene3d.js                  # Engine Three.js 3D WebGL tối ưu cho laptop
│  ├─ interactions.js             # Quản lý bàn phím, chuột và tự ẩn UI khi idle
│  ├─ audio.js                    # Bộ tạo âm thanh hiệu ứng (Web Audio API)
│  └─ data.js                     # Toàn bộ dữ liệu nội dung của 12 slide
│
├─ styles/
│  ├─ main.css                    # Design token, màu sắc, nền khí quyển nhiều lớp
│  ├─ slides.css                  # Bố cục giao diện, font typography cho 12 slide
│  ├─ morph.css                   # Hiệu ứng chuyển động Morph (Shared element)
│  ├─ 3d.css                      # Chiều sâu perspective, card tilt & parallax
│  └─ responsive.css              # Breakpoint 1600x900, 1366x768, 1280x720
│
├─ assets/
│  ├─ images/                     # Ảnh 3D chất lượng cao (slide-01 đến slide-12)
│  ├─ backgrounds/                # Nền đồ họa bổ sung
│  ├─ icons/                      # Biểu tượng vector
│  └─ nano-banana-prompts/        # 12 file prompt chi tiết cho từng slide
│
└─ public/
   └─ images/                     # Ảnh tĩnh phục vụ cho Vite server
```

---

## 🌟 V. CÁC ĐẶC ĐIỂM NỔI BẬT

1. **Morph Engine Riêng Biệt:** Tự động phát hiện các phần tử mang thuộc tính `[data-morph]`, tính toán vị trí pixel chính xác trên màn hình và animate liền mạch giữa các slide với đường cong `cubic-bezier(0.16, 1, 0.3, 1)` trong 850ms.
2. **Không Gian 3D Thực Thụ (Three.js):**
   - Lớp học 3D, 4 khối hình học tượng trưng, hành lang trường học hướng vào không gian mạng, đồ thị 3D liên kết nguyên nhân, bóng hình học sinh cô đơn với các vòng cảnh báo quỹ đạo, mô hình smartphone 3D khổng lồ, cổng phân đôi DO/DON'T, 4 bậc thang an toàn, 3 cột trụ liên kết, và chiếc khiên bảo vệ 3D quay phản chiếu ánh sáng.
3. **Background Khí Quyển Nhiều Lớp (Atmospheric Glow):**
   - Layer 1: Base Dark Gradient.
   - Layer 2: Ambient Radial Glow chuyển màu theo từng chương (Đỏ Crimson, Xanh Cyan, Vàng Hổ Phách, Xanh Lục Emerald).
   - Layer 3: Hạt bụi vi mô lơ lửng (Floating Particles).
   - Layer 4: Vignette tạo chiều sâu điện ảnh.
4. **Tối Ưu Hiệu Năng Vượt Trội:** Tự động tạm ngưng vòng lặp render 3D khi chuyển tab hoặc thu nhỏ trình duyệt, đảm bảo chạy mượt mà ngay cả trên các dòng laptop văn phòng phổ thông.
