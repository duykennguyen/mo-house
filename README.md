# Mô Đi Phê House — web giới thiệu & đặt phòng

Web tĩnh HTML/CSS/JS, song ngữ VI/EN, giao diện theo chuẩn Mô Bedding.

## Các trang
| File | Nội dung |
|---|---|
| `index.html` | Trang chủ: banner, 4 nhà + lọc nhanh, giá trị, ngắn/dài ngày, Mô Bedding, trải nghiệm, đánh giá, về chúng tôi |
| `camf.html` · `nha-trau.html` · `nha-sen.html` · `nha-bien.html` | Trang từng nhà, nội dung lấy từ `assets/js/data.js` |
| `luu-tru.html` | Ngắn ngày & dài ngày, cách đặt, chính sách, hỏi đáp |
| `lien-he.html` | Form đặt phòng (gửi qua Zalo / WhatsApp). `lien-he.html?house=sen` chọn sẵn nhà |
| `sales.html` | Sales kit nội bộ — không có trên menu, nhưng ai có link đều xem được |

## Sửa nội dung
- **Thông tin nhà, căn, tiện nghi, khoảng cách, đánh giá, chính sách:** `assets/js/data.js`.
- **Link Airbnb:** điền vào `airbnb: ''` của từng căn → hiện nút "Xem giá trên Airbnb".
- **Đánh giá thật:** thay mảng `REVIEWS`, rồi đặt `SAMPLE_REVIEWS = false` để bỏ nhãn "Nội dung mẫu".
- **Lưu yêu cầu đặt phòng vào Google Sheet:** dán link Web App của Google Apps Script vào `LEAD_ENDPOINT`.
- **Giao diện:** `assets/css/base.css` là bản chép nguyên từ Mô Bedding, không sửa file này. Mọi thay đổi viết trong `assets/css/house.css`.
- Sau mỗi lần sửa CSS/JS, tăng mã `?v=` trong các file HTML.

## Ảnh
`assets/img/<nhà>/<nhà>-NN.jpg`, cạnh dài 1800px. File `_nguon.txt` trong mỗi thư mục ghi tên ảnh gốc
(nguồn: `D:\1. Mô Đi Phê\1. Mô House\...`).

## Xem thử trên máy
Cấu hình `mo-house` trong `.claude/launch.json` (cổng 5530).

Mọi trang đang có `noindex` (bản demo). Xoá dòng đó khi lên web chính thức.
