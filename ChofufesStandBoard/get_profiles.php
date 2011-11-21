<?php
header( 'Content-Type: application/javascript; charset=utf-8' );
$users =  split(",", $_GET['user']);	//プロフィールが欲しいユーザー名を , で区切って渡す
$callback = $_GET['callback'];	//コールバックの設定

$profiles = array();
foreach($users as $user){
	$requestUrl = "https://api.twitter.com/1/users/show/" . $user . ".json";
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $requestUrl);
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER ,true);
	$response = curl_exec($ch);

	array_push($profiles, json_decode($response, true));
}
$output = $callback . "(" . json_encode($profiles) . ")";
echo $output;
?>