/*** Hàm này được thực hiện sau khi tạo được bảng con hoàn chỉnh ***/
function DOM_data_child_Threshold(row_detail, time) {
    var total_threshold_station = onChangeTime_feature(time);
    var total_detail = total_threshold_station.data[row_detail].total_detail;

    for (var i_dom_threshold = 0; i_dom_threshold < total_detail.length; i_dom_threshold++) {
        var detail_data_value = total_detail[i_dom_threshold].data;
        var j_threshold;
        var td_id_threshold;
        var valueinlimit;

        for (j_threshold = 0; j_threshold < detail_data_value.length; j_threshold++) {
            spidID = Object.keys(detail_data_value[j_threshold]);
            td_id_threshold = i_dom_threshold + "_" + spidID;

            value = Object.values(detail_data_value[j_threshold]);
            for (var k_value_threshold = 0; k_value_threshold < total_std_param.length; k_value_threshold++) {
                if (parseInt(spidID) == total_std_param[k_value_threshold].id && value[0].inlimit == "Y") {
                    valueinlimit = value[0].v;
                    unitName = total_std_param[k_value_threshold].unitName;
                    /*** DOM values into Cell with ID ***/
                    $("#" + td_id_threshold + " b").html(valueinlimit + " " + unitName)
                }
            }
        }
    }
}

function getData_threshold_station() {
    /*---- Datables danh sách vượt ngưỡng ----*/
    var data_onchange = onChangeTime_feature(1);
    if ($.fn.DataTable.isDataTable('#table_threshold')) {

    }
    if (!$.fn.DataTable.isDataTable('#table_threshold')) {
        $(document).ready(function() {
            /*** Datatable Vượt ngưỡng ***/
            var table_threshold = $('#table_threshold').DataTable({
                data: data_onchange.data,
                columns: [{
                        "className": 'details-control',
                        "orderable": false,
                        "data": null,
                        "defaultContent": ''
                    },
                    { "data": "name" },
                    { "data": "obstype_namelist" },
                    { "data": "categoryName" },
                    { "data": "districtName" }
                ],
                order: [
                    [1, 'asc']
                ],

                dom: "<'row'<'col-sm-7'B><'col-sm-3'l><'col-sm-2'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                buttons: [
                    { extend: 'pdf', className: 'btn btn-info btn-sm' },
                    { extend: 'excel', className: 'btn btn-info btn-sm' }
                ],
                paging: true,
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

            $('<button class="dt-button buttons-html5 btn btn-sm active" id="fillter_1h" ' +
                'type="button" aria-controls="table_threshold" tabindex="0" ' +
                'style="margin-right: 4.5px; margin-left: 30%;">' +
                '<span>1 giờ</span>' +
                '</button>' +
                '<button class="dt-button buttons-html5 btn btn-sm" id="fillter_8h" ' +
                'type="button" aria-controls="table_threshold" tabindex="0" style="margin-right: 4.5px;">' +
                '<span>8 giờ</span>' +
                '</button>' +
                '<button class="dt-button buttons-html5 btn btn-sm" id="fillter_24h" ' +
                'type="button" aria-controls="table_threshold" tabindex="0">' +
                '<span>24 giờ</span>' +
                '</button>'
            ).appendTo("#table_threshold_wrapper .dt-buttons");

            $('#table_threshold tbody').on('click', 'td.details-control', function() {
                var tr = $(this).closest('tr');
                var row = table_threshold.row(tr);

                if (row.child.isShown()) {
                    /*** This row is already open - close it ***/
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                    /*** Tạo biến lấy vị trí hàng dữ liệu được chọn để mở row_child ***/
                    onChangeTime_feature(1);
                    var row_detail = row.child(format(row.data(), "thresholdModal"))[0][0];
                    /*** Open this row ***/
                    row.child(format(row.data(), "thresholdModal")).show();
                    /*** Onchange Dữ liệu theo time ***/
                    DOM_data_child_Threshold(row_detail, 1);
                    tr.addClass('shown');
                }
            });

            /*** Control Button Fillter Times ***/
            $('#fillter_1h').on('click', function() {
                $('#fillter_1h').addClass('active');
                /*** Phải remove các Class Active sau khi nhấn 1 Button ***/
                $('#fillter_8h').removeClass('active');
                $('#fillter_24h').removeClass('active');
                /*** Xử lý Change dữ liệu ***/

                $('#table_threshold').DataTable().destroy();
                $('#table_threshold').empty();

                /* onChangeTime_feature(1);
                DOM_data_child_Threshold(row_detail, 1); */
            });

            $('#fillter_8h').on('click', function() {
                $('#fillter_8h').addClass('active');
                $('#fillter_1h').removeClass('active');
                $('#fillter_24h').removeClass('active');

                $('#table_threshold').DataTable().clear();
                // onChangeTime_feature(8);
                // DOM_data_child_Threshold(row_detail, 8);
            });

            $('#fillter_24h').on('click', function() {
                $('#fillter_24h').addClass('active');
                $('#fillter_1h').removeClass('active');
                $('#fillter_8h').removeClass('active');

                $('#table_threshold').DataTable().clear();
                // onChangeTime_feature(24);
                // DOM_data_child_Threshold(row_detail, 24);
            });
        });
    }
}