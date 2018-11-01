//http://bassistance.de/2009/03/03/jquery-snippet-autocomplete-city-based-on-zip-code/
//https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
//https://mlab.com/databases/disaster-tracker/collections/data?q=&f=&s=&pageNum=0&pageSize=10
//https://zellwk.com/blog/crud-express-mongodb/
//https://crontab.guru/
//https://github.com/breathics/nodemail-prototype

let currentLocation = {};
let informationArray = [];

function validateInfo(){
  const email = $("#email-input").val()
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  if(!regex.test(email)){
    $('#text-alert').text(`Please enter a valid email!`)
  } else if(Object.keys(currentLocation).length === 0){
    $('#text-alert').text(`Please enter a location!`)
  }else{
    submitData();
  }
}

function submitData() {
  const email = $("#email-input").val()
  informationArray.push({
    email: email,
    location: currentLocation
  })

  //stores emails and locations in mongodb
  $.ajax({
    method: 'post',
    url: '/form',
    data: {
      email,
      location: currentLocation
    },
    success: (resp) => {
      console.log('Server Resp:', resp);
    }
  });

  $("#pac-input").val("")
  $("#email-input").val("")
  checkEmail(informationArray)
}

function checkEmail(dataArray) {
  let noDisastersNearLocation = true;
  for (let dataIndex = 0; dataIndex < dataArray.length; dataIndex++) {
    for (let disasterIndex = 0; disasterIndex < listOfDisasters.length; disasterIndex++) {
      const disasterLocation = listOfDisasters[disasterIndex].location;
      if(typeof disasterLocation === 'undefined'){
        continue;
      }
      const centerOfRadius = dataArray[dataIndex].location
      if (isDisasterNearThisLocation(disasterLocation, centerOfRadius)){
        noDisastersNearLocation = false;
        sendEmail(dataArray[dataIndex].email, listOfDisasters[disasterIndex]);
      }
    }
  }
  if(noDisastersNearLocation){
    $('#text-alert').text(`No disasters in this area!`)
  }
}

function isDisasterNearThisLocation(disasterLocation, centerOfRadius, km = 500) {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerOfRadius.lat / 180.0) * ky;
  var dx = Math.abs(centerOfRadius.lon - disasterLocation.lon) * kx;
  var dy = Math.abs(centerOfRadius.lat - disasterLocation.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;  //boolean, true or false
}

function sendEmail(email, disaster) {
  console.log('sendEmail', email, disaster)
  $('#text-alert').text(`Info has been sent! Thank you!`);

  $.ajax({
    url: "/email",
    method: "POST",
    dataType: "JSON",
    data: {
      email: email,
      disaster: disaster,

    },
    success: function (response) {
      console.log("success, email sent")
    },
    failure: function (err) {
      console.log("failure, email NOT sent")
    }
  });

  currentLocation = {};
  informationArray = [];
}





/**************
Incomplete functions to pull information from MongoDB and send emails based on that
**************/
/*
function getDataFromServer() {
  $.ajax({
    method: 'get',
    url: '/returndata',
    success: (resp) => {
      console.log('Server Resp:', resp);
       checkEmail(resp.results)
    },
    error: function () {
      console.log('error')
    }
  });

}

function checkEmail(dataArray) {
  console.log(dataArray)
  for (let dataIndex = 0; dataIndex < dataArray.length; dataIndex++) {
    for (let disasterIndex = 0; disasterIndex < listOfDisasters.length; disasterIndex++) {
      const disasterLocation = listOfDisasters[disasterIndex].location;
      const centerOfRadius = dataArray[dataIndex].location
      if (isDisasterNearThisLocation(disasterLocation, centerOfRadius)) {
        sendEmail(dataArray[dataIndex].email, listOfDisasters[disasterIndex]);
      }
    }
  }
}
*/
