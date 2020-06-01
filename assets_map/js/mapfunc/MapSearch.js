/*----- Search Basic -----*/
/*** Function Search Basic ***/
$(document).one("ajaxStop", function () {
    $("#loading").hide();
    sizeLayerControl();

    /*** Search tên điểm quan trắc ***/
    var quantracBH = new Bloodhound({
        name: "quantrac_search",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: quantrac_search,
        limit: 10
    });

    /*** Search loại trạm quan trắc ***/
    var quantrac_loaitramBH = new Bloodhound({
        name: "quantrac_search",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.loaitram);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: quantrac_search,
        limit: 10
    });

    /*** Search loại hình quan trắc ***/
    var quantrac_loaihinhBH = new Bloodhound({
        name: "quantrac_search",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.loaihinh);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: quantrac_search,
        limit: 10
    });

    /*** Search quận huyện quan trắc ***/
    var quantrac_districtBH = new Bloodhound({
        name: "quantrac_search",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.quanhuyen);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: quantrac_search,
        limit: 10
    });

    quantracBH.initialize();
    quantrac_loaitramBH.initialize();
    quantrac_loaihinhBH.initialize();
    quantrac_districtBH.initialize();

    $("#searchbox").typeahead({
        minLength: 1,
        highlight: false,
        hint: false
    }, {
        /*** Tên quan trắc ***/
        name: "quantrac_search",
        displayKey: "name",
        source: quantracBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>" +
                "<i class='icon-home4 brown' style='font-size: 16px; margin-top: -2px'></i>" +
                "<span class='brown'>&nbsp;Trạm quan trắc</span>" +
                "</h4>",
            suggestion: Handlebars.compile(["" +
            "<i class='icon-home4' style='font-size: 13px; margin-top: -2px'></i>&nbsp;" +
            "<span style='font-weight: bolder'>{{name}}</span>" +
            "<br><i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa điểm:&nbsp;" + "{{quanhuyen}}</small>" +
            "<br><i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại hình:&nbsp;" + "{{loaihinh}}</small>" +
            "<br><i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại trạm:&nbsp;" + "{{loaitram}}</small>"
            ].join(""))
        }
    }, {
        /*** Loại trạm quan trắc ***/
        name: "quantrac_search",
        displayKey: "loaitram",
        source: quantrac_loaitramBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>" +
                "<i class='icon-server brown' style='font-size: 16px; margin-top: -2px'></i>" +
                "<span class='brown'>&nbsp;Loại trạm quan trắc</span>" +
                "</h4>",
            suggestion: Handlebars.compile(["" +
            "<i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>&nbsp;" +
            "<span style='font-weight: bolder'>{{loaitram}}</span>" +
            "<br><i class='icon-home4' style='font-size: 13px; margin-top: -2px'></i>" +
            "&nbsp;<small>Tên trạm:&nbsp;" + "{{name}}</small>" +
            "<br><i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa điểm:&nbsp;" + "{{quanhuyen}}</small>" +
            "<br><i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại hình:&nbsp;" + "{{loaihinh}}</small>"
            ].join(""))
        }
    }, {
        /*** Loại hình quan trắc ***/
        name: "quantrac_search",
        displayKey: "loaihinh",
        source: quantrac_loaihinhBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>" +
                "<i class='icon-lab brown' style='font-size: 16px; margin-top: -2px'></i>" +
                "<span class='brown'>&nbsp;Loại hình quan trắc</span>" +
                "</h4>",
            suggestion: Handlebars.compile(["" +
            "<i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>&nbsp;" +
            "<span style='font-weight: bolder'>{{loaihinh}}</span>" +
            "<br><i class='icon-home4' style='font-size: 13px; margin-top: -2px'></i>" +
            "&nbsp;<small>Tên trạm:&nbsp;" + "{{name}}</small>" +
            "<br><i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Địa điểm:&nbsp;" + "{{quanhuyen}}</small>" +
            "<br><i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại trạm:&nbsp;" + "{{loaitram}}</small>"
            ].join(""))
        }
    }, {
        /*** Huyện/thành phố quan trắc ***/
        name: "quantrac_search",
        displayKey: "quanhuyen",
        source: quantrac_districtBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>" +
                "<i class='icon-location4 brown' style='font-size: 16px; margin-top: -2px'></i>" +
                "<span class='brown'>&nbsp;Huyện/Thành phố</span>" +
                "</h4>",
            suggestion: Handlebars.compile(["" +
            "<i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>&nbsp;" +
            "<span style='font-weight: bolder'>{{quanhuyen}}</span>" +
            "<br><i class='icon-home4' style='font-size: 13px; margin-top: -2px'></i>" +
            "&nbsp;<small>Tên trạm:&nbsp;" + "{{name}}</small>" +
            "<br><i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại trạm:&nbsp;" + "{{loaitram}}</small>" +
            "<br><i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>" +
            "&nbsp;<small>Loại hình:&nbsp;" + "{{loaihinh}}</small>"
            ].join(""))
        }
    }).on("typeahead:selected", function (obj, datum) {
        if (datum.source === "quantrac_search") {
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

/*** Lựa chọn loại hình ***/
$('#loaihinh').on("changed.jstree", function (e, data) {
    var checkedNodes = []
    checkedNodes = data.selected;

    if (checkedNodes.length == 0) {
        item_loaihinh_cond = '%20loaihinh[]=9999';
    } else {
        item_loaihinh_cond = '';
        for (i = 0; i < checkedNodes.length; i++) {
            item_loaihinh_cond += '%20loaihinh[]=' + checkedNodes[i] + '&';
        }
    }
    url_call_station = 'services/call_obser_station.php?'
        + item_loaihinh_cond + '&' + item_loaitram_cond + '&' + item_quanhuyen_cond;
    view_data_quantrac.refresh(url_call_station);

    /*** Cập nhật lại hiển thị của dữ liệu quan trắc ***/
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
})

/*** Lựa chọn loại trạm ***/
$("#loaitram").change(function () {
    /*** Thay đổi option của Select ***/
    var item_loaitram = $("#loaitram").val();
    if (item_loaitram != 'none') {
        // item_loaitram_cond = '%20loaitram=%27' + item_loaitram + '%27';
        item_loaitram_cond = '%20loaitram=' + item_loaitram;
    } else {
        item_loaitram_cond = '%20loaitram=1=1';
    }
    /*** Gọi service 'call_obser_station.php' có thêm các điều kiện khi lựa chọn Select Option ***/
    url_call_station = 'services/call_obser_station.php?'
        + item_loaihinh_cond + '&' + item_loaitram_cond + '&' + item_quanhuyen_cond;
    view_data_quantrac.refresh(url_call_station);

    /*** Cập nhật lại hiển thị của dữ liệu quan trắc ***/
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
});

/*** Lựa chọn quận huyện ***/
$("#district").change(function () {
    var item_quanhuyen = $("#district").val();
    if (item_quanhuyen != 'none') {
        // item_quanhuyen_cond = '%20quanhuyen=%27' + item_quanhuyen + '%27';
        item_quanhuyen_cond = '%20quanhuyen=' + item_quanhuyen;
    } else {
        item_quanhuyen_cond = '%20quanhuyen=1=1';
    }
    url_call_station = 'services/call_obser_station.php?'
        + item_loaihinh_cond + '&' + item_loaitram_cond + '&' + item_quanhuyen_cond;
    view_data_quantrac.refresh(url_call_station);

    /*** Cập nhật lại hiển thị của dữ liệu quan trắc ***/
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
});

function search_tramqt() {
    var tramqt = document.getElementById("quantrac").value;
    for (var attr_modal in quantrac_search) {
        var datum = quantrac_search[attr_modal];
        if (tramqt == datum.name) {
            /*** Tự động mở Modal sau khi Zoom ***/
            map.setView([datum.lat, datum.lng], 15);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            }
        }
    }
}
