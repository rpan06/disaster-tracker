let listOfDisasters = [];

function getDataFromReliefWeb(){
    let ajaxParams = {
          url: 'https://api.reliefweb.int/v1/reports?appname=apidoc&profile=full&limit=200',
          method: 'get',
          success: getDataFromReliefWebSuccess,
          dataType: 'json',
          error: function(){
                console.log('getDataFromReliefWeb: error');
          }
    }
    $.ajax(ajaxParams)
}

function getDataFromReliefWebSuccess(responseData){
    console.log('getDataFromReliefWebSuccess: got data successfully');
    for (let index = 0; index < responseData.data.length; index++) {
        const disasterItem = responseData.data[index].fields
        if(disasterItem.disaster){
            let disaster = {
                title: disasterItem.disaster[0].name,
                body: shortenBodyText(disasterItem.body),
                location: disasterItem.primary_country.location,
                keywords: makeKeywords(disasterItem.disaster[0].name),
                url: disasterItem.url_alias
            }
            listOfDisasters.push(disaster)
        }
    }
    deleteDuplicateData(listOfDisasters)
    console.log(listOfDisasters);
    placeMarkers(listOfDisasters)
}


function deleteDuplicateData(array){
    for (let i = 0; i < array.length-1; i++) {
        for (let k = i+1; k < array.length; k++) {
            if(array[i].title === array[k].title){
                array.splice(k,1)
                k--
            }
        }
    }
}

function makeKeywords(str){
    return str.split(" - ")[0].toLowerCase().replace(":","")
}

function shortenBodyText(str = ""){
    //str = str.replace(/\r?\n|\r/g,' ')  //removes line breaks
    str = str.replace(/[*]/g,'') //removes *
    str = str.split(" ").splice(0,100).join(" ") //grabs 100 words
    str += "..."
    return str
}

getDataFromReliefWeb();
