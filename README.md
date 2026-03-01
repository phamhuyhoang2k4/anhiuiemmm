# 💕 Nhật ký tình yêu

Trang web ghi chú ngày kỷ niệm, lưu ảnh và nhận lời nhắn yêu thương. Dữ liệu được lưu trong repo GitHub, mọi người đều xem được.

## Tính năng

- 📅 **Ngày kỷ niệm** – Lưu các mốc kỷ niệm
- 🦆 **Ảnh bé vịt** – Thư viện ảnh với chế độ Bento & Tự do
- 💌 **Lời nhắn yêu thương** – Tin nhắn dạng chữ, ảnh hoặc giọng nói

---

## Cách triển khai (GitHub + Vercel)

Dữ liệu được lưu vào file `data.json` trong repo GitHub. Cần dùng **Vercel** (miễn phí) để chạy API đọc/ghi dữ liệu.

### Bước 1: Tạo GitHub Personal Access Token

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens**
2. Chọn **Tokens (classic)** → **Generate new token**
3. Đặt tên (vd: `BeVit`)
4. Chọn quyền **repo**
5. Bấm **Generate token** và **copy token** (chỉ hiện 1 lần)

### Bước 2: Đẩy code lên GitHub

```bash
git init
git add .
git commit -m "Nhật ký tình yêu"
git branch -M main
git remote add origin https://github.com/TÊN_TÀI_KHOẢN/TÊN_REPO.git
git push -u origin main
```

### Bước 3: Kết nối Vercel

1. Vào [vercel.com](https://vercel.com), đăng nhập bằng GitHub
2. **Add New** → **Project** → Import repo của bạn
3. Bấm **Deploy** (để tạo project trước)

### Bước 4: Thêm biến môi trường

1. Vào project trên Vercel → **Settings** → **Environment Variables**
2. Thêm 3 biến:

| Name | Value |
|------|-------|
| `GITHUB_TOKEN` | Token vừa tạo |
| `GITHUB_OWNER` | Tên tài khoản GitHub (vd: `monho`) |
| `GITHUB_REPO` | Tên repo (vd: `BeVit`) |

3. Bấm **Save**

### Bước 5: Deploy lại

1. **Deployments** → bấm **⋯** trên deployment mới nhất → **Redeploy**
2. Chờ deploy xong

### Bước 6: Dùng trang web

- **Nếu dùng Vercel:** Mở URL Vercel (vd: `https://bevit.vercel.app`) – trang + API dùng chung domain
- **Nếu dùng GitHub Pages:**  
  1. Trong `config.js`, đặt `API_BASE = 'https://TÊN_PROJECT.vercel.app'`  
  2. Push lên GitHub  
  3. Bật GitHub Pages trong Settings của repo  
  4. Mở URL GitHub Pages

Dữ liệu được ghi vào file `data.json` trong repo, ai truy cập đều thấy giống nhau.

---

## Lưu ý

- Token GitHub phải có quyền **repo**
- Đừng public token trong code
- `config.js`: để trống nếu dùng Vercel, điền URL Vercel nếu dùng GitHub Pages
