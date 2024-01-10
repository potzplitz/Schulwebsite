<?php

include('refreshchecker.php');

$lastUser = $_COOKIE['name'];

if(!$lastUser) {
    http_response_code(404);
} else {

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
?>
