<?php

// Überprüfen, ob der GET-Parameter "wert" gesetzt ist
if (!isset($_GET['wert'])) {
    die('Fehler: Der Parameter "wert" fehlt.');
}

// Überprüfen, ob der Cookie "name" gesetzt ist
if (!isset($_COOKIE['name'])) {
    die('Fehler: Der Cookie "name" fehlt.');
}

$empfangenerWert = $_GET['wert'];
$lastUser = $_COOKIE['name'];

$clientID = '28681';
$clientSecret = '5QU0Nmjanz70e8ntyPwk39SJEoax2q42VXutsaaR';
$refreshToken = $empfangenerWert;

// Erstelle die Daten für die Anfrage
$requestData = [
    'client_id' => $clientID,
    'client_secret' => $clientSecret,
    'grant_type' => 'refresh_token',
    'refresh_token' => $refreshToken,
    'scope' => 'public' // Anpassen je nach benötigtem Scope
];

// Erstelle die cURL-Anfrage
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://osu.ppy.sh/oauth/token');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($requestData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Setze die Header für die Anfrage
$headers = [
    'Accept: application/json',
    'Content-Type: application/x-www-form-urlencoded'
];
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Führe die Anfrage aus und hole die Antwort
$response = curl_exec($ch);

// Überprüfe auf Fehler bei der cURL-Anfrage
if ($response === false) {
    echo 'Fehler: ' . curl_error($ch);
    exit;
}

// Dekodiere die JSON-Antwort
$responseData = json_decode($response, true);

// Überprüfe, ob die Dekodierung erfolgreich war
if ($responseData === null || !isset($responseData['access_token'], $responseData['expires_in'], $responseData['token_type'])) {
    echo 'Fehler: Ungültige JSON-Antwort oder fehlende Token-Informationen.';
    exit;
}

// Zugriff auf die Token-Informationen
file_put_contents("UserDB/ApiTokens/request_" . $lastUser . ".txt", $response);
file_put_contents('UserDB\ApiRequestTime\time_' . $lastUser . ".txt", time());

$accessToken = $responseData['access_token'];
$expiresIn = $responseData['expires_in'];
$tokenType = $responseData['token_type'];

// Schließe die cURL-Anfrage
curl_close($ch);
?>
