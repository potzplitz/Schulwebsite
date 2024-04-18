<?php

$mysqli = new mysqli("localhost", "root", "Mineralwasser370!", "userdb");

if ($mysqli->connect_error) {
    die("Verbindungsfehler: " . $mysqli->connect_error);
}

function addData($username, $refreshToken, $accessToken, $expireTime, $userData) {
    global $mysqli;

    $sql = "INSERT INTO userdb (Username, RefreshToken, AccessToken, ExpireTime, Userdata) VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ssssss', $username, $refreshToken, $accessToken, $expireTime, $userData);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Datensatz erfolgreich eingefügt!";
    } else {
        echo "Fehler beim Einfügen des Datensatzes.";
    }

    $stmt->close(); 
}

function modifyData($key) {

}
?>