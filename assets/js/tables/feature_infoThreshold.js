function getData_threshold_station() {
    /*---- Datables danh sách vượt ngưỡng ----*/
    $(document).ready(function () {
        /*** Datatable Vượt ngưỡng ***/
        var table_threshold = $('#table_threshold').DataTable({
            ajax: "assets_map/data/object_vuotnguong.json",
            columns: [
                {
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
                {"data": "name"},
                {"data": "loaihinh"},
                {"data": "loaitram"},
                {"data": "diadiem"}
            ],
            order: [[1, 'asc']],

            dom: "<'row'<'col-sm-7'B><'col-sm-3'l><'col-sm-2'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            buttons: [
                {extend: 'pdf', className: 'btn btn-info btn-sm'},
                {extend: 'excel', className: 'btn btn-info btn-sm'}
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
                        '<span style="font-size:13px;">Trước</span>'
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

        $('#table_threshold tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = table_threshold.row(tr);

            if (row.child.isShown()) {
                /*** This row is already open - close it ***/
                row.child.hide();
                tr.removeClass('shown');
            } else {
                /*** Open this row ***/
                row.child(format(row.data(), "thresholdModal")).show();
                tr.addClass('shown');
            }
        });
    });
}