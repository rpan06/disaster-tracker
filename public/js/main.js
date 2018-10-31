$(document).ready(start)

let apiStatus = {
    ReliefWeb: false,
    EarthquakeUSGS: false,
}

const intervalStart = setInterval(checkDataIsReady, 100)

function start(){
    clickHandlers();
    initMap();
    // getDataForFire()
    getDataFromEarthquakeUSGS();
    getDataFromReliefWeb();
    searchTwitter();
    requestNewsData()
}

function clickHandlers(){
    $('.nav-tabs a').click(function(event){
        event.preventDefault()
        $(this).tab('show')
    })
    $("#submit").click(validateInfo)
    // $("#test-button").click(getDataFromServer)
    $("#title").click(toggleSearchByLocation)
}

function toggleSearchByLocation(){
    $("#pac-card div:not(#title)").toggle()
}

function checkDataIsReady(){
    for (let key in apiStatus){
        if (!apiStatus[key]){
            return
        }
    }
    clearInterval(intervalStart);
    filterDisasterTypes(listOfDisasters);
    placeMarkers(listOfDisasters);
}
