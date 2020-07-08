/*---- Hàm cắt chuối JSON trả về theo thời gian ----*/
function onChangeTime_feature(time) {
    /*---- Call Threshold Station using Ajax ----*/
    var detail_threshold_station;
    $.ajax({
        url: "services/call_threshold_station.php",
        async: false,
        dataType: 'json',
        success: function (data) {
            detail_threshold_station = data;
        }
    });

    var data_threshold_station = detail_threshold_station.data;
    var length_station_threshold = detail_threshold_station.data.length;

    /*** Tìm thời gian x (1, 8 hoặc 24) giờ trước ***/
    var d_curent = new Date();
    var d_hour_minus = new Date(d_curent.setHours(d_curent.getHours() - time));

    for (var i = 0; i < length_station_threshold; i++) {
        var total_detail = data_threshold_station[i].total_detail;
        /*** Vòng lặp phải chạy ngược từ length - 1 về 0 ==> Hàm splice mới thực hiện chính xác ***/
        for (var j = total_detail.length -1; j >= 0 ; j--) {

            var detail_daytime = total_detail[j].time.split(", ");
            var detail_day = detail_daytime[1];
            var detail_time = detail_daytime[0];

            /*** Chuyển detail time sang time mặc định trong JS ***/
            var string_day = detail_day.split("/");

            /*** Gộp thành chuỗi rồi chuyển sang dạng thời gian mặc định ***/
            var data_day_time = new Date(string_day[2] + "/" + string_day[1] + "/" + string_day[0]
                + " " + detail_time);

            total_detail[j]['time_js'] = data_day_time;

            if (data_day_time.getTime() < d_hour_minus.getTime()) {
                /*** Dùng hàm Splice cắt phần tử mảng ở vị trí thứ j và bỏ đi 1 phần tử ***/
               total_detail.splice(j, 1);
            }
            detail_threshold_station.data[i].total_detail = total_detail;
        }
        sortResults(total_detail, 'time_js', false);
    }

    data_threshold_station = detail_threshold_station.data;
    length_station_threshold = detail_threshold_station.data.length;

    /*** Filter Object để loại bỏ các trạm có độ dài detail bằng 0 ***/
    data_threshold_station = data_threshold_station.filter(function( obj ) {
        return obj.total_detail.length !== 0;
    });

    detail_threshold_station.data = data_threshold_station;
    var resutl_total_threshold_station = detail_threshold_station;

    return resutl_total_threshold_station;
}