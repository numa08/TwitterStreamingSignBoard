<?php
header("Content-type: text/event-stream; charset=utf-8");
header("Transfer-encoding: chunked");

$_TARGET_URL = "https://userstream.twitter.com/2/user.json";
$consumer_key = 
$consumer_secret = 
$access_token = 
$access_token_secret = 

$time = time();
$oauth_nonce = md5($time . rand());

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

//signature用の文字列設定
$param = array("oauth_consumer_key" => $consumer_key, 
"oauth_nonce" => $oauth_nonce,
"oauth_signature_method" => $consumer->getSignatureMethod(),
"oauth_timestamp" => $time,
"oauth_token" => $access_token,
"oauth_version" => "1.0");

//sigunature作成
$oauth_signature = urlencode($signature->build("GET", $_TARGET_URL, $param, $consumer_secret, $access_token_secret));

//echo 'Authorization: OAuth oauth_consumer_key="' . $consumer_key .'", oauth_nonce="'. $oauth_nonce .'", oauth_signature="' . $oauth_signature .'", oauth_signature_method="' . $consumer->getSignatureMethod() .'", oauth_timestamp="' . $time .'", oauth_token="' . $access_token .'", oauth_version="1.0"';
//HTTP通信ヘッダの作成
$options = array(
 'http' => array(
 	'method' => "GET",
	'header' => 'Authorization: OAuth oauth_consumer_key="' . $consumer_key .'", oauth_nonce="'. $oauth_nonce .'", oauth_signature="' . $oauth_signature .'", oauth_signature_method="' . $consumer->getSignatureMethod() .'", oauth_timestamp="' . $time .'", oauth_token="' . $access_token .'", oauth_version="1.0"',
	"Content-type: application/x-www-form-urlencoded\r\n",
	)
 );

//通信と出力
//JSONに変換可能だったもののみ、出力を行う。
$context = stream_context_create($options);

$stream = fopen($_TARGET_URL, 'r' ,false, $context);

ob_end_flush();
ob_start();

while($json = fgets($stream)){
	$output =$json;
	echo sprintf("%x\r\n", strlen($output));
	echo $output . "\r\n";
	ob_flush();
	flush();
}
?>
