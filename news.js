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
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth();
    let yyyy = today.getFullYear();
    
    data_object.apiKey = '5f9b798c24b344edb04feb52d0e31d4f';
    data_object.q = keyWord;
//    data_object.from = yyyy + '-' + mm +'-' + dd;
    console.log('data_object.from', yyyy,mm,dd);
//    data_object.to = yyyy + '-' + mm +'-' + dd; //"2018-09-04";
    data_object.sortBy = "relevancy";
    data_object.pageSize = '15';
    ajaxParams.url = "https://newsapi.org/v2/everything";
    ajaxParams.data = data_object;

    $.ajax(ajaxParams);
}


function renderNewsData(responseData){
    $('#tab1default').empty();
    let newsData = new Object();

    if(responseData.status === 'ok'){
        if(!responseData.articles.length){
            $('<div>').text("No News Found On This Topic").appendTo("#tab1default")
        }
        for( let i  in  responseData.articles) {
            newsData.source =  responseData.articles[i].source;
            newsData.author =  responseData.articles[i].author;
            newsData.title =  responseData.articles[i].title;
            newsData.description =  responseData.articles[i].description;
            newsData.url =  responseData.articles[i].url;
            newsData.urlToImage =  responseData.articles[i].urlToImage;
            newsData.publishedAt =  responseData.articles[i].publishedAt;
            newsTitle = $('<li><a>',{
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
