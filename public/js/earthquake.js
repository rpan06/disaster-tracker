function getDataFromEarthquakeUSGS(){
    let ajaxParams = {
          url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson',
          method: 'get',
          success: getDataFromEarthquakeUSGSSuccess,
          error: function(){
                console.log('getDataFromEarthquakeUSGS: error');
          }
    }
    $.ajax(ajaxParams)
}

function getDataFromEarthquakeUSGSSuccess(responseData){
    for (let index = 0; index < responseData.features.length; index++) {
        const earthquakeItem = responseData.features[index];
        const location = getEarthquakeLocation(earthquakeItem.properties.title);
        let earthquake = {
            title: location + ": Earthquake - " + getEarthquakeDate(earthquakeItem.properties.time),
            disasterType: 'Earthquake',
            body: earthquakeItem.properties.title,
            location: {
                lat: earthquakeItem.geometry.coordinates[1],
                lon: earthquakeItem.geometry.coordinates[0],
            },
            keywords: location.toLowerCase() + ' earthquake',
            url: earthquakeItem.properties.url,
        }
        listOfDisasters.push(earthquake)
        apiStatus.EarthquakeUSGS = true;
    }
}


function getEarthquakeDate(time){
    let date = new Date(time)
    date = date.toDateString();
    return date
}

function getEarthquakeLocation(text){
    text = text.split(', ')
    if (typeof text[1] === 'undefined'){
        text = text.join('').split('-')
    }
    return text[1]
  }
