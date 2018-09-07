$(document).ready(start)

function start(){
    clickHandlers();
    initMap();
    getDataForFire()
    getDataFromEarthquakeUSGS();
    getDataFromReliefWeb();
    searchTwitter();
    requestNewsData()

    //makes sure that all the data is ready and collected before rendering
    setTimeout(function(){
        renderGoogleMarkers();
    }, 3000)
}

function clickHandlers(){
    $('.nav-tabs a').click(function(event){
        event.preventDefault()
        $(this).tab('show')
    })
    $('#types-disaster li').click(filterDisasterList)
}

function renderGoogleMarkers(){
    placeMarkers(listOfDisasters);
    console.log(listOfDisasters);
}
