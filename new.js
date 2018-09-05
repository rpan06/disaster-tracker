/**
 * Define all global variables here.
 *
 */
 $(document).ready(sendAjax);

news_array = [];
const NEWS_URL = 'https://newsapi.org/v2/everything';
const API_KEY  =  '5f9b798c24b344edb04feb52d0e31d4f';

var data_object = { apiKey: API_KEY,
    q: "",    from: "",    to: "", sortBy: ""
};

var ajaxParams = {
    data: data_object,
    dataType: 'json',
    url: '',
    method: 'get',
    success: getResult,

}

function getResult(response){

        if(response.success){
            for( let i  in  response.data) {
                var    newsData = new Object();
                newsData.status = response.data[i].status;
                newsData.totalResults = response.data[i].totalResults;
                newsData.articles =  response.data[i].articles;
                newsData.source =  response.data[i].source;
                newsData.author =  response.data[i].author;
                newsData.title =  response.data[i].title;
                newsData.description =  response.data[i].description;
                newsData.url =  response.data[i].url;
                newsData.urlToImage =  response.data[i].urlToImage;
                newsData.publishedAt =  response.data[i].publishedAt;
                news_array.push(newsData);
                console.log ('news_array', news_array);
                // updateStudentList(student_array);

            }
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
    ajaxParams.url = NEWS_URL;
    ajaxParams.data = data_object;
}

function sendAjax(){
    requsetData();
    $.ajax(ajaxParams);
}