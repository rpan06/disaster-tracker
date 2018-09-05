let listOfDisasters = [];

let locationCoordinatesArray = []

function getDataFromReliefWeb(){
    let ajaxParams = {
          url: 'https://api.reliefweb.int/v1/reports?appname=apidoc&profile=full&limit=30',
          method: 'get',
          success: getDataFromReliefWebSuccess, //boolean, whether operation has succeeded
          dataType: 'json',
          error: function(){
                console.log('error');
          }
    }
    $.ajax(ajaxParams)
}


function getDataFromReliefWebSuccess(responseData){
    console.log('ajax successful', responseData);
    var responseDataDisaster = []
    for (let index = 0; index < responseData.data.length; index++) {
        var disasterItem = responseData.data[index].fields
        locationCoordinatesArray.push(disasterItem.primary_country.location)
        if(disasterItem.disaster){
            responseDataDisaster.push(disasterItem)
        }

    }
    console.log(locationCoordinatesArray)
    console.log(responseDataDisaster);


    //var disasterTitle = responseData.data[index].fields.disaster.location
}

getDataFromReliefWeb();


//https://api.reliefweb.int/v1/reports?appname=apidoc&profile=list&limit=30&fields[include][]=disaster

//https://api.reliefweb.int/v1/reports?profile=full
//https://api.reliefweb.int/v1/reports?appname=apidoc&filter[field]=country&filter[value]=France
//https://api.reliefweb.int/v1/reports?appname=apidoc&query[value]=earthquake





// function getDataOnSpecificDisaster(){
//     var ajaxParams = {
//           url: 'https://api.reliefweb.int/v1/reports/2454884',
//           method: 'get',
//           dataType: 'json',
//           success: function(response){
//             getDataOnSpecificDisasterSuccess(response);
//         }, //boolean, whether operation has succeeded
//           error: function(){
//                 console.log('error');
//           }
//     }
//     $.ajax(ajaxParams)
// }

// function getDataOnSpecificDisasterSuccess(responseData){
//     console.log('ajax successful 2 ', responseData);
//     responseData2 = responseData;
// }
