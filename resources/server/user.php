<?php

require './connect_db.php';

user_save();

function user_save() {
    $save = json_decode($_POST['save']);
    echo $save;
    // $db = db_connect();
    // $query = $db->prepare('INSERT INTO user(data_save) VALUE(?)');
    // $query->execute(array($_POST['save_info']));
}