/*** Hiển thị thông tin trạm quan trắc ***/
function Feature_info_modal(feat, layer) {
    /*** Kiểm tra trạm quan trắc có năm thành lập hay không ***/
    var establishyear_qt = "";
    if (feat.properties.establishyear != null) {
        establishyear_qt = feat.properties.establishyear
    } else {
        establishyear_qt = "Chưa cập nhật";
    }

    /*** Kiểm tra trạm quan trắc có tổ chức/doanh nghiệp hay không ***/
    var organizationName_qt = "";
    var enterpriseName_qt = "";
    if (feat.properties.organizationName != null) {
        organizationName_qt = feat.properties.organizationName
    } else {
        organizationName_qt = "Chưa cập nhật";
    }

    if (feat.properties.enterpriseName != null) {
        enterpriseName_qt = feat.properties.enterpriseName
    } else {
        enterpriseName_qt = "Chưa cập nhật";
    }

    /*** Kiểm tra trạm quan trắc đang hoạt động hay không ***/
    var active_qt = "";
    if (feat.properties.active == "Y") {
        active_qt = "&nbsp;Trạng thái</th><td>" + "<span class='badge bg-info bg-active-qt'>" +
            'Đang hoạt động' + "</span>" + "</td></tr>"
    } else {
        active_qt = "&nbsp;Trạng thái</th><td>" + "<span class='badge bg-active-qt'>" +
            'Ngừng hoạt động' + "</span>" + "</td></tr>"
    }

    /*** Thông tin trạm quan trắc ***/
    var content_info = "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th class='blue'><i class='icon-home4' style='font-size: 14px; " +
        "margin-top: -2px; margin-left: 1px;'></i>" +
        "&nbsp;Tên trạm</th><td colspan='3' style='font-weight: bold; " +
        "text-align: center'>" + feat.properties.name + "</td></tr>" +
        "<tr>" +
        "<tr><th class='brown'><i class='fa fa-building' style='font-size: 14px; " +
        "margin-top: -2px; margin-left: 1px;'></i>" +
        "&nbsp;Doanh nghiệp</th><td colspan='3' style='text-align: center'>" +
        enterpriseName_qt + "</td></tr>" +
        "<tr>" +
        "<th class='brown'><i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>" +
        "&nbsp;Loại hình</th><td>" + feat.properties.obstype_namelist + "</td>" +
        "<th class='brown'><i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>" +
        "&nbsp;Loại trạm</th><td>" + feat.properties.categoryName + "</td></tr>" +
        "<tr><th class='brown'><i class='mdi mdi-location-enter' style='font-size: 16px; margin-top: -2px'></i>" +
        "&nbsp;Địa danh</th><td>" + feat.properties.locationName + "</td>" +
        "<th class='brown'><i class='mdi mdi-map-legend' style='font-size: 16px; margin-top: -2px'></i>" +
        "&nbsp;Loại địa danh</th><td>" + feat.properties.locationTypeName + "</td></tr>" +
        "<tr><th class='brown'><i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>" +
        "&nbsp;Địa điểm</th><td>" + feat.properties.districtName + "</td>" +
        "<th class='brown'><i class='icon-office' style='font-size: 14px; " +
        "margin-top: -2px; margin-left: 1px;'></i>" +
        "&nbsp;Tổ chức</th><td>" + organizationName_qt + "</td></tr>" +
        "<tr><th class='brown'><i class='icon-watch2' style='font-size: 14px; " +
        "margin-top: -2px; margin-left: 1px;'></i>" +
        "&nbsp;Thành lập</th><td>" + establishyear_qt + "</td>" +
        "<th class='brown'><i class='icon-connection' style='font-size: 12px; margin-top: -2px'></i>" +
        active_qt +
        "<table>";

    layer.on({
        click: function (e) {
            if (feat.properties.categoryName == "Tự động"
                || feat.properties.categoryName == "Doanh nghiệp") {
                $(".feature-title").html(feat.properties.name);
                $(".info_qt").html(content_info);

                var detail_chart_1h, detail_chart_8h, detail_chart_24h;
                detail_chart_1h = process_detail_DOMchart(feat, 1);
                detail_chart_8h = process_detail_DOMchart(feat, 8);
                detail_chart_24h = process_detail_DOMchart(feat, 24);

                /*** DOM số liệu mới nhất (cần kiểm tra) ***/
                var length = detail_chart_24h.length;
                var content_data_qt = '';
                if (length == 0) {
                    content_data_qt = '<p style="font-size: 16px;' +
                        'text-align: center; font-weight: bold; color: #ff0000">Không có dữ liệu mới nhất</p>';
                } else {
                    /*** Dữ liệu đã được Sort theo thời gian nên có thể lấy dòng cuối cùng - thời gian sớm nhất ***/
                    content_data_qt = "<table class='table table-striped table-bordered table-condensed'>";
                    content_data_qt += "<tr><th class='blue' style='text-align: center'>Thời gian</th>" +
                        "<td style='text-align: center'>" + detail_chart_24h[length - 1].time + "</td></tr>";

                    for (var i = 0; i < Object.keys(detail_chart_24h[length - 1]).length; i++) {
                        if (Object.keys(detail_chart_24h[length - 1])[i] != "time" &&
                            Object.keys(detail_chart_24h[length - 1])[i] != "time_js" &&
                            Object.keys(detail_chart_24h[length - 1])[i] != "data") {

                            var name = Object.keys(detail_chart_24h[length - 1])[i];
                            var value = Object.values(detail_chart_24h[length - 1])[i];
                            content_data_qt += "<tr><th class='blue' style='text-align: center'>" + name +
                                "</th><td style='text-align: center'>" + value + "</td></tr>";
                        }
                    }
                    content_data_qt += "</table>";
                }
                $("#data_qt").html(content_data_qt);

                /*** View Chart cho trạm tự động ***/
                /*** Reset Option ***/
                $("#filter_typechart").val('filter_column_chart');
                $("#filter_time").val('filter_1h_chart');

                /*** Kiểm tra dữ liệu DOM chart có dữ liệu trong 1 giờ hay không ***/
                if (detail_chart_1h.length == 0) {
                    $("#chart_para").css("display", "none");
                    $("#info_dom_chart").css("display", "block");
                    $("#info_dom_chart").html("Không có dữ liệu trong 1 giờ gần nhất")
                } else {
                    $("#chart_para").css("display", "block");
                    $("#info_dom_chart").css("display", "none");
                    onChange_option(detail_chart_1h);
                    render_chart($("#filter_parameters").val(), detail_chart_1h, $("#filter_typechart").val());
                }

                /*** Onchange Filter Time ***/
                var item_time = $("#filter_time").val();
                $("#filter_time").change(function () {
                    item_time = $("#filter_time").val();

                    if (item_time == "filter_1h_chart") {
                        if (detail_chart_1h.length == 0) {
                            /*** Thay đổi giữa ID chart_para và ID info_dom_chart ***/
                            $("#chart_para").css("display", "none");
                            $("#info_dom_chart").css("display", "block");
                            $("#info_dom_chart").html("Không có dữ liệu trong 1 giờ gần nhất")
                        } else {
                            $("#chart_para").css("display", "block");
                            $("#info_dom_chart").css("display", "none");
                            render_chart($("#filter_parameters").val(), detail_chart_1h, $("#filter_typechart").val());
                            onChange_option(detail_chart_1h);
                        }
                    } else if (item_time == "filter_8h_chart") {
                        if (detail_chart_8h.length == 0) {
                            $("#chart_para").css("display", "none");
                            $("#info_dom_chart").css("display", "block");
                            $("#info_dom_chart").html("Không có dữ liệu trong 8 giờ gần nhất")
                        } else {
                            $("#chart_para").css("display", "block");
                            $("#info_dom_chart").css("display", "none");
                            render_chart($("#filter_parameters").val(), detail_chart_8h, $("#filter_typechart").val());
                            onChange_option(detail_chart_8h);
                        }
                    } else {
                        if (detail_chart_24h.length == 0) {
                            $("#chart_para").css("display", "none");
                            $("#info_dom_chart").css("display", "block");
                            $("#info_dom_chart").html("Không có dữ liệu trong 24 giờ gần nhất")
                        } else {
                            $("#chart_para").css("display", "block");
                            $("#info_dom_chart").css("display", "none");
                            render_chart($("#filter_parameters").val(), detail_chart_24h, $("#filter_typechart").val());
                            onChange_option(detail_chart_24h);
                        }
                    }
                })

                $("#featureModal").modal("show");
            } else {
                /*** Get Staion ID ***/
                station_id = feat.properties.id;
                $(".feature-title").html(feat.properties.name);
                $(".info_qt").html(content_info);

                $("#featureModal-btd").modal("show");
            }
            pulse_marker = L.marker([feat.geometry.coordinates[1],
                feat.geometry.coordinates[0]], {
                icon: pulsingIcon
            }).addTo(map);
        }
    });

    /*** Modal off function ***/
    $('.closemodal').click(function () {
        map.removeLayer(pulse_marker)
    });
}