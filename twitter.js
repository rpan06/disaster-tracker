function searchTwitter(keyWord = "world disaster"){

    let ajaxConfig = {
        url: 'https://s-apis.learningfuze.com/hackathon/twitter/index.php?',
        method: 'post',
        dataType: 'json',
        data: {
            search_term: keyWord
        },
        success: function (dataReceived) {
            renderTweets(dataReceived);
        }
    };
    $.ajax(ajaxConfig);
}
//need input topic/location from map;
//searchTwitter(inputFromMapMarker);
searchTwitter();

function renderTweets(dataReceived) {
    $('#tab2default').empty()
    console.log(dataReceived)

    if(!dataReceived.tweets.statuses.length){
        $('<div>').text("No Tweets Found On This Topic").appendTo("#tab2default")
    }
    for (let i = 0; i < dataReceived.tweets.statuses.length; i++){
        let tweetText = dataReceived.tweets.statuses[i].text;
        if(tweetText.indexOf("https://t.co/") !== -1){
            tweetText = tweetText.split(" ")
            tweetText[tweetText.length-1] = tweetText[tweetText.length-1].link(tweetText[tweetText.length-1])
            tweetText = tweetText.join(" ")
        }

        let twitterName = dataReceived.tweets.statuses[i].user.screen_name;
        let tweetNameDiv = $('<div>').text(twitterName).addClass('tweetName');
        let tweetTextDiv = $('<div>').html(tweetText).addClass('tweets');
        $('#tab2default').append(tweetNameDiv, tweetTextDiv);
    }
}
