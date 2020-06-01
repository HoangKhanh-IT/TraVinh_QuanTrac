<?php
    include "config.php";
?>

<?php
    /*** Querry thông tin bảng điện tử ***/
    $querry_bangdt = 'SELECT
                            "elecBoard"."id", "elecBoard"."name",
                            "elecBoard"."coordx", "elecBoard"."coordy",
                            "station"."name" "stationName"
                                
                        FROM "ElectronicBoard" "elecBoard"
                        LEFT JOIN "Observationstation" "station" ON "station"."id" = "elecBoard"."stationid"
                                
                        ORDER BY "elecBoard"."name" ASC';
    $result = pg_query($travinh_db, $querry_bangdt);
    if (!$result) {
        echo "Không có dữ liệu.\n";
        exit;
    }

    /*** Chuyển định dạng từ Array sang Geojson ***/
    $data = array();
    while ($row = pg_fetch_assoc($result)) {
        $data[] = $row;
    }

    $jsonData = json_encode($data);
    $original_data = json_decode($jsonData, true);
    $features = array();
    foreach ($original_data as $key => $value) {
        $features[] = array(
            'type' => 'Feature',
            'properties' => array(
                'id' => $value['id'],
                'name' => $value['name'],
                'stationName' => $value['stationName']
            ),
            'geometry' => array(
                'type' => 'Point',
                'coordinates' => array(
                    floatval($value['coordx']),
                    floatval($value['coordy'])
                ),
            ),
        );
    }
    $new_data = array(
        'type' => 'FeatureCollection',
        'features' => $features,
    );

    $final_data = json_encode($new_data);;
    echo $final_data;
?>
