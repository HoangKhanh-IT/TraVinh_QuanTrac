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
    var d_1hour_minus = new Date(d_curent.setHours(d_curent.getHours() - time));

    for (var i = 0; i < length_station_threshold; i++) {
        var total_detail = data_threshold_station[i].total_detail;
        // console.log(total_detail);
        for (var j = 0; j < total_detail.length; j++) {
            var detail_daytime = total_detail[j].time.split(", ");
            var detail_day = detail_daytime[1];
            var detail_time = detail_daytime[0];

            /*** Chuyển detail time sang time mặc định trong JS ***/
            var string_day = detail_day.split("/");
            // console.log(string_day);
            var data_day_time = new Date(string_day[2] + "/" + string_day[1] + "/" + string_day[0]
                + " " + detail_time);
            // console.log(data_day_time);
            // console.log(d_1hour_minus);
            if (data_day_time.getTime() < d_1hour_minus.getTime()) {
                // console.log(total_detail[j])
                // console.log(j)
                // console.log("haha")
                total_detail = total_detail.splice(0, j)
            }
            detail_threshold_station.data[i].total_detail = total_detail;
        }
    }

    data_threshold_station = detail_threshold_station.data;
    length_station_threshold = detail_threshold_station.data.length;

    data_threshold_station = data_threshold_station.filter(function( obj ) {
        return obj.total_detail.length !== 0;
    });

    detail_threshold_station.data = data_threshold_station;
    var resutl_total_threshold_station = detail_threshold_station;

    return resutl_total_threshold_station;
}