# Quan trắc Trà Vinh

### References
+ https://datatables.net/forums/discussion/29866/datatables-buttons-removes-the-length-menu
+ https://datatables.net/reference/option/dom
+ https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/
+ https://stackoverflow.com/questions/39612553/add-custom-dropdown-list-datatables-plugin-in-correct-layout
+ https://www.amcharts.com/docs/v4/tutorials/customizing-chart-scrollbar/

### Note giao diện (Thư viện)
+ Phần export biểu đồ: sử dụng export của Amchart
+ Phần export bảng dữ liệu: sử dụng export của Datatables
+ Sửa Modal Exporting trong Amchart ==> Sửa trong thư viện Core.js
+ Sửa thư viện comboTreePlugin.js ==> Xóa dòng `this.options.collapse` và sửa file style css

### Note giao diện (đề xuất)
+ Border ở các Modal (Header và Footer) tăng Width ==> done
+ Điều chỉnh thanh kéo ngang (giảm Width) ==> done
+ Hiển thị kết quả thống kê
    + Giới hạn số lượng trạm so sánh: 3 ==> Bảng biểu và chart hiển thị tối đa 3 trạm (done)
    + Bảng dữ liệu báo cáo: đề xuất làm Dropdown hiển thị Chart (pending)
+ Nút toggle thay đổi (xóa ==> thay đổi cơ chế làm mờ)  ==> làm nút toggle nhỏ hơn
+ Làm gọn panel heading (bấm xố dropdown nhưng không làm nút, cái đầu tiên mặc định mở) ==> done
+ Bỏ chú thích bản đồ (done)
+ Làm baner to hơn (done)
+ Bỏ nút Copy và Print, đổi màu đỏ cho các nút hiển thị 1 giờ, 8 giờ và 24 giờ (done)
+ Tool chạy batch files để ở trang Admin (tool chạy bằng Php)
+ Làm phần Scrollbar width to hơn (done)
+ Fit content cho modalFeature khi DOM dữ liệu từ DB
+ Hiện số liệu trạm quan trắc:
    + Đối với trạm tự động: có hiện chart
    + Đối với trạm bán tự động: không hiện chart nhưng hiện bảng số liệu 
    Datatables cho từng mẫu (không hiện số mới nhất)
    + Dom nhiều thuộc tính từ DB
    + Các mẫu theo hàng, chí tiêu theo hàng (Scrollbar ngang)

### Set Up in Xampp
+ Thêm extension cho PostgreSQL: 
https://askubuntu.com/questions/599921/adminer-none-of-the-supported-php-extensions-mysqli-mysql-pdo-mysql-are-ava/600156#600156
+ Xóa toàn bộ file trong folder `htdocs`

### Note kết nối Service Php PostgreSQL
+ Tạo file config Php (Thông tin kết nối database)
+ Tạo file Geojson từ truy vấn Php PostgreSQL 
(link: https://stackoverflow.com/questions/31885031/formatting-json-to-geojson-via-php)
+ DOM option: https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json
+ Group by trong Querry và tạo string kết quả cho cột Obstypes ==> Tạo kết quả dạng mảng để DOM
(link: https://askubuntu.com/questions/599921/adminer-none-of-the-supported-php-extensions-mysqli-mysql-pdo-mysql-are-ava/600156#600156)
+ Tạo JSON Nested: 
https://www.semicolonworld.com/question/32508/add-json-element-to-multidimensional-json-object-php

### Note xử lý onchange in map using Select Option/Checkbox Input
+ Thêm event `onChange` vào `<select class="form-control" id="quantrac" onchange="search_tramqt()"></select>`
+ Vào trang show hết tất cả điểm (lựa chọn loại hình được tích `Tất cả` ==> done)
+ Ghép chuỗi trong service: sử dụng linh hoạt `%20` (dấu " ") và `%27` (dấu "'")
+ Đưa về sử dụng Leaflet Ajax + Option Onchange + Ghép chuỗi service URL
+ Thanks my Master: http://dev.dothanhlong.org/geoserver_cql_query_ajax_json/
+ Ban đầu sử dụng ComboTree_Plguin ==> Hỗ trợ Onchange không hiệu quả ==> Chuyển sang sử dụng Kendo_UI ==> done
+ Kendo_UI có tính phí, sử dụng bản miễn phí chỉ có 30 ngày ==> Chuyển sang Plugin TreeJS ==> done
+ Close All Open Node Specify Branches: https://groups.google.com/forum/#!topic/jstree/EoDgKTh5xFc
+ Chuyển ID dạng Text sang dạng số (tránh lỗi Php khi gọi dạng text sẽ không truy vấn được)