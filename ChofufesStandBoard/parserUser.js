function parserUser(Profile) {
	var output = "";
	var twitter_qr_url = "http://www.it-top.biz/qr/qrapi/?s=2&q=2&d=https://twitter.com/";
	var profileElem = document.getElementById("profile");
	for ( var i = 0; i < Profile.length; i++) {
		var description = "";
		if (/chrome/i.test(navigator.userAgent)) {
			description = "<P>"
					+ Profile[i].description.split("/").join("／") + "</P>";
		} else {
			description = "<P>" + Profile[i].description + "</P>";
		}
		var image = "<img src=\"" + Profile[i].profile_image_url
				+ "\" width=\"48\" height=\"48\" alt=\"user_image\"/>";

		var screen_name = "<h2>" + Profile[i].screen_name + "</h2>";

		var qr_image = "<img src=\"" + twitter_qr_url + Profile[i].screen_name
				+ "\">";

		var profile = "<div class=\"profiletext\">"
				+ "<table><tr valign=\"top\"><th>" + image + "</th><td>"
				+ screen_name + "</td></tr><tr valign=\"top\"><td>" + qr_image
				+ "</td><td>" + description + "</td></tr></table></div>";

		output = output + profile;
	}
	profileElem.innerHTML = output;
}