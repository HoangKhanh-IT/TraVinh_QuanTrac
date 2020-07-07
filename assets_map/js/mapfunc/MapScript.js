/*---- Control Base Map ----*/
var Basemaps_Control = [
    L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        attribution: 'Google Terrain',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 0,
        label: 'Bản đồ địa hình Google',
        iconURL: 'https://mt1.google.com/vt/lyrs=p&x=101&y=60&z=7'
    }),

    L.tileLayer('//{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 0,
        label: 'Bản đồ đơn giản',  // optional label used for tooltip
        iconURL: 'assets/images/b_tile.stamen.png'

    }),

    L.tileLayer('http://gis.chinhphu.vn/BaseMap/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by gischinhphu',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 0,
        label: 'Bản đồ hành chính',
        iconURL: 'assets/images/gis_chinhphu.png'
    }),

    L.tileLayer('http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
        attribution: 'Google Satellite',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 0,
        label: 'Ảnh vệ tinh Google',
        iconURL: 'http://mt0.google.com/vt/lyrs=s&hl=en&x=101&y=60&z=7'
    }),

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Map tiles by Esri',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 0,
        label: 'Ảnh vệ tinh ESRI',
        iconURL: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/7/60/101'
    }),
]

/*---- Đọc WMS Geosever ----*/

/*---- Đem biến map ra ngoài cấu trúc nested của getJSON để không bị lỗi invalidateSize bên main.js ----*/
var map = L.map('mymap', {
        center: [9.7827975, 106.298207],
        zoom: 11,
        zoomControl: false,
    }
);

/*---- GPS user ----*/
var gps = new L.Control.Gps({
    autoCenter: true,
    maxZoom: 11,
});

gps.on('gps:located', function (e) {
    e.marker.bindPopup(e.latlng.toString()).openPopup()
}).on('gps:disabled', function (e) {
    e.marker.closePopup()
});

gps.addTo(map);

/*---- Fullscreen Leaflet ----*/
L.control.fullscreen({
    position: 'topleft',
    title: 'Phóng to bản đồ',
    titleCancel: 'Thu nhỏ bản đồ ',
}).addTo(map);

/*---- Zoom Home ----*/
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

/*---- Biến tìm kiếm quan trắc cơ bản ----*/
var quantrac_search_advanced = [];
var quantrac_search_basic = [];

/*---- Tạo Pulse Marker ----*/
var pulse_marker;
var pulsingIcon = L.icon.pulse({
    iconSize: [13, 13],
    color: '#ff0000',
    fillColor: 'rgba(255,255,255,0)',
    heartbeat: 1
});

/*---- Hàm Zoom on Click marker ----*/
function markerOnClick(e) {
    var latLngs = [e.target.getLatLng()];
    var lat = latLngs[0]['lat'];
    var lng = latLngs[0]['lng'] - 0.01;
    var markerBounds = L.latLngBounds([lat, lng], [lat, lng]);
    map.fitBounds(markerBounds, {
        maxZoom: 15
    });
}

/*---- Dữ liệu không gian ----*/
/*** Hiển thị thông tin trạm quan trắc ***/
/*** Modal cho Search Nâng cao ***/
var station_id;

