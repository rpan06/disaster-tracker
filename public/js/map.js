let map;

const disasterTypes = {
	Volcano: { color: ' #900A0A' },
	'Wild Fire': { color: '#C30000' },
	Fire: { color: ' #ff0000' },
	'Heat Wave': { color: ' #ff6600' },
	Drought: { color: '#FFBA27' },
	Epidemic: { color: '#e6e600' },
	'Insect Infestation': { color: '#5cd65c' },
	Earthquake: { color: '#0B8E04' },
	'Land Slide': { color: '#996633' },
	'Mud Slide': { color: '#75481A' },
	'Snow Avalanche': { color: '#D6FDFF' },
	'Cold Wave': { color: '#99ccff' },
	Flood: { color: '#027DF9' },
	'Flash Flood': { color: '#0059b3' },
	Tsunami: { color: '#000679' },
	'Tropical Cyclone': { color: '#E700CE' },
	'Extratropical Cyclone': { color: '#940084' },
	'Storm Surge': { color: '#C4C4C4' },
	'Severe Local Storm': { color: '#737373' },
	'Technological Disaster': { color: ' #000000' },
	Other: { color: '#000000' },
};

function initMap() {
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

let activeInfoWindow;

function placeMarkers(array) {
	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		if(!item.location){
			continue;
		}
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
	        strokeColor: disasterTypes[item.disasterType],
	        strokeOpacity: 0.8,
	        strokeWeight: 0,
	        fillColor: disasterTypes[item.disasterType].color,
	        fillOpacity: 0.6,
	        center: latLng,
	        clickable: true,
	        draggable: false,
	        map: map,
	        radius: 400000,
	        data: { Title: item.title }
		});

		circle.addListener('click', function(ev){
			infowindow.setPosition(circle.getCenter());

			if (activeInfoWindow) {
				activeInfoWindow.close();
			}
			infowindow.open(map);
			activeInfoWindow = infowindow;

			requestNewsData(item.keywords);
      		searchTwitter(item.keywords);
		});
		circle.addListener('mouseover', function(ev){
			circle.set('fillOpacity', 0.9);
		});
		circle.addListener('mouseout', function(ev){
			circle.set('fillOpacity', 0.6);
		});
		map.addListener('zoom_changed', function(ev){
			if(map.zoom>21){
				circle.setRadius(1);
			} else if(map.zoom > 17){
				circle.setRadius(10);
			} else if(map.zoom > 14){
				circle.setRadius(100);
			} else if(map.zoom > 10){
				circle.setRadius(1000);
			} else if(map.zoom > 7){
				circle.setRadius(10000);
			} else if(map.zoom > 4){
				circle.setRadius(100000);
			} else if(map.zoom > 2){
				circle.setRadius(400000);
			}
			console.log(map.zoom, circle.radius)
		});
	}
}


function filterDisasterTypes(arr){
	let currentDisasterTypes = [];
	for(let i = 0; i<arr.length; i++){
		if(currentDisasterTypes.indexOf(arr[i].disasterType) === -1){
			currentDisasterTypes.push(arr[i].disasterType)
		}
	}
	addFilterMenu(currentDisasterTypes)
	initMapLegend(currentDisasterTypes);
}
function addFilterMenu(arr){
	arr.map(item=>{
		let listLink = $("<a>", {
			href: "#",
			text: item
		});
		let listItem = $("<li>").append(listLink);
		$("#types-disaster").append(listItem)
	})
	$('#types-disaster li').click(filterDisasterList);
}

function initMapLegend(arr) {
	let legend = $('#map_legend');
	for (let i = 0; i<arr.length; i++){
			let elementDiv = $('<div>', { id: 'elementDiv' });
			let elementCir = $('<div>', { id: 'elementCir', class: 'circle' }).css('background-color', disasterTypes[arr[i]].color);
			let elementName = $('<span>', { id: 'elementName', text: arr[i], color: disasterTypes[arr[i]].color });
			elementDiv.append(elementCir, elementName);
			legend.append(elementDiv);
	}
}
