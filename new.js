/**
 * Define all global variables here.
 *
 */
news_array = [];

var data_object = { apikey: '5f9b798c24b344edb04feb52d0e31d4f',
    q: '',
    from: '',
    to: '',
    sortBy: ''};

var ajaxParams = {
    data: data_object,
    dataType: 'json',
    url: 'https://newsapi.org/v2/everything',
    method: 'get',
    success: getStudent,

}