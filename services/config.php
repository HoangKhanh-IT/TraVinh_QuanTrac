<?php
    $travinh_db = pg_connect("host=localhost 
        port=5432 
        dbname=quantrac_travinh 
        user=postgres 
        password=123456"
    );
    if (!$travinh_db) {
        echo "Kết nối thất bại.\n";
        exit;
    }
?>