var map, featureList;

$(window).resize(function () {
    sizeLayerControl();
});

$(document).on("click", ".feature-row", function (e) {
    $(document).off("mouseout", ".feature-row", clearHighlight);
    sidebarClick(parseInt($(this).attr("id"), 10));
});

if (!("ontouchstart" in window)) {
    $(document).on("mouseover", ".feature-row", function (e) {
        highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"),
            $(this).attr("lng")], highlightStyle));
    });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

/*---- Modal About Us ----*/
$("#about-btn").click(function () {
    $("#aboutModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

/*---- Modal Login ----*/
$("#login-btn").click(function () {
    $("#loginModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

/*---- Modal Threshold ----*/
$("#threshold-btn").click(function () {
    $("#thresholdModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

/*---- Modal Sample ----*/
$("#sample-btn").click(function () {
    $("#sampleModal").modal("show");
    getData_sample_Bantudong();
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

/*---- Modal Statistic ----*/
$("#statistic-btn").click(function () {
    $("#statisticModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

/*---- Modal Statistic Result ----*/
$("#statistic-result-btn").click(function () {
    $("#statisticModal").modal("hide");
    $("#statistic_resultModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

/*---- Modal Search Stats Trạm ----*/
$("#search_stats_tramqt").click(function () {
    $("#search_stats_tramqtModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

/*---- Modal Search Checkbox Parameters ----*/
$("#search_para").click(function () {
    $("#search_paraqtModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

$("#list-btn").click(function () {
    animateSidebar();
    return false;
});

$("#nav-btn").click(function () {
    $(".navbar-collapse").collapse("toggle");
    return false;
});

$("#sidebar-toggle-btn").click(function () {
    animateSidebar();
    return false;
});

$("#sidebar-hide-btn").click(function () {
    animateSidebar();
    return false;
});

function animateSidebar() {
    $("#sidebar").animate({
        width: "toggle"
    }, 350, function () {
        map.invalidateSize();
    });
}

function sizeLayerControl() {
    $(".leaflet-control-layers").css("max-height", $("#mymap").height() - 50);
}

function clearHighlight() {
    highlight.clearLayers();
}

/*---- Highlight search box text on click ----*/
$("#searchbox").click(function () {
    $(this).select();
});

/*---- Prevent hitting enter from refreshing the page ----*/
$("#searchbox").keypress(function (e) {
    if (e.which == 13) {
        e.preventDefault();
    }
});

/*---- Draggable Modal ----*/
$(".modal-header").on("mousedown", function (mousedownEvt) {
    var $draggable = $(this);
    var x = mousedownEvt.pageX - $draggable.offset().left,
        y = mousedownEvt.pageY - $draggable.offset().top;
    $("body").on("mousemove.draggable", function (mousemoveEvt) {
        $draggable.closest(".modal-dialog").offset({
            "left": mousemoveEvt.pageX - x,
            "top": mousemoveEvt.pageY - y
        });
    });
    $("body").one("mouseup", function () {
        $("body").off("mousemove.draggable");
    });
    $draggable.closest(".modal").one("bs.modal.hide", function () {
        $("body").off("mousemove.draggable");
    });
});

/*---- Datables Children DOM ----*/
/*** `d` is the original data object for the row ***/
function format(d) {
    var time_date_Arr = d.detail.time.split(", ");
    var time = time_date_Arr[0];
    var date = time_date_Arr[1];

    var DOM_child_table = '<table class="table table-bordered table-responsive">';
    DOM_child_table += '<thead>' +
        '<tr class="">' +
        '<th scope="col"> Thông số </th>'

    /*** Sử dụng Object keys để lấy tên từng tham số ***/
    for (var i = 0; i < d.detail.data.length; i++) {
        var param = Object.keys(d.detail.data[i]);
        DOM_child_table += '<th scope="col" class="parameter_tab">' + param + '</th>';
    }

    /*** Thay đổi rowspan theo time và date ***/
    DOM_child_table += '<tbody>' + '<th rowspan="">' + 'Giá trị/Thời gian' + '</th>';

    /*** Sử dụng Object value để lấy value của từng tham số ***/
    for (var j = 0; j < d.detail.data.length; j++) {
        var value = Object.values(d.detail.data[j]);
        DOM_child_table += '<td><b class="red">' + value[0].v + ' | ' + time + ' | ' + date + '</b></th>';
    }

    return DOM_child_table;
}

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
                    '<span style="font-size:13;">Trước</span>'
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
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
});

/* $.getJSON("assets_map/data/data_viewgroupchart_demo.json", function (data_viewgroupchart_demo) {
    render_groupchart_quantrac("chart_stats_para_1", data_viewgroupchart_demo, "Nhu cầu Oxy hóa học",
        "Thời gian", "Nhu cầu Oxy hóa học");
}) */
