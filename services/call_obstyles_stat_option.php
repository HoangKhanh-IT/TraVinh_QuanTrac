<?php
    include "config.php";
?>

<?php
    /*** Querry lựa chọn loại hình ***/
    $querry_option_obstypes = 'SELECT * FROM "ObservationType" ORDER BY "name" ASC';
    $result = pg_query($travinh_db, $querry_option_obstypes);
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
        if ($value['parentid'] == null) {
            $option[] = array(
                'id' => $value['id'],
                'name' => $value['name'],
            );
        } else {
            $option[] = array(
                'id' => $value['id'],
                'name' => "--- ".$value['name']." ---",
            );
        }
    }

    $final_data = json_encode($option);
    echo $final_data;
?>
