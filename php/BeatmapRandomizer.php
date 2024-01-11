<?php
require_once __DIR__ . '../../vendor/autoload.php'; // libraries von Composer werden geladen

use MongoDB\Client; // MongoDB library wird geladen

$client = new Client('mongodb://osubeatmaps:mmDnVK4YgAJncsONPD9z@db.dynam1c.net:27017/osu_beatmaps'); // auf Datenbank zugreifen
$collection = $client->selectCollection('osu_beatmaps', 'uncompressed'); // Datenbank auswählen

$pipeline = [ // filter setzen
    ['$match' => ['ranked' => 1, 'mode' => 'osu']],
    ['$sample' => ['size' => 1]],
];

$options = [];
$result = $collection->aggregate($pipeline, $options); // es wird mit den kriterien gesucht

foreach ($result as $document) { // suchergebnis wird ausgegeben
    echo json_encode($document);
}
?>