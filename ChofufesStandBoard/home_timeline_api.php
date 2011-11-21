<?php
header( 'Content-Type: application/javascript; charset=utf-8' );
$_TARGET_URL = "https://api.twitter.com/1/statuses/home_timeline.json";
$consumer_key = 'hTuyvT5xm40IMbufsPDi2A';
$consumer_secret = '93XbloOTOxj3uMon8FxpadnhU04QtXVdfMxgjboWd0';
$access_token = '407672134-47bwS87O46HcwAw2q3TTo4uuDDmnSqGmVP0Iji6d';
$access_token_secret = 'A49YTyG2qJQkvaXtiT16uyOpYLKYlAtepUcp3PVHEw';

$time = time();
$oauth_nonce = md5($time . rand());
$callback = $_GET['callback'];
//$time = '1321064592';
//$oauth_nonce = '2117191b637712cd6fe57b8b453c3893';


include_once 'HTTP/OAuth/Consumer.php';


$consumer = new HTTP_OAuth_Consumer($consumer_key, $consumer_secret);	//認証用
$signature = HTTP_OAuth_Signature::factory($consumer->getSignatureMethod());	//signature作成用

//HTTPS接続の設定
$http_request = new HTTP_Request2();
$http_request->setConfig('ssl_verify_peer', false);
$consumer_request = new HTTP_OAuth_Consumer_Request;
$consumer_request->accept($http_request);
$consumer->accept($consumer_request);

//Tokenの設定
$consumer -> setToken($access_token);
$consumer -> setTokenSecret($access_token_secret);

$page = '1';

$response = $consumer -> sendRequest($_TARGET_URL, array('page' => $page, "include_entities" => true), "GET");
$json = json_decode($response -> getBody(), true);

echo $callback . "(" . json_encode($json) . ")";

?>
