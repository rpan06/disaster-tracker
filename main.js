$(document).ready(start)

function start(){
    clickHandlers();
    initMap();
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
    $('#types-disaster li').click(filterDisasterList)
}
