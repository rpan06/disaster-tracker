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
    const item = array[i];
    let latLng = new google.maps.LatLng(item.location.lat,item.location.lon);
    let infowindow = new google.maps.InfoWindow({
      content: '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      `<h2 id="firstHeading" class="firstHeading">${item.title}</h2>`+
      '<div id="bodyContent">'+
      `<p>${item.body} <a href=${item.url}>read more</a></p>`+
      '</div>'+
      '</div>'
    });
    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: item.title
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }
}
