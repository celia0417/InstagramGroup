/**
 * Search User and Media
 */

var access_token = "301411812.1fb234f.a14952fa6b734d21bdd2dcd8e1962a39";
var googleApiKey = "AIzaSyAFnHNkIMi_6931XpOt4PGnCvFmabrf5Hs";

function searchUsers() {
	// delete groups['No_Assigned_Group'];
	var userName = document.getElementById("search_user_name").value;
	console.log(userName);
	$.ajax({
		type : "GET",
		cache : false,
		url : 'https://api.instagram.com/v1/users/search?q=' + userName
				+ '&access_token=' + access_token,
		success : formatUsers,
		error : function() {
			console.log('fatal error!!!')
		},
		dataType : 'jsonp'
	});
}

function formatUsers(users) {
	for (i = 0; i < users['data'].length; i++) {
		var person = new Object();
		person.username = users['data'][i]['username'];
		person.profile_picture = users['data'][i]['profile_picture'];
		person.full_name = users['data'][i]['full_name'];
		person.id = users['data'][i]['id'];
		person.group = [];
		person.group[0] = "No_Assigned_Group";
		groups['No_Assigned_Group'][users['data'][i]['username']] = person;
	}
	// groups['No_Assigned_Group'] = group;

	// console.log(groups)
	makeTable();
	showOneGroup('No_Assigned_Group');
};

function formatRecent(recents) {

};

function searchMediaByTag() {
	var tag = document.getElementById("search_tag").value;
	console.log(tag);
	$.ajax({
		type : "GET",
		cache : false,
		url : 'https://api.instagram.com/v1/tags/' + tag
				+ '/media/recent?access_token=' + access_token,
		success : formatMedia,
		error : function() {
			console.log('fatal error!!!')
		},
		dataType : 'jsonp'
	});
}

function formatMedia(medias) {
	console.log(medias)
	var mediaArray = [];
	var index = 0;
	var group = {};
	for (i = 0; i < medias['data'].length; i++) {
		// media
		var media = new Object();
		if (medias['data'][i]['type'] == 'image') {
			media.media = medias['data'][i]['images']['standard_resolution']['url'];
			if (medias['data'][i]['caption'] == null) {
				media.caption = "";
				media.created_time = "";
			} else {
				media.caption = medias['data'][i]['caption']['text'];
				media.created_time = medias['data'][i]['caption']['created_time'];
			}
			media.likes = medias['data'][i]['likes']['count'];
			media.link = medias['data'][i]['link'];
			media.tags = [];
			var cnt = 0;
			for (j = 0; (j < medias['data'][i]['tags'].length) && (cnt < 5); j++) {
				media.tags[j] = medias['data'][i]['tags'][j];
				cnt++;
			}

			// user
			var person = new Object();
			person.username = medias['data'][i]['user']['username'];
			person.profile_picture = medias['data'][i]['user']['profile_picture'];
			person.full_name = medias['data'][i]['user']['full_name'];
			person.id = medias['data'][i]['user']['id'];
			person.group = [];
			person.group[0] = "No_Assigned_Group";
			groups['No_Assigned_Group'][medias['data'][i]['user']['username']] = person;

			media.user = person;

			mediaArray[index] = media;
			index++;
		}
	}
	// groups['No_Assigned_Group'] = group;
	makeMediaTable();
	plotMedia(mediaArray);
}

function searchPopular() {
	$.ajax({
		type : "GET",
		cache : false,
		url : 'https://api.instagram.com/v1/media/popular?access_token='
				+ access_token,
		success : formatMedia,
		error : function() {
			console.log('fatal error!!!')
		},
		dataType : 'jsonp'
	});
}

function searchByTime() {

}

function searchByLocation() {
	var address1 = document.getElementById('search_address_1').value;
	var address2 = document.getElementById('search_address_2').value;
	var city = document.getElementById('search_address_city').value;
	var state = document.getElementById('search_address_state').value;
	if (address2 != "") {
		address2 = "+" + address2.replace(" ", "+");
	} else {
		address2 = "";
	}
	var address = address1.split(' ').join('+') + address2 + ",+"
			+ city.split(' ').join(',') + ",+" + state;
	console.log(address)
	$.ajax({
		type : "GET",
		// cache: false,
		url : 'https://maps.googleapis.com/maps/api/geocode/json?address='
				+ address + '&key=' + googleApiKey,
		success : formatLocation,
		error : function() {
			console.log('fatal error!!!')
		},
		dataType : 'json'
	});
}

function formatLocation(location) {
	console.log(location)
	var lat = location['results'][0]['geometry']['location']['lat'];
	var lng = location['results'][0]['geometry']['location']['lng'];
	searchByLatLng(lat, lng);
}

function searchByLatLng(lat, lng) {
	$.ajax({
		type : "GET",
		cache : false,
		url : 'https://api.instagram.com/v1/media/search?lat=' + lat + '&lng='
				+ lng + '&access_token=' + access_token,
		success : formatMedia,
		error : function() {
			console.log('fatal error!!!')
		},
		dataType : 'jsonp'
	});
}

function searchForSelfRecent(userId) {
	// userId = userId.id;
	console.log(userId)
	$.ajax({
		type : "GET",
		cache : false,
		url : 'https://api.instagram.com/v1/users/' + userId
				+ '/media/recent/?access_token=' + access_token,
		success : formatMedia,
		error : function() {
			console.log('fatal error!!!')
		},
		dataType : 'jsonp'
	});
}
