/*----- Search Basic -----*/
/*** Function Search Basic ***/
$(document).one("ajaxStop", function () {
    $("#loading").hide();
    sizeLayerControl();

    /*** Search tên điểm quan trắc ***/
    var quantrac_nameBH = new Bloodhound({
        name: "quantrac_search_basic",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: quantrac_search_basic,
        limit: 10
    });

    /*** Search loại trạm quan trắc ***/
    var quantrac_loaitramBH = new Bloodhound({
        name: "quantrac_search_basic",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.loaitram);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: quantrac_search_basic,
        limit: 10
    });

    /*** Search loại hình quan trắc ***/
    var quantrac_loaihinhBH = new Bloodhound({
        name: "quantrac_search_basic",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.loaihinh);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: quantrac_search_basic,
        limit: 10
    });

    /*** Search quận huyện quan trắc ***/
    var quantrac_districtBH = new Bloodhound({
        name: "quantrac_search_basic",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.quanhuyen);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: quantrac_search_basic,
        limit: 10
    });

    /*** Search loại địa danh quan trắc ***/
    var quantrac_loaidiadanhtBH = new Bloodhound({
        name: "quantrac_search_basic",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.loaidiadanh);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: quantrac_search_basic,
        limit: 10
    });

    /*** Search địa danh quan trắc ***/
    var quantrac_diadanhBH = new Bloodhound({
        name: "quantrac_search_basic",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.diadanh);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: quantrac_search_basic,
        limit: 10
    });

    quantrac_nameBH.initialize();
    quantrac_loaitramBH.initialize();
    quantrac_loaihinhBH.initialize();
    quantrac_districtBH.initialize();
    quantrac_loaidiadanhtBH.initialize();
    quantrac_diadanhBH.initialize();

    $("#searchbox").typeahead({
        minLength: 1,
        highlight: false,
        hint: false
    }, {
        /*** Tên quan trắc ***/
        name: "quantrac_search_basic",
        displayKey: "name",
        source: quantrac_nameBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>" +
                "<i class='icon-home4 brown' style='font-size: 16px; margin-top: -2px'></i>" +
                "<span class='brown'>&nbsp;Trạm quan trắc</span>" +
                "</h4>",
            suggestion: Handlebars.compile(["" +
            "<i class='icon-home4' style='font-size: 13px; margin-top: -2px'></i>&nbsp;" +
            "<span style='font-weight: bolder'>Tên trạm::&nbsp;" + "{{name}}</span>" +
            "<br><i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa điểm:&nbsp;" + "{{quanhuyen}}</small>" +
            "<br><i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại hình:&nbsp;" + "{{loaihinh}}</small>" +
            "<br><i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại trạm:&nbsp;" + "{{loaitram}}</small>" +
            "<br><i class='mdi mdi-map-legend' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại địa danh:&nbsp;" + "{{loaidiadanh}}</small>" +
            "<br><i class='mdi mdi-location-enter' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa danh:&nbsp;" + "{{diadanh}}</small>"
            ].join(""))
        }
    }, {
        /*** Loại trạm quan trắc ***/
        name: "quantrac_search_basic",
        displayKey: "loaitram",
        source: quantrac_loaitramBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>" +
                "<i class='icon-server brown' style='font-size: 16px; margin-top: -2px'></i>" +
                "<span class='brown'>&nbsp;Loại trạm quan trắc</span>" +
                "</h4>",
            suggestion: Handlebars.compile(["" +
            "<i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>&nbsp;" +
            "<span style='font-weight: bolder'>Loại trạm:&nbsp;" + "{{loaitram}}</span>" +
            "<br><i class='icon-home4' style='font-size: 13px; margin-top: -2px'></i>" +
            "&nbsp;<small>Tên trạm:&nbsp;" + "{{name}}</small>" +
            "<br><i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa điểm:&nbsp;" + "{{quanhuyen}}</small>" +
            "<br><i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại hình:&nbsp;" + "{{loaihinh}}</small>" +
            "<br><i class='mdi mdi-map-legend' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại địa danh:&nbsp;" + "{{loaidiadanh}}</small>" +
            "<br><i class='mdi mdi-location-enter' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa danh:&nbsp;" + "{{diadanh}}</small>"
            ].join(""))
        }
    }, {
        /*** Loại hình quan trắc ***/
        name: "quantrac_search_basic",
        displayKey: "loaihinh",
        source: quantrac_loaihinhBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>" +
                "<i class='icon-lab brown' style='font-size: 16px; margin-top: -2px'></i>" +
                "<span class='brown'>&nbsp;Loại hình quan trắc</span>" +
                "</h4>",
            suggestion: Handlebars.compile(["" +
            "<i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>&nbsp;" +
            "<span style='font-weight: bolder'>Loại hình:&nbsp;" + "{{loaihinh}}</span>" +
            "<br><i class='icon-home4' style='font-size: 13px; margin-top: -2px'></i>" +
            "&nbsp;<small>Tên trạm:&nbsp;" + "{{name}}</small>" +
            "<br><i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa điểm:&nbsp;" + "{{quanhuyen}}</small>" +
            "<br><i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại trạm:&nbsp;" + "{{loaitram}}</small>" +
            "<br><i class='mdi mdi-map-legend' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại địa danh:&nbsp;" + "{{loaidiadanh}}</small>" +
            "<br><i class='mdi mdi-location-enter' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa danh:&nbsp;" + "{{diadanh}}</small>"
            ].join(""))
        }
    }, {
        /*** Huyện/thành phố quan trắc ***/
        name: "quantrac_search_basic",
        displayKey: "quanhuyen",
        source: quantrac_districtBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>" +
                "<i class='icon-location4 brown' style='font-size: 16px; margin-top: -2px'></i>" +
                "<span class='brown'>&nbsp;Huyện/Thành phố</span>" +
                "</h4>",
            suggestion: Handlebars.compile(["" +
            "<i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>&nbsp;" +
            "<span style='font-weight: bolder'>Huyện/thành phố:&nbsp;" + "{{quanhuyen}}</span>" +
            "<br><i class='icon-home4' style='font-size: 13px; margin-top: -2px'></i>" +
            "&nbsp;<small>Tên trạm:&nbsp;" + "{{name}}</small>" +
            "<br><i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại trạm:&nbsp;" + "{{loaitram}}</small>" +
            "<br><i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại hình:&nbsp;" + "{{loaihinh}}</small>" +
            "<br><i class='mdi mdi-map-legend' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại địa danh:&nbsp;" + "{{loaidiadanh}}</small>" +
            "<br><i class='mdi mdi-location-enter' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa danh:&nbsp;" + "{{diadanh}}</small>"
            ].join(""))
        }
    }, {
        /*** Loại địa danh quan trắc ***/
        name: "quantrac_search_basic",
        displayKey: "loaidiadanh",
        source: quantrac_loaidiadanhtBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>" +
                "<i class='mdi mdi-map-legend brown' style='font-size: 16px; margin-top: -2px'></i>" +
                "<span class='brown'>&nbsp;Loại địa danh</span>" +
                "</h4>",
            suggestion: Handlebars.compile(["" +
            "<i class='mdi mdi-map-legend' style='font-size: 16px; margin-top: -2px'></i>&nbsp;" +
            "<span style='font-weight: bolder'>Loại địa danh:&nbsp;" + "{{loaidiadanh}}</span>" +
            "<br><i class='icon-home4' style='font-size: 13px; margin-top: -2px'></i>" +
            "&nbsp;<small>Tên trạm:&nbsp;" + "{{name}}</small>" +
            "<br><i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại trạm:&nbsp;" + "{{loaitram}}</small>" +
            "<br><i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại hình:&nbsp;" + "{{loaihinh}}</small>" +
            "<br><i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa điểm:&nbsp;" + "{{quanhuyen}}</small>" +
            "<br><i class='mdi mdi-location-enter' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa danh:&nbsp;" + "{{diadanh}}</small>"
            ].join(""))
        }
    }, {
        /*** Địa danh quan trắc ***/
        name: "quantrac_search_basic",
        displayKey: "diadanh",
        source: quantrac_diadanhBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>" +
                "<i class='mdi mdi-location-enter brown' style='font-size: 16px; margin-top: -2px'></i>" +
                "<span class='brown'>&nbsp;Địa danh</span>" +
                "</h4>",
            suggestion: Handlebars.compile(["" +
            "<i class='mdi mdi-location-enter' style='font-size: 16px; margin-top: -2px'></i>&nbsp;" +
            "<span style='font-weight: bolder'>Địa danh:&nbsp;" + "{{diadanh}}</span>" +
            "<br><i class='icon-home4' style='font-size: 13px; margin-top: -2px'></i>" +
            "&nbsp;<small>Tên trạm:&nbsp;" + "{{name}}</small>" +
            "<br><i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại trạm:&nbsp;" + "{{loaitram}}</small>" +
            "<br><i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại hình:&nbsp;" + "{{loaihinh}}</small>" +
            "<br><i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa điểm:&nbsp;" + "{{quanhuyen}}</small>" +
            "<br><i class='mdi mdi-map-legend' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại địa danh:&nbsp;" + "{{loaidiadanh}}</small>"
            ].join(""))
        }
    }).on("typeahead:selected", function (obj, datum) {
        if (datum.source === "quantrac_search_basic") {
            map.setView([datum.lat, datum.lng], 15);

            /*** Tự động mở Modal sau khi Zoom ***/
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            }
        }

        if ($(".navbar-collapse").height() > 50) {
            $(".navbar-collapse").collapse("hide");
        }
    }).on("typeahead:opened", function () {
        $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
        $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
    }).on("typeahead:closed", function () {
        $(".navbar-collapse.in").css("max-height", "");
        $(".navbar-collapse.in").css("height", "");
    });
    $(".twitter-typeahead").css("position", "static");
    $(".twitter-typeahead").css("display", "block");
})

