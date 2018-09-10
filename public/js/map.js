let map;

var circles = {
	Volcano: { color: ' #ff0000' },
	WildFire: { color: '#ff6600' },
	Fire: { color: ' #ff6600' },
	HeatWave: { color: ' #ff6600' },
	Drought: { color: '#996633' },
	Earthquake: { color: '#996633' },
	LandSlide: { color: '#996633' },
	MudSlide: { color: '#996633' },
	Epidemic: { color: '#e6e600' },
	InsectInfestation: { color: '#5cd65c' },
	SnowAvalanche: { color: '#afd5ff' },
	ColdWave: { color: '#99ccff' },
	Flood: { color: '#0066cc' },
	FlashFlood: { color: '#0059b3' },
	Tsunami: { color: '#0059b3' },
	TropicalCyclone: { color: '#737373' },
	StormSurge: { color: '#737373' },
	SevereLocalStorm: { color: '#737373' },
	ExtratropicalCyclone: { color: '#737373' },
	TechnologicalDisaster: { color: ' #000000' },
	Other: { color: '#000000' },
};

function initMap(makeMapLegend = true) {
	map = new google.maps.Map(document.getElementById('map'), {
	zoom: 2,
	mapTypeId: 'roadmap',
	center: {lat: 13.4443, lng: 144.7937},
	mapTypeControl: true,
	// scrollwheel: false,
	mapTypeControlOptions: {
		style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
		position: google.maps.ControlPosition.TOP_RIGHT
	},
	});

	if(makeMapLegend){
		initMapLegend();
	}

	var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
	var autocomplete = new google.maps.places.Autocomplete(input);

	autocomplete.bindTo('bounds', map);

	autocomplete.setFields(
	  ['address_components', 'geometry', 'icon', 'name']);

	var infowindow = new google.maps.InfoWindow();
	var infowindowContent = document.getElementById('infowindow-content');
	infowindow.setContent(infowindowContent);
	var marker = new google.maps.Marker({
	  map: map,
	  anchorPoint: new google.maps.Point(0, -29)
	});

	autocomplete.addListener('place_changed', function () {
		infowindow.close();
		marker.setVisible(false);
		var place = autocomplete.getPlace();
		if (!place.geometry) {
		  // User entered the name of a Place that was not suggested and
		  // pressed the Enter key, or the Place Details request failed.
		  window.alert("No details available for input: '" + place.name + "'");
		  return;
		}

		// If the place has a geometry, then present it on a map.
		if (place.geometry.viewport) {
		  map.fitBounds(place.geometry.viewport);
		} else {
		  map.setCenter(place.geometry.location);
		  map.setZoom(17);  // Why 17? Because it looks good.
		}
		marker.setPosition(place.geometry.location);
		marker.setVisible(true);

		var address = '';
		if (place.address_components) {
		  address = [
			(place.address_components[0] && place.address_components[0].short_name || ''),
			(place.address_components[1] && place.address_components[1].short_name || ''),
			(place.address_components[2] && place.address_components[2].short_name || '')
		  ].join(' ');
		}

		currentLocation = { lat: place.geometry.location.lat(), lon: place.geometry.location.lng() }
	  });

}

function initMapLegend() {
	let legend = $('#map_legend');

	for(var key in circles){
		if(key==='Other')
			break;

		let elementDiv = $('<div>', { id: 'elementDiv' });
		let elementCir = $('<div>', { id: 'elementCir', class: 'circle' }).css('background-color', circles[key].color);
		let elementName = $('<span>', { id: 'elementName', text: key, color: circles[key].color });
		elementDiv.append(elementCir, elementName);
		legend.append(elementDiv);
	}
}

var activeInfoWindow;

function placeMarkers(array) {
	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		let latLng = new google.maps.LatLng(item.location.lat,item.location.lon);
		let infowindow = new google.maps.InfoWindow({
		  content:
		  '<div id="markerContent">'+
			  `<h2 id="firstHeading">${item.title}</h2>`+
			  `<h4 id="secondHeading">Disaster Type: ${item.disasterType}</h4>`+
			  '<div id="bodyContent">'+
			  	`<p id="markerContentInfo">${item.body}</p>`+
			  	`<p><a target="_blank" rel="noopener noreferrer" href="${item.url}" class="btn btn-primary" role="button">Read More</a></p>`+
			  '</div>'+
		  '</div>'
		});
		let circle = new google.maps.Circle({
	        strokeColor: circles[item.disasterType],
	        strokeOpacity: 0.8,
	        strokeWeight: 0,
	        fillColor: circles[(item.disasterType).replace(/ /g,'')].color,
	        fillOpacity: 0.6,
	        center: latLng,
	        clickable: true,
	        draggable: false,
	        map: map,
	        radius: (50 * 10000),
	        data: { Title: item.title }
		});
		google.maps.event.addListener(circle, 'click', function(ev){
			infowindow.setPosition(circle.getCenter());

			if (activeInfoWindow) {
				activeInfoWindow.close();
			}
			infowindow.open(map);
			activeInfoWindow = infowindow;

			requestNewsData(item.keywords);
      		searchTwitter(item.keywords);
		});
		google.maps.event.addListener(circle, 'mouseover', function(ev){
			circle.set('fillOpacity', 0.9);
		});
		google.maps.event.addListener(circle, 'mouseout', function(ev){
			circle.set('fillOpacity', 0.6);
		});
	}
}
