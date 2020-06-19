<?php
    include "config.php";
?>

<?php
    /*** Select Data ***/
    $station_id = $_GET['stationid'];
    $fromDate = $_GET['fromDate'];
    $toDate = $_GET['toDate'];

    /*** Querry lựa chọn sample bán tự động ***/
    $querry_option_sampleBTD = 'SELECT "Sample_BanTuDong".*, "Observation".detail
	                            FROM "Sample_BanTuDong"
	                            LEFT JOIN "Observation" ON "Observation".sampleid = "Sample_BanTuDong".stationid
	                            WHERE "Observation".day = "Sample_BanTuDong"."dateOfAnalysis"';
	$querry_option_sampleBTD.= ' AND "Sample_BanTuDong".stationid ='.$station_id;
    if ($fromDate == '' && $toDate == '') {
        $querry_option_sampleBTD = $querry_option_sampleBTD;
    }
    if ($fromDate != '' && $toDate != ''){
        $querry_option_sampleBTD.= ' AND "dateOfSamping" between'.$fromDate.'AND'.$toDate;
    }

    $result = pg_query($travinh_db, $querry_option_sampleBTD);
    // echo $querry_option_sampleBTD;
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
            'symbol' => $value['symbol'],
            'stationid' => $value['stationid'],
            'time_dateOfSamping' => $value['time'].', '. date("d-m-Y", strtotime($value['dateOfSamping'])),
            'dateOfAnalysis' => date("d-m-Y", strtotime($value['dateOfAnalysis'])),
            'samplingLocations' => $value['samplingLocations'],
            'weather' => $value['weather'],
            'detail' => json_decode($value['detail'])
        );
    }

    /*** Để Dom dữ liệu vào Sample Bán tự động ***/
    $option_final = array(
        'data' => $option
    );

    $final_data = json_encode($option_final);
    echo $final_data;
?>