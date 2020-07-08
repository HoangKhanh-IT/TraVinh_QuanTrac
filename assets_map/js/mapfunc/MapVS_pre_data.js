/*** Hàm sort json theo object ***/
function sortResults(data, prop, asc) {
    data.sort(function (a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    return data;
}

function process_detail_DOMchart(feature, time) {
    $("#filter_parameters").find('option').remove();

    var parameterName;
    var total_detail;
    var new_total_detail = [];
    var data;

    /*** Thời gian sớm nhất
    var max_time = new Date(feature.properties.daytime_earliest);
    var max_time_minus = new Date(max_time.setHours(max_time.getHours() - time)); ***/
    var d_curent = new Date();
    var d_hour_minus = new Date(d_curent.setHours(d_curent.getHours() - time));

    total_detail = feature.properties.total_detail;

    for (var j = total_detail.length - 1; j >= 0; j--) {
        data = total_detail[j].data;

        var detail_daytime = total_detail[j].time.split(", ");
        var detail_day = detail_daytime[1];
        var detail_time = detail_daytime[0];

        /*** Chuyển detail time sang time mặc định trong JS ***/
        var string_day = detail_day.split("/");

        /*** Gộp thành chuỗi rồi chuyển sang dạng thời gian mặc định ***/
        var data_day_time = new Date(string_day[2] + "/" + string_day[1] + "/" + string_day[0] +
            " " + detail_time);

        total_detail[j]['time_js'] = data_day_time;

        for (var k = data.length - 1; k >= 0; k--) {
            var spidID = Object.keys(data[k]);
            var value = Object.values(data[k]);

            for (var k_para_sample = 0; k_para_sample < total_std_param.length; k_para_sample++) {
                if (parseInt(spidID) == total_std_param[k_para_sample].id) {
                    parameterName = total_std_param[k_para_sample].parameterName;

                    if (j == 0) {
                        /*** DOM Option Thông số ***/
                        $('#filter_parameters')
                            .append($("<option></option>")
                                .attr('value', spidID).text(parameterName));
                    }

                    /*** delete total_detail[j].data; ***/
                    total_detail[j][parameterName] = value[0].v.toString() + " " +
                        total_std_param[k_para_sample].unitName;
                }
            }
        }

        if (data_day_time.getTime() >= d_hour_minus.getTime()) {
            /*** Push các phần tử nằm trong khoảng thời gian đó vào mảng detail mới ***/
            new_total_detail.push(total_detail[j])
        }
    }
    sortResults(new_total_detail, 'time_js', true);
    return new_total_detail;
}