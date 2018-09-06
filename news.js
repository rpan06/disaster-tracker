function requestNewsData( keyWord = "world disaster"  ) {
    // console.log('keyWord', keyWord);
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
            let newsDiv = $('<div>', { class: 'panel panel-success' });
            let newsHeading = $('<div>', { class: 'panel-heading', text: 'No News Found On This Topic' });
            let newsBody = $('<div>', { class: 'panel-body', text: ' ' });

            newsDiv.append(newsHeading, newsBody);
            $('#tab1default').append(newsDiv);
        }
        else{
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
                let newsDiv = $('<div>', { class: 'panel panel-success' });
                let newsHeading = $('<div>', { class: 'panel-heading'}).append(newsTitle);
                let newsBody = $('<div>', { class: 'panel-body', text: newsData.description});

                newsDiv.append(newsHeading, newsBody);
                $('#tab1default').append(newsDiv);
            }
        }
    }
    else{
        // error to do
        // console.log('msg fail', responseData);
    }
}

//    let today = new Date();
//    let dd = today.getDate();
//    let mm = today.getMonth();
//    let yyyy = today.getFullYear();

//    data_object.from = yyyy + '-' + mm +'-' + dd;
//    console.log('data_object.from', yyyy,mm,dd);
//    data_object.to = yyyy + '-' + mm +'-' + dd; //"2018-09-04";
