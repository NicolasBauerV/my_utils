<?php

function db_connect() {
    try {
        $db = new PDO('host=localhost;dbname=myutils;charset=utf8', 'root', 'root');
    } catch (PDOException $e) {
        print $e->getMessage();
    }

    return $db;
}