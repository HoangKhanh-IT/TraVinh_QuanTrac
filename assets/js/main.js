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
function format(d, ID_modal) {
    var time_date_Arr = d.detail.time.split(", ");
    var time = time_date_Arr[0];
    var date = time_date_Arr[1];
    var DOM_child_table = '';

    if (ID_modal == "sampleModal") {
        DOM_child_table = '<table class="table table-bordered table-responsive">';
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
    }

    if (ID_modal == "thresholdModal") {
        DOM_child_table = '';
    }

    return DOM_child_table;
}

/* $.getJSON("assets_map/data/data_viewgroupchart_demo.json", function (data_viewgroupchart_demo) {
    render_groupchart_quantrac("chart_stats_para_1", data_viewgroupchart_demo, "Nhu cầu Oxy hóa học",
        "Thời gian", "Nhu cầu Oxy hóa học");
}) */