/*----- Search Advanced -----*/
var url_call_station = '';
/*** Biến điều kiện cần chứa 1=1 (đối với loại trạm và Quận huyện)
 và chứa '= 0' (đối với loại hình) để hiển thị ***/
var item_loaihinh_cond = '%20loaihinh[]=0';
var item_loaitram_cond = '%20loaitram=1=1';
var item_quanhuyen_cond = '%20quanhuyen=1=1';
var item_loaidiadanh_cond = '%20loaidiadanh=1=1';
var item_diadanh_cond = '%20diadanh=1=1';

/*** Cập nhật lại option trạm quan trắc và thông báo số lượng trạm quan trắc ***/
function update_Station() {
    $('#quantrac').find('option').remove();
    $.getJSON(url_call_station, function (data_DOM_qt) {
        var DOM_opt_qt = data_DOM_qt.features;
        /*** DOM count ***/
        if (DOM_opt_qt.length == 0) {
            $(".search-error").css("display", "block");
            $(".search-success").css("display", "none");
        } else {
            $(".search-success span").text(" Tìm thấy " + DOM_opt_qt.length + " trạm quan trắc");
            $(".search-success").css("display", "block");
            $(".search-error").css("display", "none");
        }
        /*** Chèn Option ***/
        $('#quantrac')
            .append($("<option></option>")
                .attr('value', '0').text('Lựa chọn trạm quan trắc'));
        for (i = 0; i < DOM_opt_qt.length; i++) {
            $('#quantrac')
                .append($("<option></option>")
                    .attr('value', DOM_opt_qt[i].properties.name).text(DOM_opt_qt[i].properties.name));
        }
    })
}

