(function() {
  'use strict';
 document.getElementsByClassName("navbar-brand")[0].innerHTML = 'Prato Timesheets';
 document.querySelectorAll("[class*='cal_item body']").forEach(el => {
  if(el.getElementsByTagName('div')[0].getElementsByTagName('span')[2]) el.innerHTML = el.getElementsByTagName('div')[0].getElementsByTagName('span')[2].innerHTML
 });

//Set Font
var f = document.createElement('link');
f.setAttribute('href',"https://fonts.googleapis.com/css?family=Roboto");
f.setAttribute('rel',"stylesheet");
(document.head || document.documentElement).appendChild(f);

//Set stylesheet
var s = document.createElement('style');
s.type = "text/css";
s.innerHTML = styleSheet;
(document.head || document.documentElement).appendChild(s);

//Remove footer
$("#cal_week").height($("footer > nav").offset().top);

$(document).attr("title", "Prato TimeSheets");

//Change favicon
var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = 'https://media.licdn.com/dms/image/C560BAQE9RqmFlB0w3Q/company-logo_200_200/0?e=1544659200&v=beta&t=0gBSnfAIPrHHVf0CwIbeIoaI1iiJMWX8cbE9B-m0Lp4';
document.getElementsByTagName('head')[0].appendChild(link);

 //Add buttons
 $( "#dialogs" ).on( "dialogopen", function( event, ui ) {
 window.setTimeout(function(){

    //Hide travel stuff
    $('#TravelFee').parent().parent().css("display","none");
    //Hide Job
    $('#Job_No').parent().parent().css("display","none");
    //Hide nav tabs
    $('.nav-tabs').css("display","none");

    for(var prop in window.buttons) {
        let buttonDeclaration = window.buttons[prop];
        let $input = $('<input type="button" id="'+prop+'" value="'+buttonDeclaration.ButtonText+'" class="ui-button ui-corner-all ui-widget" style="margin:10px !important;" />');
        $input.appendTo($("#dialogs"));
        $input.on('click', function(){window.fillInDialog(buttonDeclaration)});
    };
},100);

});

window.fillInDialog = function(buttonDefinition){
for(var prop in buttonDefinition) {
        if(prop !== 'save' && prop !== 'ButtonText'){
            window.fillInField(prop,buttonDefinition[prop]);
        }
    };
void(0);
};
window.fillInField = function(field,value){
document.getElementById(field).focus();
document.getElementById(field).value=value;
document.getElementById(field).blur();
};
})();