<?php


$lastUser = $_COOKIE['name']; // cookie name wird als variable gespeichert


if(!file_exists("UserDB/ApiTokens/request_" . $lastUser . ".txt") || !file_exists("UserDB/ApiRequestTime/time_" . $lastUser . ".txt")) {
    http_response_code(401);
} else {

if($lastUser == '') { // wenn cookie nicht vorhanden ist wird 404 ausgegeben
    http_response_code(404);
} else {

    // access token wird sich aus der txt geholt
$responseFile = file_get_contents("UserDB/ApiTokens/request_" . $lastUser . ".txt");
$responseData = json_decode($responseFile, true);

if ($responseData !== null && isset($responseData['access_token'])) {
    $token = $responseData['access_token'];

    $apiEndpointMe = 'https://osu.ppy.sh/api/v2/me';;

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

    $responseMe = file_get_contents($apiEndpointMe, false, $context); 

    if ($responseMe === false) {
        http_response_code(401);
    } else {
        echo $responseMe;
    }
}
}
}
?>
