var timeLine = new Array();

function loadStream() {
	/*	var ajax = new XMLHttpRequest();
	 ajax.open("GET", "/~numanuma08/ChofufesStandBoard/user_stream_api.php");
	 console.log('ajax');

	 ajax.onreadystatechange = function() {
	 if (ajax.readyState >= 3) {
	 parserTweet(ajax);
	 }
	 };
	 ajax.send(null);*/
	new Ajax.Request(
		'ChofufesStandBoard/user_stream_api.php',
		{
			method: 'get',
			onInteractive: function (response) {
				console.log("on interactive");
				parserTweet(response);
			}.bind(this),

			onSuccess: function (response) {
				console.log(response.responseText + "finish");
			}.bind(this)
		}
	);
}

function parserTweet(ajax) {
	var lines = ajax.responseText.split("\n");
	var line = lines[lines.length - 2];

	if (line) {
		var tweetJson = eval("(" + line + ")");
		if (tweetJson) {
			var tweet = getTweet(tweetJson);
			viewTweet(tweet);
		}
	}
}

function getTweet(tweetJson) {
	var text = tweetJson.text;
	var user_name = tweetJson.user.screen_name;
	var user_image = tweetJson.user.profile_image_url;
	var create_at = tweetJson.created_at;

	return new Tweet(text, user_name, user_image, create_at);
}

function viewTweet(tweet) {

	if (timeLine.length >= 20) {
		timeLine.pop();
	}

	var tweetElem = document.getElementById("tweet");

	var image = "<img src=\"" + tweet.user_image
			+ "\" width=\"48\" height=\"48\" alt=\"user_image\"/>";

	var user_name = "<h2>" + tweet.user_name + "</h2>";
	var tweet_text = "<p>" + tweet.text + "</p>";
	var create_at = "<p>" +tweet.create_at + "</p>";
	var post = "<div class=\"posttext\">"
			+ "<table><tr valign=\"top\"><th rowspan=\"2\">" + image
			+ "</th><td>" + user_name + "</td></tr><tr valign=\"top\"><td>"
			+ tweet_text +  "</td></tr></table></div>";
	// var post = "<div class=\"posttext\"><table border=\"1\"><tr><td
	// rowspan=\"2\">" + image + "</td><td>" + user_name + "</td></tr><tr><p>" +
	// tweet.text + "</p></tr></table></div>" ;
	timeLine.unshift(post);

	var out = "";
	for ( var i = 0; i < timeLine.length; i++) {
		out = out + timeLine[i];
	}
	tweetElem.innerHTML = out;
}
