//TODO: unsubscribe option
//TODO: fix fire stuff
//TODO: CURRENTLOCATION NOT GETTING DATA

//http://bassistance.de/2009/03/03/jquery-snippet-autocomplete-city-based-on-zip-code/
//https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
//https://mlab.com/databases/disaster-tracker/collections/data?q=&f=&s=&pageNum=0&pageSize=10
//https://zellwk.com/blog/crud-express-mongodb/
//https://crontab.guru/
//https://github.com/breathics/nodemail-prototype

let currentLocation = {};
let informationArray = [];

function submitData() {
  const email = $("#email-input").val()
  informationArray.push({
    email: email,
    location: currentLocation
  })

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
  window.alert(`Your email ${email} has been subscribed! Thank you!`);
}

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

function isDisasterNearThisLocation(disasterLocation, centerOfRadius, km = 500) {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerOfRadius.lat / 180.0) * ky;
  var dx = Math.abs(centerOfRadius.lon - disasterLocation.lon) * kx;
  var dy = Math.abs(centerOfRadius.lat - disasterLocation.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;  //boolean, true or false
}

function sendEmail(email, disaster) {
  console.log('sendEmail', email, disaster)

  $.ajax({
    url: "/email",
    method: "POST",
    dataType: "JSON",
    data: {
      email: email,
      disaster: disaster,

    },
    success: function (response) {
      console.log("success")
    },
    failure: function (err) {
      console.log("failure")
    }
  });
}
