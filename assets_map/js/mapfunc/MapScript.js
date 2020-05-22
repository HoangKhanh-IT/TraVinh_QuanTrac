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
        center: [9.80, 106.32],
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
var quantrac_search = [];

/*** Tạo Pulse Marker ***/
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

/*** Dữ liệu không gian ***/
$.getJSON("services/call_elec_board.php", function(data_bangdientu) {
    $.getJSON("services/call_obser_station.php", function (data_quantrac) {
        var categories_quantrac = {}, category_quantrac;

        function add_quantrac(data, map) {
            L.geoJSON(data, {
                onEachFeature: function (feat, layer) {
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
                        "<th class='brown'><i class='icon-location3' style='font-size: 16px; margin-top: -2px'></i>" +
                        "&nbsp;Địa điểm</th><td>" + feat.properties.districtName + "</td>" +
                        "<th class='brown'><i class='icon-server' style='font-size: 16px; margin-top: -2px'></i>" +
                        "&nbsp;Loại trạm</th><td>" + feat.properties.categoryName + "</td></tr>" +
                        "<tr><th class='brown'><i class='icon-lab' style='font-size: 16px; margin-top: -2px'></i>" +
                        "&nbsp;Loại hình</th><td>" + feat.properties.obstype_namelist + "</td>" +
                        "<th class='brown'><i class='icon-office' style='font-size: 14px; " +
                        "margin-top: -2px; margin-left: 1px;'></i>" +
                        "&nbsp;Tổ chức</th><td>" + organizationName_qt + "</td></tr>" +
                        "<tr><th class='brown'><i class='icon-watch2' style='font-size: 14px; " +
                        "margin-top: -2px; margin-left: 1px;'></i>" +
                        "&nbsp;Thành lập</th><td>" + establishyear_qt + "</td>" +
                        "<th class='brown'><i class='icon-connection' style='font-size: 12px; margin-top: -2px'></i>" +
                        active_qt +
                        "<table>";

                    /*** Số liệu trạm quan trắc mới nhất ***/
                    var content_data_qt = "<table class='table table-striped table-bordered table-condensed'>";
                    content_data_qt = content_data_qt + "<tr><th class='blue' style='text-align: center'>Thời gian</th>" +
                        "<td style='text-align: center'>" + "2019-07-07" + " " + "02:35:00" + "</td></tr>" +
                        "<tr><th class='blue' style='text-align: center'>" + "Nhu cầu Oxy hóa học" +
                        "</th><td style='text-align: center'>" + "33.32" + "</td></tr>";

                    /*** View Chart cho trạm tự động ***/
                    $.getJSON("assets_map/data/data_viewchart_demo.json", function (data_viewchart_demo) {
                        render_chart_quantrac("chart_para_1", data_viewchart_demo, "Nhu cầu Oxy hóa học",
                            "Thời gian", "Nhu cầu Oxy hóa học");
                    })

                    layer.on({
                        click: function (e) {
                            if (feat.properties.categoryName == "Tự động"
                                || feat.properties.categoryName == "Doanh nghiệp") {
                                $(".feature-title").html(feat.properties.name);
                                $(".info_qt").html(content_info);
                                $("#data_qt").html(content_data_qt);
                                /* $("#chart_qt").html(content_chart); */

                                $("#featureModal").modal("show");
                            } else {
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
                    quantrac_search.push({
                        name: feat.properties.name,
                        quanhuyen: feat.properties.districtName,
                        loaihinh: feat.properties.obstypes,
                        loaitram: feat.properties.categoryName,
                        source: "quantrac_search",
                        id: L.stamp(layer),
                        lat: feat.geometry.coordinates[1],
                        lng: feat.geometry.coordinates[0]
                    })

                    // category_quantrac = feat.properties.loaitram;
                    category_quantrac = feat.properties.obstypes;
                    if (typeof categories_quantrac[category_quantrac] === "undefined") {
                        // console.log(category_quantrac);
                        categories_quantrac[category_quantrac] = L.layerGroup().addTo(map);
                    }
                    categories_quantrac[category_quantrac].addLayer(layer);

                    /*--- Control Layer Data cho bộ điểm quan trắc ---*/
                },

                pointToLayer: function (feat, latlng) {
                    return L.marker(latlng).on('click', markerOnClick);
                }
            });
        };
        add_quantrac(data_quantrac, map);
    })
})

map.addControl(
    L.control.basemaps({
        basemaps: Basemaps_Control,
        tileX: 0,  // tile X coordinate
        tileY: 0,  // tile Y coordinate
        tileZ: 1   // tile zoom level
    })
);
