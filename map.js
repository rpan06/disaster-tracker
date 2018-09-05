$(document).ready(initialize);

var map;

function initialize() {
	initMap();
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	zoom: 2,
	mapTypeId: 'roadmap',
	center: {lat: 13.4443, lng: 144.7937}
	});
}