/*** Lựa chọn loại hình ***/
$('#loaihinh').on("changed.jstree", function (e, data) {
    var checkedNodes = []
    /*** Kiểm tra data.action trả về, chỉ lấy dạng ready (kki mới load trang hoặc "Select node" khi change ***/
    if (data.action == "ready" || data.action == "select_node") {
        checkedNodes = data.selected;
    }

    if (checkedNodes.length == 0) {
        item_loaihinh_cond = '%20loaihinh[]=9999';
    } else {
        item_loaihinh_cond = '';
        for (i = 0; i < checkedNodes.length; i++) {
            item_loaihinh_cond += '%20loaihinh[]=' + checkedNodes[i] + '&';
        }
    }
    url_call_station = 'services/call_obser_station.php?'
        + item_loaihinh_cond + '&' + item_loaitram_cond + '&' + item_quanhuyen_cond +
        '&' + item_loaidiadanh_cond + '&' + item_diadanh_cond;

    /*** Cập nhật lại hiển thị của dữ liệu quan trắc ***/
    lats = [], lngs = [];
    view_data_quantrac.refresh(url_call_station);
    update_Station();
})

/*** Lựa chọn loại trạm ***/
$("#loaitram").change(function () {
    /*** Thay đổi option của Select ***/
    var item_loaitram = $("#loaitram").val();
    if (item_loaitram != 'none') {
        item_loaitram_cond = '%20loaitram=' + item_loaitram;
    } else {
        item_loaitram_cond = '%20loaitram=1=1';
    }
    /*** Gọi service 'call_obser_station.php' có thêm các điều kiện khi lựa chọn Select Option ***/
    url_call_station = 'services/call_obser_station.php?'
        + item_loaihinh_cond + '&' + item_loaitram_cond + '&' + item_quanhuyen_cond +
        '&' + item_loaidiadanh_cond + '&' + item_diadanh_cond;

    /*** Cập nhật lại hiển thị của dữ liệu quan trắc ***/
    lats = [], lngs = [];
    view_data_quantrac.refresh(url_call_station);
    update_Station()
});

