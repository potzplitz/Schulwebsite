<?php

require_once __DIR__ . '../../vendor/autoload.php';

use MongoDB\Client;

$client = new Client('mongodb://osubeatmaps:mmDnVK4YgAJncsONPD9z@db.dynam1c.net:27017/osu_beatmaps');
$collection = $client->selectCollection('osu_beatmaps', 'uncompressed');
$cursor = $collection->find(['ranked' => 1, 'mode' => 'osu']);

$pipeline = [
    ['$sample' => ['size' => 1]]
];

$options = [];
$result = $collection->aggregate($pipeline, $options);

    foreach ($result as $document) {
        echo json_encode($document);
    }

?>