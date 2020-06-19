var fromDate_data, toDate_data;
var table_sample;
function getData_sample_Bantudong() {
    $(document).ready(function () {
        fromDate_data = $("#FromDate_data").val();
        toDate_data = $("#ToDate_data").val();

        /*** Nếu thời gian đi hoặc thời gian đến rỗng ***/
        if (fromDate_data == '') {
            fromDate_data = '1900-01-01';
        }

        if (toDate_data == '') {
            toDate_data = '2200-01-01';
        }

        /*** Datatable Mẫu từng trạm ***/
        /*** Kiểm tra table_sampel đã có dữ liệu chưa, nếu có từ trước thì destroy ***/
        if ($.fn.DataTable.isDataTable('#table_sample')) {
            table_sample.destroy();
        }
        table_sample = $('#table_sample').DataTable({
            ajax: "services/call_data_sampleBTD.php?" +
                "stationid=" + station_id +
                "&fromDate=%27" + fromDate_data + "%27" +
                "&toDate=%27" + toDate_data + "%27",
            columns: [
                {
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
                {"data": "symbol"},
                {"data": "time_dateOfSamping"},
                {"data": "dateOfAnalysis"},
                {"data": "samplingLocations"},
                {"data": "weather"}
            ],
            order: [[1, 'asc']],

            dom: "<'row'<'col-sm-7'B><'col-sm-3'l><'col-sm-2'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            buttons: [
                {extend: 'pdf', className: 'btn btn-success btn-sm'},
                {extend: 'excel', className: 'btn btn-success btn-sm'}
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
                    'next': $('html').attr('dir') == 'rtl' ? '<span style="font-size:13px;">Trước</span>' :
                        '<span style="font-size:13px;">Sau</span>',
                    'previous': $('html').attr('dir') == 'rtl' ? '<span style="font-size:13px;">Sau</span>' :
                        '<span style="font-size:13;">Trước</span>'
                },
                sLengthMenu: "<span>Hiển thị&nbsp;</span> _MENU_<span> kết quả</span>",
                sZeroRecords: "Không tìm thấy kết quả",
                sInfo: "Hiển thị _START_ đến _END_ trên _TOTAL_ dòng",
                sInfoFiltered: "(tất cả _MAX_ dòng)",
                sInfoEmpty: "Hiển thị 0 đến _END_ trên _TOTAL_ dòng",
            },
        });

        table_sample.buttons().container()
            .appendTo('#table_threshold_wrapper .col-md-12:eq(0)');

        $('#table_sample tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = table_sample.row(tr);

            if (row.child.isShown()) {
                /*** This row is already open - close it ***/
                row.child.hide();
                tr.removeClass('shown');
            } else {
                /***  Open this row ***/
                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
        });
    });
}