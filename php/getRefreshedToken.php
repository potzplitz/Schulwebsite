<?php


if (!isset($_GET['wert'])) {
    die('Fehler: Der Parameter "wert" fehlt.');
}


if (!isset($_COOKIE['name'])) {
    die('Fehler: Der Cookie "name" fehlt.');
}

$empfangenerWert = $_GET['wert'];
$lastUser = $_COOKIE['name'];

$clientID = '28681';
$clientSecret = '5QU0Nmjanz70e8ntyPwk39SJEoax2q42VXutsaaR';
$refreshToken = $empfangenerWert;


$requestData = [
    'client_id' => $clientID,
    'client_secret' => $clientSecret,
    'grant_type' => 'refresh_token',
    'refresh_token' => $refreshToken,
    'scope' => 'identify public' 
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://osu.ppy.sh/oauth/token');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($requestData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$headers = [
    'Accept: application/json',
    'Content-Type: application/x-www-form-urlencoded'
];
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);

if ($response === false) {
    echo 'Fehler: ' . curl_error($ch);
    exit;
}

$responseData = json_decode($response, true);

if ($responseData === null || !isset($responseData['access_token'], $responseData['expires_in'], $responseData['token_type'])) {
    echo 'Fehler: Ungültige JSON-Antwort oder fehlende Token-Informationen.';
    exit;
}


file_put_contents("UserDB/ApiTokens/request_" . $lastUser . ".txt", $response);
file_put_contents('UserDB\ApiRequestTime\time_' . $lastUser . ".txt", time());

echo "action";

$accessToken = $responseData['access_token'];
$expiresIn = $responseData['expires_in'];
$tokenType = $responseData['token_type'];


curl_close($ch);

header("Location: ../html/index/index.html");
?>
