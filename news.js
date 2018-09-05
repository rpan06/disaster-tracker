$(document).ready(requestNewsData());

function requestNewsData( keyWord = "world disaster"  ) {

    let data_object = { apiKey: "" ,q: "", from: "", to: "", sortBy: "" , pageSize: ""};
    let ajaxParams = {
        data: data_object,
        dataType: 'json',
        url: '' ,
        method: 'get',
        success: renderNewsData,
    }

    data_object.apiKey = '5f9b798c24b344edb04feb52d0e31d4f';
    data_object.q = keyWord;
    data_object.from = "2018-07-01";
    data_object.to = "2018-09-04";
    data_object.sortBy = "relevancy";
    data_object.pageSize = '15';
    ajaxParams.url = "https://newsapi.org/v2/everything";
    ajaxParams.data = data_object;

    $.ajax(ajaxParams);
}


function renderNewsData(responseData){
    let newsData = new Object();

    if(responseData.status === 'ok'){

        for( let i  in  responseData.articles) {
            newsData.source =  responseData.articles[i].source;
            newsData.author =  responseData.articles[i].author;
            newsData.title =  responseData.articles[i].title;
            newsData.description =  responseData.articles[i].description;
            newsData.url =  responseData.articles[i].url;
            newsData.urlToImage =  responseData.articles[i].urlToImage;
            newsData.publishedAt =  responseData.articles[i].publishedAt;
            newsTitle = $('<a>',{
                text:  newsData.title,
                title: newsData.title,
                href:   newsData.url,
                target: "_blank"
            });
            let newsDiv = $('<div>');
            newsDiv.append(newsTitle);
            $('#tab1default').append(newsDiv);
            // console.log('getResult_news' ,newsDiv);
        }
    }else{
        // console.log('msg fail', responseData);
    }
}

