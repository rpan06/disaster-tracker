$(document).ready(start)

function start(){
    clickHandlers();
}

function clickHandlers(){
    $('.nav-tabs a').click(function(event){
        event.preventDefault()
        $(this).tab('show')
    })
}
