/**
 * Define all global variables here.
 *
 */
 $(document).ready(sendAjax);

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
    let newsData = new Object();
    if(response.status === 'ok'){
        renderNews(response);
        console.log('msg success', response);
    }else{
        console.log('msg fail', response);
    }
}

function requestData( keywords = "world disaster" ) {

    data_object.q = keywords;
    data_object.from = "2018-07-01";
    // data_object.to = "2018-09-04";
    data_object.sortBy = "relevancy";
    data_object.pageSize = '15';
    ajaxParams.url = NEWS_URL;
    ajaxParams.data = data_object;
}

function sendAjax(){
    requestData();
    $.ajax(ajaxParams);
}


function renderNews(responseData) {
    $('#tab1default').empty();
    let newsData = new Object();

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
    }


}