function Modal_Feature_Advanced(feat, layer) {
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

                /*** DOM số liệu mới nhất ***/
                var length = detail_chart_24h.length;
                var content_data_qt = '';
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

                $("#data_qt").html(content_data_qt);

                /*** View Chart cho trạm tự động ***/
                /*** Reset Option ***/
                $("#filter_typechart").val('filter_column_chart');
                $("#filter_time").val('filter_1h_chart');

                onChange_option(detail_chart_1h);
                render_chart($("#filter_parameters").val(), detail_chart_1h, $("#filter_typechart").val());

                /*** Onchange Filter Time ***/
                var item_time = $("#filter_time").val();
                $("#filter_time").change(function () {
                    item_time = $("#filter_time").val();

                    if (item_time == "filter_1h_chart") {
                        render_chart($("#filter_parameters").val(), detail_chart_1h, $("#filter_typechart").val());
                        onChange_option(detail_chart_1h);
                    } else if (item_time == "filter_8h_chart") {
                        render_chart($("#filter_parameters").val(), detail_chart_8h, $("#filter_typechart").val());
                        onChange_option(detail_chart_8h);
                    } else {
                        render_chart($("#filter_parameters").val(), detail_chart_24h, $("#filter_typechart").val());
                        onChange_option(detail_chart_24h);
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

    /*** Tạo mảng quantrac_search ***/
    quantrac_search_advanced.push({
        name: feat.properties.name,
        quanhuyen: feat.properties.districtName,
        loaihinh: feat.properties.obstype_namelist,
        loaitram: feat.properties.categoryName,
        loaidiadanh: feat.properties.locationType,
        diadanh: feat.properties.locationName,
        source: 'quantrac_search_advanced',
        id: L.stamp(layer),
        lat: feat.geometry.coordinates[1],
        lng: feat.geometry.coordinates[0]
    })
}

/*** Modal cho Search Cơ bản ***/
function Modal_Feature_Basic(feat, layer) {
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

                /*** DOM số liệu mới nhất ***/
                var length = detail_chart_24h.length;
                var content_data_qt = '';
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

                $("#data_qt").html(content_data_qt);

                /*** View Chart cho trạm tự động ***/
                /*** Reset Option ***/
                $("#filter_typechart").val('filter_column_chart');
                $("#filter_time").val('filter_1h_chart');

                onChange_option(detail_chart_1h);
                render_chart($("#filter_parameters").val(), detail_chart_1h, $("#filter_typechart").val());

                /*** Onchange Filter Time ***/
                var item_time = $("#filter_time").val();
                $("#filter_time").change(function () {
                    item_time = $("#filter_time").val();

                    if (item_time == "filter_1h_chart") {
                        render_chart($("#filter_parameters").val(), detail_chart_1h, $("#filter_typechart").val());
                        onChange_option(detail_chart_1h);
                    } else if (item_time == "filter_8h_chart") {
                        render_chart($("#filter_parameters").val(), detail_chart_8h, $("#filter_typechart").val());
                        onChange_option(detail_chart_8h);
                    } else {
                        render_chart($("#filter_parameters").val(), detail_chart_24h, $("#filter_typechart").val());
                        onChange_option(detail_chart_24h);
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

    /*** Tạo mảng quantrac_search_basic ***/
    quantrac_search_basic.push({
        name: feat.properties.name,
        quanhuyen: feat.properties.districtName,
        loaihinh: feat.properties.obstype_namelist,
        loaitram: feat.properties.categoryName,
        loaidiadanh: feat.properties.locationType,
        diadanh: feat.properties.locationName,
        source: 'quantrac_search_basic',
        id: L.stamp(layer),
        lat: feat.geometry.coordinates[1],
        lng: feat.geometry.coordinates[0]
    })
}

/*** Khi load trang hay F5 sẽ không gọi service 'call_obser_station.php' - Dữ liệu trống ***/
view_data_quantrac = new L.GeoJSON.AJAX(null, {
    onEachFeature: Modal_Feature_Advanced,
    pointToLayer: function (feat, latlng) {
        return L.marker(latlng).on('click', markerOnClick);
    },
})
view_data_quantrac.addTo(map);

/*** Khi load trang hay F5 sẽ gọi service 'call_obser_station.php' không chứa điều kiện - Search Cơ bản ***/
var url_search_basic = "services/call_obser_station.php?loaihinh[]=0&" +
    "loaitram=1=1&quanhuyen=1=1&loaidiadanh=1=1&diadanh=1=1"
$.getJSON(url_search_basic, function (search_basic) {
    L.geoJSON(search_basic, {
        onEachFeature: Modal_Feature_Basic,
        pointToLayer: function (feat, latlng) {
            return L.marker(latlng, {opacity: 0}).on('click', markerOnClick);
        },
    }).addTo(map)
})

/*** Tạo hàm Refresh Option, số lần chạm là 0 sẽ không thay đổi ***/
count_click = 0;

function Refresh_Option() {
    count_click++;
    if (count_click > 1) {
        view_data_quantrac.refresh(url_search_basic);
    }
}

map.addControl(
    L.control.basemaps({
        basemaps: Basemaps_Control,
        tileX: 0,  // tile X coordinate
        tileY: 0,  // tile Y coordinate
        tileZ: 1   // tile zoom level
    })
);
