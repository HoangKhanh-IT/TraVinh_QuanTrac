/*** Hàm này được thực hiện sau khi tạo được bảng con hoàn chỉnh ***/
function DOM_data_child_Threshold(row_detail, time) {
    var total_threshold_station = onChangeTime_feature(time);
    var total_detail = total_threshold_station.data[row_detail].total_detail;

    for (var i_dom_threshold = 0; i_dom_threshold < total_detail.length; i_dom_threshold++) {
        var detail_data_value = total_detail[i_dom_threshold].data;
        var detail_data_daytime = total_detail[i_dom_threshold].time.split(", ");
        var detail_data_day = detail_data_daytime[1];
        var detail_data_time = detail_data_daytime[0];
        var j_threshold;
        var td_id_threshold;
        var valueinlimit;

        /*** DOM daytimes into Cell with class `row + _daytimes` ***/
        $("." + i_dom_threshold + "_daytimes").css("white-space", "nowrap")
        $("." + i_dom_threshold + "_daytimes").html(detail_data_time + " | " + detail_data_day)

        for (j_threshold = 0; j_threshold < detail_data_value.length; j_threshold++) {
            spidID = Object.keys(detail_data_value[j_threshold]);
            td_id_threshold = i_dom_threshold + "_" + spidID;

            value = Object.values(detail_data_value[j_threshold]);
            for (var k_value_threshold = 0; k_value_threshold < total_std_param.length; k_value_threshold++) {
                if (parseInt(spidID) == total_std_param[k_value_threshold].id && value[0].inlimit == "Y") {
                    valueinlimit = value[0].v;
                    unitName = total_std_param[k_value_threshold].unitName;
                    /*** DOM values into Cell with ID ***/
                    $("#" + td_id_threshold + " b").css("white-space", "nowrap")
                    $("#" + td_id_threshold + " b").html(valueinlimit + " " + unitName)
                }
            }
        }
    }
}

