/*** Render Chart Type ***/
function render_chart(item_param, detail_chart, type) {
    var param;
    for (var k_para_sample = 0; k_para_sample < total_std_param.length; k_para_sample++) {
        if (item_param == total_std_param[k_para_sample].id) {
            param = total_std_param[k_para_sample].parameterName;
            if (type == "filter_column_chart" && typeof param !== 'undefined') {
                render_columnchart_quantrac("chart_para", detail_chart, param, "time", param)
            } else {
                render_linechart_quantrac("chart_para", detail_chart, param, "time", param)
            }
        }
    }
}

function onChange_option(detail_chart) {
    var item_param, item_type;

    /*** Khởi tạo lại biến val mới ***/
    item_param = $("#filter_parameters").val();
    item_type = $("#filter_typechart").val();

    $("#filter_parameters").change(function () {
        item_param = $("#filter_parameters").val();
        render_chart(item_param, detail_chart, item_type);
    })

    $("#filter_typechart").change(function () {
        item_type = $("#filter_typechart").val();

        if (item_type == "filter_line_chart") {
            render_chart(item_param, detail_chart, item_type);
        }

        if (item_type == "filter_column_chart") {
            render_chart(item_param, detail_chart, item_type);
        }
    })
}