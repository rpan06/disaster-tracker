/**
 * Define all global variables here.
 *
 */
 $(document).ready(sendAjax);

news_array = [];
const NEWS_URL = 'https://newsapi.org/v2/everything';
const API_KEY  =  '5f9b798c24b344edb04feb52d0e31d4f';

var data_object = { apiKey: API_KEY,
    q: "",    from: "",    to: "", sortBy: "" , pageSize: ""
};

var ajaxParams = {
    data: data_object,
    dataType: 'json',
    url: '',
    method: 'get',
    success: getResult,

}

function getResult(response){
    var    newsData = new Object();
    if(response.status === 'ok'){
        for( let i  in  response.articles) {
            newsData.source =  response.articles[i].source;
            newsData.author =  response.articles[i].author;
            newsData.title =  response.articles[i].title;
            newsData.description =  response.articles[i].description;
            newsData.url =  response.articles[i].url;
            newsData.urlToImage =  response.articles[i].urlToImage;
            newsData.publishedAt =  response.articles[i].publishedAt;
            news_array.push(newsData);
        }
        console.log ('news_array', news_array);
        console.log('msg success', response);
    }else{
        console.log('msg fail', response);
    }
}

function requsetData(  ) {

    data_object.q = 'earthquake AND indonesia';
    data_object.from = "2018-07-01";
    data_object.to = "2018-09-04";
    data_object.sortBy = "relevancy";
    data_object.pageSize = '15';
    ajaxParams.url = NEWS_URL;
    ajaxParams.data = data_object;
}

function sendAjax(){
    requsetData();
    $.ajax(ajaxParams);
}