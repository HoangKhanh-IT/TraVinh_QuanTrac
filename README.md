# TraVinh_QuanTrac
1. Cài đặt phpStorm
1. Cài đặt Xampp
2. Cài đặt Postgres
3. Bỏ Source và Adminer vào trong httpdoc
4. git clone -b nguyenduclam https://github.com/nguyenduclam/TraVinh_QuanTrac.git
5.HoangKhanh-IT

Cấu hình:
1. Database chạy câu lệnh sql (bỏ cấu trúc bảng) và backup lại file .bak
2. Cấu hình database tương ứng trong config.php 

Diễn giải:
1. Bản đồ hiển thị dùng Leaflet
2. Index.html -> gọi các file javascript nằm ở cuối trang html -> javascipt sẽ gọi các services (dữ liệu trả về từ truy vấn sql đã viết sẵn)  gắn vô các id tương ứng trên html
3. Các câu truy vấn SQL để Dom dữ liệu thì đưa vào các Services, thực thi bằng pgquery() -> Đưa vào mãng có $features -> đưa về dạng mảng Json
