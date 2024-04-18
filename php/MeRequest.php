<?php

$lastUser = $_COOKIE['name'] ?? '';

if ($lastUser == '') {
    http_response_code(404);
    exit;
}

$tokenFilePath = "UserDB/ApiTokens/request_" . $lastUser . ".txt";
$requestTimeFilePath = "UserDB/ApiRequestTime/time_" . $lastUser . ".txt";

if (!file_exists($tokenFilePath) || !file_exists($requestTimeFilePath)) {
    http_response_code(401);
    exit;
}

$responseFile = file_get_contents($tokenFilePath);
if ($responseFile === false) {
    http_response_code(401);
    exit;
}

$responseData = json_decode($responseFile, true);
if ($responseData === null || !isset($responseData['access_token'])) {
    http_response_code(401);
    exit;
}

$token = $responseData['access_token'];

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

$responseMe = file_get_contents($apiEndpointMe, false, $context);

if ($responseMe === false) {
    http_response_code(401);
    

    exit;
}

echo $responseMe;
