<?php

session_start();

$lastUser = $_COOKIE['name'];

if(!$lastUser) {
    http_response_code(404);
} else {
    // Daten werden aus Dateien geholt

    if(!file_exists("UserDB/ApiTokens/request_" . $lastUser . ".txt") || !file_exists("UserDB/ApiRequestTime/time_" . $lastUser . ".txt")) {
        http_response_code(401);
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

                $_SESSION['refreshtoken'] = $refreshToken;

                // Es wird überprüft, ob das Access Token noch gültig ist
                if ($currentTimestamp - $filetime >= $expirationTime) {

                    // Rufe die andere PHP-Datei auf, um das Token zu aktualisieren
                    
                    header("Location: getRefreshedToken.php?wert=" . urlencode($refreshToken));
                    session_abort();

                    exit();

                } else {
                    // Das Token ist noch gültig
                }

            } else {
                // Fehler beim Dekodieren der Token-Informationen
            }
        } else {
            // Fehler beim Lesen der Datei
        }
    }
}
session_abort();
?>
