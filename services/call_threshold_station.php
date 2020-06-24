<?php
    include "config.php";
?>

<?php
    /*** Querry Data Threshold Station ***/
    $querry_data_threshold_station = 'SELECT 
                                    "station"."id", "station"."name", 
                                    "district"."name" "districtName",
                                    "district"."id" "districtID",
                                    "category"."name" "categoryName",
                                    "category"."id" "categoryID",
                                    /*** Ghép cột Name của bảng ObservationType cần có hàm distinct để trở nên duy nhất ***/
                                    string_agg(distinct "obs_type"."name", \'; \') "obstype_namelist", 
                                    concat(\'[\', string_agg("obs"."detail", \', \'), \']\') "total_detail"
                                                                        
                                    FROM "Observationstation" "station"
                                    LEFT JOIN "Category" "category" ON "category"."id" = "station"."categoryid"
                                    LEFT JOIN "District" "district" ON "district"."id" = "station"."districtid"
                                    LEFT JOIN "Obstype_Station" "obs_station" ON "obs_station"."stationid" = "station"."id"
                                    LEFT JOIN "ObservationType" "obs_type" ON "obs_type"."id" = "obs_station"."obstypesid"
                                    LEFT JOIN "Observation" "obs" ON "obs"."stationid" = "station"."id"
                                    
                                    GROUP BY "station"."id", 
                                    "category"."name", "category"."id", 
                                    "district"."name", "district"."id"
                                    ORDER BY "station"."name" ASC';

    $result = pg_query($travinh_db, $querry_data_threshold_station);
    if (!$result) {
        echo "Không có dữ liệu.\n";
        exit;
    }

    /*** Chuyển định dạng từ Array sang json ***/
    $data = array();
    while ($row = pg_fetch_assoc($result)) {
        $data[] = $row;
    }

    $jsonData = json_encode($data);
    $original_data = json_decode($jsonData, true);
    $option = array();
    foreach ($original_data as $key => $value) {
        $option[] = array(
            'id' => $value['id'],
            'name' => $value['name'],
            'districtID' => $value['districtID'],
            'districtName' => $value['districtName'],
            'categoryID' => $value['categoryID'],
            'categoryName' => $value['categoryName'],
            'obstype_namelist' => $value['obstype_namelist'],
            'total_detail' => json_decode($value['total_detail'])
        );
    }

    $final_data = json_encode($option);
    echo $final_data;
?>
