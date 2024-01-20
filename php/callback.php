<?php
// Speichere den Autorisierungscode in einer Variable, wenn er vorhanden ist

$authorizationCode = isset($_GET['code']) ? $_GET['code'] : null;

// Gib den Autorisierungscode aus
if ($authorizationCode !== null) {
   // echo 'Autorisierungscode: ' . $authorizationCode;
} else {
    echo 'Autorisierungscode nicht erhalten.';
}


// client credencials werden angegeben
$clientId = '28681';
$clientSecret = '5QU0Nmjanz70e8ntyPwk39SJEoax2q42VXutsaaR';
$receivedCode = $authorizationCode;
$redirectUri = 'http://localhost/php/callback.php'; // Passe die Redirect-URI entsprechend an

// access token suchparameter werden angegeben
$tokenRequest = [
    'client_id' => $clientId,
    'client_secret' => $clientSecret,
    'code' => $receivedCode,
    'grant_type' => 'authorization_code',
    'redirect_uri' => $redirectUri
];

// api zugriff mit parametern
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://osu.ppy.sh/oauth/token');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($tokenRequest));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$headers = [
    'Accept: application/json',
    'Content-Type: application/x-www-form-urlencoded'
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$tokenResponse = curl_exec($ch);

if ($tokenResponse === false) {
    echo 'Fehler: ' . curl_error($ch);
} else {

    // me daten werden gefetcht
    $tokenResponseNormal = $tokenResponse;

    $tokenResponse = json_decode($tokenResponse, true);

    if (isset($tokenResponse['access_token'])) {
        $token = $tokenResponse['access_token'];

        $apiEndpointMe = 'https://osu.ppy.sh/api/v2/me';

        $options = [
            'http' => [
                'method' => 'GET',
                'header' => [
                    'Content-Type: application/json',
                    'Accept: application/json',
                    "Authorization: Bearer $token" 
                ]
            ]
        ];

        $context = stream_context_create($options);

        $responseName = file_get_contents($apiEndpointMe, false, $context);

        $responseName = json_decode($responseName, true);

        // daten des zugriffs werden in eienm textdokument fürs nächste mal gespeichert

        if (isset($responseName['username'])) {
            $username = $responseName['username'];

            file_put_contents('UserDB/ApiTokens/request_' . $username . '.txt', $tokenResponseNormal);
            file_put_contents('UserDB/ApiRequestTime/time_' . $username . '.txt', time());
            
            setcookie("name", $username, time() + (10 * 365 * 24 * 60 * 60));

            header('Location: ../html/index/index.html');
            exit();
        } else {
            echo 'Benutzername nicht erhalten.';
        }
    } else {
        echo 'Zugriffstoken nicht erhalten.';
    }
}
curl_close($ch);
?>