/*** Lựa chọn quận huyện ***/
$("#district").change(function () {
    var item_quanhuyen = $("#district").val();
    if (item_quanhuyen != 'none') {
        item_quanhuyen_cond = '%20quanhuyen=' + item_quanhuyen;
    } else {
        item_quanhuyen_cond = '%20quanhuyen=1=1';
    }
    url_call_station = 'services/call_obser_station.php?'
        + item_loaihinh_cond + '&' + item_loaitram_cond + '&' + item_quanhuyen_cond +
        '&' + item_loaidiadanh_cond + '&' + item_diadanh_cond;

    /*** Cập nhật lại hiển thị của dữ liệu quan trắc ***/
    lats = [], lngs = [];
    view_data_quantrac.refresh(url_call_station);
    update_Station()
});

/*** Lựa chọn loại địa danh ***/
$("#locType").change(function () {
    var item_loaidiadanh = $("#locType").val();
    if (item_loaidiadanh != 'none') {
        item_loaidiadanh_cond = '%20loaidiadanh=' + item_loaidiadanh;
    } else {
        item_loaidiadanh_cond = '%20loaidiadanh=1=1';
    }
    url_call_station = 'services/call_obser_station.php?'
        + item_loaihinh_cond + '&' + item_loaitram_cond + '&' + item_quanhuyen_cond +
        '&' + item_loaidiadanh_cond + '&' + item_diadanh_cond;

    /*** Cập nhật lại hiển thị của dữ liệu quan trắc ***/
    lats = [], lngs = [];
    view_data_quantrac.refresh(url_call_station);
    update_Station()
});

/*** Lựa chọn loại địa danh ***/
$("#location").change(function () {
    var item_diadanh = $("#loccation").val();
    if (item_diadanh != 'none') {
        item_diadanh_cond = '%20loaidiadanh=' + item_diadanh;
    } else {
        item_diadanh_cond = '%20loaidiadanh=1=1';
    }
    url_call_station = 'services/call_obser_station.php?'
        + item_loaihinh_cond + '&' + item_loaitram_cond + '&' + item_quanhuyen_cond +
        '&' + item_loaidiadanh_cond + '&' + item_diadanh_cond;

    /*** Cập nhật lại hiển thị của dữ liệu quan trắc ***/
    lats = [], lngs = [];
    view_data_quantrac.refresh(url_call_station);
    update_Station()
});

function search_tramqt() {
    var tramqt = document.getElementById("quantrac").value;
    for (var attr_modal in quantrac_search_advanced) {
        var datum = quantrac_search_advanced[attr_modal];
        if (tramqt == datum.name) {
            map.setView([datum.lat, datum.lng], 15);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            }
        }
    }
}
