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
        let earthquake = {
            title: getEarthquakeLocation(earthquakeItem.properties.title) + ": Earthquake - " + getEarthquakeDate(earthquakeItem.properties.time),
            disasterType: 'Earthquake',
            body: earthquakeItem.properties.title,
            location: {
                lat: earthquakeItem.geometry.coordinates[1],
                lon: earthquakeItem.geometry.coordinates[0],
            },
            keywords: getEarthquakeLocation(earthquakeItem.properties.title).toLowerCase() + ' earthquake',
            url: earthquakeItem.properties.url,
        }
        listOfDisasters.push(earthquake)
    }
}


function getEarthquakeDate(time){
    let date = new Date(time)
    date = date.toDateString();
    return date
}

function getEarthquakeLocation(text){
    text = text.split(', ')
    return text[1]
  }
