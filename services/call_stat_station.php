<?php
    include "config.php";
?>

<?php
    $loaihinh = $_GET['loaihinh_stat'];
    $loaitram = $_GET['loaitram_stat'];
    $quanhuyen = $_GET['quanhuyen_stat'];

    /*** Querry Thống kê quan trắc ***/
    $querry_statistic_select = 'SELECT
                            "station"."id", "station"."code", "station"."name",
                            "station"."coordx", "station"."coordy",
                            "station"."establishyear", "station"."terminatedate", 
                            "station"."maintenance", "station"."active", 
                            "station"."the_geom",
                            "obs_type"."name" "obsTypeName",
                            "obs_type"."id" "obsTypeID",
                            "category"."name" "categoryName",
                            "category"."id" "categoryID", 
                            "organization"."name" "organizationName", 
                            "enterprise"."name" "enterpriseName", 
                            "basin"."name" "basinName", 
                            "location"."name" "locationName",
                            "location"."id" "locationID",
                            "loctype"."name" "locationTypeName",
                            "loctype"."id" "locationTypeID",
                            "district"."name" "districtName",
                            "district"."id" "districtID",
							concat(\'[\', string_agg(distinct "obs"."detail", \', \'), \']\') "total_detail"
							
                        FROM "Observationstation" "station"
                        LEFT JOIN "Category" "category" ON "category"."id" = "station"."categoryid"
                        LEFT JOIN "Organization" "organization" ON "organization"."id" = "station"."organizationid"
                        LEFT JOIN "Enterprise" "enterprise" ON "enterprise"."id" = "station"."enterpriseid"
                        LEFT JOIN "Basin" "basin" ON "basin"."id" = "station"."basinid"
                        LEFT JOIN "Location" "location" ON "location"."id" = "station"."locationid"
                        LEFT JOIN "LocationType" "loctype" on "loctype"."id" = "location"."locationtypeid"
                        LEFT JOIN "District" "district" ON "district"."id" = "station"."districtid"
						LEFT JOIN "Obstype_Station" "obs_station" ON "obs_station"."stationid" = "station"."id"
						LEFT JOIN "ObservationType" "obs_type" ON "obs_type"."id" = "obs_station"."obstypesid"
						LEFT JOIN "Observation" "obs" ON "obs"."stationid" = "station"."id"';

    /*** Where Condition Data Loại hình, Loại trạm và Quận huyện ***/
    $querry_statistic_where_loaihinh_loaitram_quanhuyen = ' WHERE "obs_type"."id" = '.$loaihinh.
        ' AND "district"."id" = '.$quanhuyen.' AND "category"."id" = '.$loaitram;

    /*** Group and Order Data ***/
    $querry_statistic_group = ' GROUP BY "station"."id", 
                                "obs_type"."name", "obs_type"."id",
                                "category"."name", "category"."id", 
                                "location"."name", "location"."id",
                                "loctype"."name", "loctype"."id",
                                "district"."name", "district"."id",
                                "organization"."name", "enterprise"."name", "basin"."name"
                                ORDER BY "station"."name" ASC';

    $querry_statistic = $querry_statistic_select.
        $querry_statistic_where_loaihinh_loaitram_quanhuyen.$querry_statistic_group;
    $result = pg_query($travinh_db, $querry_statistic);
    if (!$result) {
        echo "Không có dữ liệu.\n";
        exit;
    }

    /*** Chuyển định dạng từ Array sang Json ***/
    $data = array();
    while ($row = pg_fetch_assoc($result)) {
        $data[] = $row;
    }

    $jsonData = json_encode($data);
    $original_data = json_decode($jsonData, true);
    $option = array();
    foreach ($original_data as $key => $value) {
        $option[] = array('id' => $value['id'],
            'code' => $value['code'],
            'name' => $value['name'],
            'organizationName' => $value['organizationName'],
            'obstype_id' => $value['obsTypeID'],
            'obstype_name' => $value['obsTypeName'],
            'categoryID' => $value['categoryID'],
            'categoryName' => $value['categoryName'],
            'basinName' => $value['basinName'],
            'enterpriseName' => $value['enterpriseName'],
            'districtID' => $value['districtID'],
            'districtName' => $value['districtName'],
            'locationID' => $value['locationID'],
            'locationName' => $value['locationName'],
            'locationTypeID' => $value['locationTypeID'],
            'locationTypeName' => $value['locationTypeName'],
            'establishyear' => $value['establishyear'],
            'terminatedate' => $value['terminatedate'],
            'maintenance' => $value['maintenance'],
            'active' => $value['active'],
            'total_detail' => json_decode($value['total_detail'])
        );
    }

    $final_data = json_encode($option);
    echo $final_data;
?>