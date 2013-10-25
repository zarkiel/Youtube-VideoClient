<?php
require 'Youtube.php';

use Zarkiel\Media\Youtube;

$youtube = new Youtube();

echo json_encode($youtube->getDownloadLinks($_GET['id']));
