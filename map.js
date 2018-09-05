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

function placeMarkers(array) {
  for (let i = 0; i < array.length; i++) {
    var coordinates = array[i].location;
    var latLng = new google.maps.LatLng(coordinates.lat,coordinates.lon);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}
