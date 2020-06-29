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
            $(this).attr("lng")
        ], highlightStyle));
    });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

/*---- Reset Input ----*/
$(".reset_input").click(function () {
    $("input[type=date]").val("")
})

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
    getData_threshold_station();

    /*** Reset Button ***/
    $('#fillter_1h').addClass('active');
    $('#fillter_8h').removeClass('active');
    $('#fillter_24h').removeClass('active');

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

/*---- Call Standard Parameter using Ajax ----*/
var total_std_param;
$.ajax({
    url: "services/call_standard_param.php",
    async: false,
    dataType: 'json',
    success: function (data) {
        total_std_param = data;
    }
});

/*---- Datables Children DOM ----*/
/*** `d` is the original data object for the row ***/
function format(d, ID_modal) {
    var DOM_child_table = '';
    var parameterName, parameterID, unitName;
    var spidID, value;

    if (ID_modal == "sampleModal") {
        DOM_child_table = '<div class="table-wrapper">' +
            '<table class="table table-bordered table-striped table-hover">';
        DOM_child_table += '<thead>' +
            '<tr>' +
            '<th class="first-col" scope="col" ' +
            'style="border-top: 1px solid #ddd !important; ' +
            'margin-top: -1px; text-align: center;"> Thông số </th>'

        /*** Sử dụng Object keys để lấy tên từng tham số ***/
        for (var i_sample = 0; i_sample < d.detail.data.length; i_sample++) {
            spidID = Object.keys(d.detail.data[i_sample]);
            for (var k_para_sample = 0; k_para_sample < total_std_param.length; k_para_sample++) {
                if (parseInt(spidID) == total_std_param[k_para_sample].id) {
                    parameterName = total_std_param[k_para_sample].parameterName;
                }
            }
            DOM_child_table += '<th scope="col" class="parameter_tab">' + parameterName + '</th>';
        }

        DOM_child_table += '</thead><tbody>' + '<tr>' +
            '<th class="first-col" ' +
            'style="border-bottom: 1px solid #ddd !important;">' + 'Giá trị/Thời gian' + '</th>';

        /*** Sử dụng Object value để lấy value của từng tham số ***/
        for (var j_sample = 0; j_sample < d.detail.data.length; j_sample++) {
            spidID = Object.keys(d.detail.data[j_sample]);
            value = Object.values(d.detail.data[j_sample]);
            for (var k_value_sample = 0; k_value_sample < total_std_param.length; k_value_sample++) {
                if (parseInt(spidID) == total_std_param[k_value_sample].id) {
                    unitName = total_std_param[k_value_sample].unitName;
                }
            }
            DOM_child_table += '<td style="text-align: center"><b class="green">' +
                value[0].v + ' ' + unitName + '</b></td>';
        }
    }
    DOM_child_table += '</tr></tbody></table></div>';

    if (ID_modal == "thresholdModal") {
        var total_detail = d.total_detail;

        if (total_detail.length != 0) {
            DOM_child_table = '<div class="table-wrapper-threshold">' +
                '<table class="table table-bordered table-striped table-hover">';
            DOM_child_table += '<thead>' +
                '<tr>' +
                '<th class="first-col-threshold"></th>' +
                '<th class="first-col-threshold" scope="col" ' +
                'style="border-top: 1px solid #ddd !important; ' +
                'margin-top: -1px; text-align: center;"> Thời gian/Thông số </th>'

            /*** DOM tên thông số chung kèm Min Max***/
            var detail_data_param = total_detail[0].data;
            for (var i_threshold = 0; i_threshold < detail_data_param.length; i_threshold++) {
                spidID = Object.keys(detail_data_param[i_threshold]);
                var min, max, dom_min_max;
                for (var k_para_threshold = 0; k_para_threshold < total_std_param.length; k_para_threshold++) {
                    if (parseInt(spidID) == total_std_param[k_para_threshold].id) {
                        parameterID = total_std_param[k_para_threshold].parameterid;
                        parameterName = total_std_param[k_para_threshold].parameterName;
                        min = total_std_param[k_para_threshold].min_value;
                        max = total_std_param[k_para_threshold].max_value;

                        /*** DOM ngưỡng dữ liệu
                        if (min == null && max != null) {
                            dom_min_max = '&#8804; ' + max;
                        }
                        if (min != null && max == null) {
                            dom_min_max = '&#8805; ' + min;
                        }
                        if (min != null && max != null) {
                            dom_min_max = min + ' &#8804; x &#8804; ' + max;
                        }  ***/
                    }
                }
                /*** DOM min max
                DOM_child_table += '<th scope="col" style="white-space: nowrap;" ' +
                    'class="parameter_tab" id="' + spidID + '">' +
                    parameterName + ' (' + dom_min_max + ')</th>'; ***/

                DOM_child_table += '<th scope="col" style="" ' +
                    'class="parameter_tab" id="' + spidID + '">' +
                    parameterName + '</th>';
            }

            /*** DOM value vượt ngưỡng ***/
            /*** Thay đổi rowspan theo time và date  ***/
            DOM_child_table += '</thead><tbody>' + '<tr>' +
                '<th class="first-col-threshold" rowspan="' + total_detail.length + '"></th>';

            /*** Tạo bảng dữ liệu trước ***/
            for (var i_dom_threshold = 0; i_dom_threshold < total_detail.length; i_dom_threshold++) {
                var detail_data_value = total_detail[i_dom_threshold].data;
                var j_threshold;
                var td_id_threshold;

                /*** DOM hàng đầu tiên không thêm thẻ tr ***/
                if (i_dom_threshold == 0) {
                    /*** Thời gian ***/
                    DOM_child_table += '<td style="text-align: center" ' +
                        'class="first-col-threshold ' + i_dom_threshold + '_daytimes' + '">' +
                        '</td>';
                    /*** Số liệu vượt ngưỡng và đơn vị ***/
                    for (j_threshold = 0; j_threshold < detail_data_value.length; j_threshold++) {
                        /*** Thêm thuộc tính ID có chứa hàng row i và ID thông số ***/
                        spidID = Object.keys(detail_data_value[j_threshold]);
                        td_id_threshold = i_dom_threshold + "_" + spidID;

                        DOM_child_table += '<td style="text-align: center" ' +
                            'id="' + td_id_threshold + '">' +
                            '<b class="red"></b>' +
                            '</td>';
                    }
                }
                DOM_child_table += '</tr>';

                /*** DOM các hàng tiếp theo cần thêm thẻ tr ***/
                if (i_dom_threshold >= 1) {
                    /*** Thời gian ***/
                    DOM_child_table += '<tr><td style="text-align: center" ' +
                        'class="first-col-threshold ' + i_dom_threshold + '_daytimes' + '">' +
                        '</td>';
                    /*** Số liệu vượt ngưỡng và đơn vị ***/
                    for (j_threshold = 0; j_threshold < detail_data_value.length; j_threshold++) {
                        /*** Thêm thuộc tính ID có chứa hàng row i và ID thông số ***/
                        td_id_threshold = i_dom_threshold + "_" +
                            Object.keys(detail_data_value[j_threshold]);

                        DOM_child_table += '<td style="text-align: center" ' +
                            'id="' + td_id_threshold + '">' +
                            '<b class="red"></b>' +
                            '</td>';
                    }
                    DOM_child_table += '</tr>'
                }
            }
            DOM_child_table += '</tbody></table></div>';
        } else {
            DOM_child_table = '<div class="red" style="text-align: center;">' +
                '<b>Không có dữ liệu</b></div>'
        }
    }
    return DOM_child_table;
}

/* $.getJSON("assets_map/data/data_viewgroupchart_demo.json", function (data_viewgroupchart_demo) {
    render_groupchart_quantrac("chart_stats_para_1", data_viewgroupchart_demo, "Nhu cầu Oxy hóa học",
        "Thời gian", "Nhu cầu Oxy hóa học");
}) */