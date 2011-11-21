function homeTimeline(timeLineData) {
	var out = "";
	//var timeLine = new Array();
	var tweetElem = document.getElementById("tweet");
	
	timeLineData = timeLineData.reverse();
	
	for (var i = 0; i < timeLineData.length; i++) {
		var image = "<img src=\"" + timeLineData[i].user.profile_image_url
				+ "\" width=\"48\" height=\"48\" alt=\"user_image\"/>";

		var user_name = "<h2>" + timeLineData[i].user.screen_name; + "</h2>";
		var tweet_text = "<p>" + timeLineData[i].text + "</p>";
		var create_at = "<p>" + timeLineData[i].created_at + "</p>";
		var post = "<div class=\"posttext\">"
				+ "<table><tr valign=\"top\"><th rowspan=\"2\">" + image
				+ "</th><td>" + user_name + "</td></tr><tr valign=\"top\"><td>"
				+ tweet_text +  "</td></tr></table></div>";
		
		timeLine.unshift(post);
		
	}
	for ( var i = 0; i < timeLine.length; i++) {
		out = out + timeLine[i];
	}

	tweetElem.innerHTML = out;
}