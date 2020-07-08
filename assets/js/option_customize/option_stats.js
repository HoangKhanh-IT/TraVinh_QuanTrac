/*----- DOM Option Thống kê Loại hình -----*/
function dom_obstype_option() {
    $.getJSON("services/call_obstyles_stat_option.php", function (data_category) {
        $('#loaihinh_stat')
            .append($("<option></option>")
                .attr('value', 'none').text("Lựa chọn loại hình"));
        $.each(data_category, function (key, value) {
            $('#loaihinh_stat')
                .append($("<option></option>")
                    .attr('value', value.id).text(value.name));
        });
    })
}
dom_obstype_option();

/*----- DOM Option Thống kê Loại trạm -----*/
function dom_categories_option() {
    $.getJSON("services/call_categories_option.php", function (data_category) {
        /* $('#loaitram_stat')
            .append($("<option></option>")
                .attr('value', 'none').text("Lựa chọn loại trạm")); */
        $.each(data_category, function (key, value) {
            $('#loaitram_stat')
                .append($("<option></option>")
                    .attr('value', value.id).text(value.name));
        });
    })
}
dom_categories_option();

/*----- DOM Option Thống kê Quận/Huyện -----*/
function dom_districts_option() {
    $.getJSON("services/call_districts_option.php", function (data_district) {
        $('#district_stat')
            .append($("<option></option>")
                .attr('value', 'none').text("Lựa chọn quận huyện"));
        $.each(data_district, function (key, value) {
            $('#district_stat')
                .append($("<option></option>")
                    .attr('value', value.id).text(value.name));
        });
    })
}
dom_districts_option();