<?php

$lastUser = $_COOKIE['name'];

if(!$lastUser) {
    http_response_code(404);
} else {
$fileContent = file_get_contents("UserDB/ApiTokens/request_" . $lastUser . ".txt");
$filetime = file_get_contents("UserDB/ApiRequestTime/time_" . $lastUser . ".txt");
$responseData = json_decode($fileContent, true);

if ($fileContent !== false) {

    $tokenInfo = json_decode($fileContent, true);

    if ($tokenInfo !== null) {

        $accessToken = $tokenInfo['access_token'];
        $refreshToken = $tokenInfo['refresh_token'];
        $expirationTime = $tokenInfo['expires_in'];

        $currentTimestamp = time();

        if ($currentTimestamp - $filetime >= $expirationTime) {
            
            header("Location: getRefreshedToken.php?wert=" . urlencode($refreshToken));
            exit();

        } else {
        }


    } else {
       
    }
} else {
    
}
}
?>
