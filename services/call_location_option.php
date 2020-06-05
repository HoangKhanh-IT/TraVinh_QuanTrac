<?php
    include "config.php";
?>

<?php
    /*** Querry lựa chọn Địa danh ***/
    $querry_option_location = 'SELECT "Location".*, "loctype"."name" "locationTypeName"
                                FROM "Location"
                                LEFT JOIN "LocationType" "loctype" on "loctype"."id" = "Location"."locationtypeid"';
    $result = pg_query($travinh_db, $querry_option_location);
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
        $option[] = array(
            'id' => $value['id'],
            'name' => $value['name'],
            'locationTypeName' => $value['locationTypeName'],
            'locationTypeID' => $value['locationtypeid']
        );
    }

    $final_data = json_encode($option);
    echo $final_data;
?>