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
    $('#types-disaster li').click(filterDisasterList);

    $("#submit").click(submitData)
    $("#test-button").click(getDataFromServer)
    $("#title").click(toggleSearchByLocation)
}

function renderGoogleMarkers(){
    console.log(listOfDisasters);
    placeMarkers(listOfDisasters);
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
    clearInterval(intervalStart)
    renderGoogleMarkers();
}
