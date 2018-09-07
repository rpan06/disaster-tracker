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

function renderTweets(dataReceived) {
    $('#twitter-tab').empty();
    let tweetData = dataReceived.tweets.statuses;

    //if no data, show on DOM
    if(!tweetData.length){
        let tweetDiv = $('<div>', { class: 'panel panel-info' });
        let tweetHeading = $('<div>', { class: 'panel-heading', text: 'No Tweets Found On This Topic' });
        let tweetBody = $('<div>', { class: 'panel-body', text: ' ' });

        tweetDiv.append(tweetHeading, tweetBody);
        $('#twitter-tab').append(tweetDiv);
    }

    for (let i = 0; i < tweetData.length; i++){
        let tweetText = tweetData[i].text;

        //if a retweet, then use original tweet text
        if (tweetData[i].retweeted_status){
            tweetText = tweetData[i].retweeted_status.text
        }

         //turns http text into hyperlinks
        if(tweetText.indexOf("https://") !== -1){
            let linkText = tweetText.match(/https\S+/)[0]
            tweetText = tweetText.replace(linkText, linkText.link(linkText))
        }
        tweetText += `<br><br><small><span class="glyphicon glyphicon-retweet"></span> ${dataReceived.tweets.statuses[i].retweet_count}     <span class="glyphicon glyphicon-heart"></span> ${dataReceived.tweets.statuses[i].favorite_count}</small>`;

        let twitterName = `<h4><i class="fa fa-twitter"></i>  ${dataReceived.tweets.statuses[i].user.name}  <small>@${dataReceived.tweets.statuses[i].user.screen_name}</small></h4>`;
        let tweetDiv = $('<div>', { class: 'panel panel-info' });
        let tweetHeading = $('<div>', { class: 'panel-heading', html: twitterName });
        let tweetBody = $('<div>', { class: 'panel-body', html: tweetText});
        $('.panel-body a', { target: "_blank", rel: "noopener noreferrer" });
        tweetDiv.append(tweetHeading, tweetBody);
        $('#twitter-tab').append(tweetDiv);
    }
}
