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
var station_id;
/*** Modal cho Search Nâng cao ***/
function Modal_Feature_Advanced(feat, layer) {
    Feature_info_modal(feat, layer)

    /*** Tạo mảng quantrac_search_advanced ***/
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
    Feature_info_modal(feat, layer)

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
        tileX: 0,  /* tile X coordinate */
        tileY: 0,  /* tile Y coordinate */
        tileZ: 1   /* tile zoom level */
    })
);