function getData_threshold_station() {
    /*---- Datables danh sách vượt ngưỡng ----*/
    var row_detail;
    var data_onchange = onChangeTime_feature(1);

    if ($.fn.DataTable.isDataTable('#table_threshold')) {
        /*** Trigger nút button 1 giờ để reload dữ liệu 1 giờ khi người dùng tắt, bật lại ***/
        $('#filter_1h').trigger('click');
    }
    if (!$.fn.DataTable.isDataTable('#table_threshold')) {
        $(document).ready(function () {
            /*** Datatable Vượt ngưỡng ***/
            var table_threshold = $('#table_threshold').DataTable({
                data: data_onchange.data,
                columns: [{
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
                    {"data": "name"},
                    {"data": "obstype_namelist"},
                    {"data": "categoryName"},
                    {"data": "districtName"}
                ],
                order: [
                    [1, 'asc']
                ],
                dom: "<'row'<'col-sm-7'B><'col-sm-3'l><'col-sm-2'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                buttons: [
                    {extend: 'pdf', className: 'btn btn-info btn-sm'},
                    {extend: 'excel', className: 'btn btn-info btn-sm'}
                ],
                paging: false,
                autoWidth: false,
                "language": {
                    pagingType: "full_numbers",
                    search: '<span>Tìm kiếm:</span> _INPUT_',
                    searchPlaceholder: 'Gõ để tìm...',
                    paginate: {
                        'first': 'First',
                        'last': 'Last',
                        'next': $('html').attr('dir') == 'rtl' ? '<span style="font-size:13px;">Trước</span>' : '<span style="font-size:13px;">Sau</span>',
                        'previous': $('html').attr('dir') == 'rtl' ? '<span style="font-size:13px;">Sau</span>' : '<span style="font-size:13px;">Trước</span>'
                    },
                    sLengthMenu: "<span>Hiển thị&nbsp;</span> _MENU_<span> kết quả</span>",
                    sZeroRecords: "Không tìm thấy kết quả",
                    sInfo: "Hiển thị _START_ đến _END_ trên _TOTAL_ dòng",
                    sInfoFiltered: "(tất cả _MAX_ dòng)",
                    sInfoEmpty: "Hiển thị 0 đến _END_ trên _TOTAL_ dòng",
                },
            });

            table_threshold.buttons().container()
                .appendTo('#table_threshold_wrapper .col-md-12:eq(0)');

            $('<button class="dt-button buttons-html5 btn btn-sm active" id="filter_1h" ' +
                'type="button" aria-controls="table_threshold" tabindex="0" ' +
                'style="margin-right: 4.5px; margin-left: 30%;">' +
                '<span>1 giờ</span>' +
                '</button>' +
                '<button class="dt-button buttons-html5 btn btn-sm" id="filter_8h" ' +
                'type="button" aria-controls="table_threshold" tabindex="0" style="margin-right: 4.5px;">' +
                '<span>8 giờ</span>' +
                '</button>' +
                '<button class="dt-button buttons-html5 btn btn-sm" id="filter_24h" ' +
                'type="button" aria-controls="table_threshold" tabindex="0">' +
                '<span>24 giờ</span>' +
                '</button>'
            ).appendTo("#table_threshold_wrapper .dt-buttons");

            $('#table_threshold tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table_threshold.row(tr);

                if (row.child.isShown()) {
                    /*** This row is already open - close it ***/
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                    /*** Tạo biến lấy vị trí hàng dữ liệu được chọn để mở row_child ***/
                    row_detail = row.child(format(row.data(), "thresholdModal"))[0][0];
                    /*** Open this row ***/
                    row.child(format(row.data(), "thresholdModal")).show();
                    tr.addClass('shown');

                    /*** Onchange Dữ liệu theo time ***/
                    if ($("#filter_1h").hasClass("active")) {
                        DOM_data_child_Threshold(row_detail, 1);
                    } else if ($("#filter_8h").hasClass("active")) {
                        DOM_data_child_Threshold(row_detail, 8);
                    } else {
                        DOM_data_child_Threshold(row_detail, 24);
                    }
                }
            });

            /*** Control Button filter Times ***/
            $('#filter_1h').on('click', function () {
                $('#filter_1h').addClass('active');
                /*** Phải remove các Class Active sau khi nhấn 1 Button ***/
                $('#filter_8h').removeClass('active');
                $('#filter_24h').removeClass('active');
                /*** Xử lý Change dữ liệu ***/
                /*** Remove dữ liệu cũ ***/
                $('#table_threshold').DataTable().clear().draw();
                /*** Thêm dữ liệu mới ***/
                data_onchange = onChangeTime_feature(1);
                table_threshold = $('#table_threshold').DataTable();
                table_threshold.rows.add(data_onchange.data);
                table_threshold.columns.adjust().draw();
            });

            $('#filter_8h').on('click', function () {
                $('#filter_8h').addClass('active');
                $('#filter_1h').removeClass('active');
                $('#filter_24h').removeClass('active');
                /*** Xử lý Change dữ liệu ***/
                /*** Remove dữ liệu cũ ***/
                $('#table_threshold').DataTable().clear().draw();
                /*** Thêm dữ liệu mới ***/
                data_onchange = onChangeTime_feature(8);
                table_threshold = $('#table_threshold').DataTable();
                table_threshold.rows.add(data_onchange.data);
                table_threshold.columns.adjust().draw();
            });

            $('#filter_24h').on('click', function () {
                $('#filter_24h').addClass('active');
                $('#filter_1h').removeClass('active');
                $('#filter_8h').removeClass('active');
                /*** Xử lý Change dữ liệu ***/
                /*** Remove dữ liệu cũ ***/
                $('#table_threshold').DataTable().clear().draw();
                /*** Thêm dữ liệu mới ***/
                data_onchange = onChangeTime_feature(24);
                table_threshold = $('#table_threshold').DataTable();
                table_threshold.rows.add(data_onchange.data);
                table_threshold.columns.adjust().draw();
            });
        });
    }
}