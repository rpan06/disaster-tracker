function getDataForFire() {
	//feed to parse
	var feed = "https://inciweb.nwcg.gov/feeds/rss/incidents/";

	$.ajax(feed, {
		accepts:{
			xml:"application/rss+xml"
		},
		dataType:"xml",
		success:function(data) {

            let fireArray = $(data).find("item")
            for (let i = 0; i < 5; i++){ //edit 5 length to however many you want
                let fireItem = $(fireArray[i])
                let fire = {
                    title: fireItem.find("title").text(),
                    disasterType: 'WildFire',
                    body: fireItem.find("description").text(),
                    location: {
                        lat: fireItem.children().eq(4).text(),
                        lon: fireItem.children().eq(5).text(),
                    },
                    keywords: fireItem.find("title").text(),
                    url: fireItem.find("link").text(),
                }
                listOfDisasters.push(fire)
            }
		}
	});

};
