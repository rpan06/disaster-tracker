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
	var circles = {
		ColdWave: { color: '#99ccff' },
		Drought: { color: '#996633' },
		Earthquake: { color: '#996633' },
		Epidemic: { color: '#e6e600' },
		ExtratropicalCyclone: { color: '#737373' },
		Fire: { color: ' #ff6600' },
		FlashFlood: { color: '#0059b3' },
		Flood: { color: '#0066cc' },
		HeatWave: { color: ' #ff6600' },
		InsectInfestation: { color: '#5cd65c' },
		LandSlide: { color: '#996633' },
		MudSlide: { color: '#996633' },
		Other: { color: '#000000' },
		SevereLocalStorm: { color: '#737373' },
		SnowAvalanche: { color: '#e6f2ff' },
		StormSurge: { color: '#737373' },
		TechnologicalDisaster: { color: ' #000000' },
		TropicalCyclone: { color: '#737373' },
		Tsunami: { color: '#0059b3' },
		Volcano: { color: ' #ff0000' },
		WildFire: { color: '#ff6600' },
	};
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
		// let marker = new google.maps.Marker({
		//   position: latLng,
		//   icon: icons[item.disasterType].icon,
		//   map: map,
		//   title: item.title
		// });
		// marker.addListener('click', function() {
		//   infowindow.open(map, marker);
		// });
		let circle = new google.maps.Circle({
	        strokeColor: circles[item.disasterType],
	        strokeOpacity: 0.5,
	        strokeWeight: 0.5,
	        fillColor: circles[(item.disasterType).replace(/ /g,'')].color,
	        fillOpacity: 0.5,
	        center: latLng,
	        clickable: true,
	        draggable: false,
	        map: map,
	        radius: (49 * 15000),
	        data: { Title: item.title }
    	});
		google.maps.event.addListener(circle, 'click', function(ev){
			infowindow.setPosition(circle.getCenter());
			infowindow.open(map);
		});
	}
}
