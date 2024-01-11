<?php
require_once __DIR__ . '../../vendor/autoload.php';

use MongoDB\Client;

$client = new Client('mongodb://osubeatmaps:mmDnVK4YgAJncsONPD9z@db.dynam1c.net:27017/osu_beatmaps');
$collection = $client->selectCollection('osu_beatmaps', 'uncompressed');

$pipeline = [
    ['$match' => ['ranked' => 1, 'mode' => 'osu']],
    ['$sample' => ['size' => 1]],
];

$options = [];
$result = $collection->aggregate($pipeline, $options);

foreach ($result as $document) {
    echo json_encode($document);
}
?>