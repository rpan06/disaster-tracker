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

    for (let i = 0; i < dataReceived.tweets.statuses.length; i++){
        let twitterName = dataReceived.tweets.statuses[i].user.screen_name;
        let tweetText = dataReceived.tweets.statuses[i].text;
        let tweetNameDiv = $('<div>').text(twitterName);
        let tweetTextDiv = $('<div>').text(tweetText);
        $('#tab2default').append(tweetNameDiv, tweetTextDiv);
    }
}
