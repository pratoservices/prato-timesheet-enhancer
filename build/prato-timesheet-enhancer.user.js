"use strict";

// ==UserScript==
// @name        Prato timesheets
// @namespace   https://github.com/pratoservices/prato-timesheet-enhancer
// @description Improving timesheets app using a userscript
// @author      Prato
// @copyright   2018+, Prato (https://github.com/pratoservices/prato-timesheet-enhancer)
// @license     MIT; https://raw.githubusercontent.com/pratoservices/prato-timesheet-enhancer/master/LICENSE
// @version     1.0.0
// @icon        https://github.com/pratoservices/prato-timesheet-enhancer/raw/master/icon.png
// @homepageURL https://github.com/pratoservices/prato-timesheet-enhancer
// @supportURL  https://github.com/pratoservices/prato-timesheet-enhancer/issues
// @match       https://timesheets.scapta365.com/*/prato/Registration/WeekOverview/* 
// @grant       none
// ==/UserScript==

var styleSheet = "" +
"body {" +
  "font-family: Roboto,Helvetica,Arial,sans-serif;" +
  "color: gray !important;" +
  "background-color: white !important;" +

"}" +

"h1 {" +
  "font-size: 25px;" +
  "font-weight: normal;" +
"}" +

"footer {" +
  "display:none;" +
"}" +

".scapta_cal_week {" +
  "bottom:0 !important;" +
  "background-color: white !important;" +
  "color: gray !important;" +
  "height:initial !important;" +
"}" +

".scapta_cal_week_day {" +
  "background-image: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%,rgba(255,255,255,0.8) 100%), url(/images/CalBackground.png) !important;" +
"}" +

".scapta_cal_week_day.not_working {" +
  "background-image: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%,rgba(255,255,255,0.8) 100%), url(/images/CalBackground_Dark.png) !important;" +
"}" +

".cal_body {" +
  "border-top: 1px solid #cecece;" +
"}" +

".glyphicon {" +
  "opacity: 0.6;" +
"}" +

"#WorkType_Code {" +
  "border-color:red;" +
"}" +

"#RegisterdHours {" +
  "margin-top: 25px;" +
"}" +

".cal_item {" +
  "padding-left: 3px;" +
  "border-radius: 2px;" +
"}" +

".cal_item.body {" +
  "width: calc(100% - 9px);" +
"}" +

".navbar-inverse .navbar-brand, " +
".navbar-inverse .navbar-nav>li>a, " +
".navbar-inverse .navbar-link {" +
  "color:white;" +
"}" +

".navbar-inverse .navbar-brand:hover, " +
".navbar-inverse .navbar-nav>li>a:hover, " +
".navbar-inverse .navbar-link:hover {" +
  "background-color: #20a45f;" +
"}" +

".navbar-inverse {" +
  "background-color:#25C16F;" +
"}" +

".navbar-btn {" +
  "margin:0px;" +
  "height:50px;" +
"}" +

".navbar-btn:hover {" +
  "text-decoration:none;" +
"}" +

".navbar-inverse {" +
  "border-color:#25C16F" +
"}" +

//Mooiere kleuren voor categoriën
".cal_item.custom_IPCREATION_nietfact > .cal_item.title, " +
".cal_item.custom_IPCREATION_nietfact {" +
  "border: #25C16F;background-color: #25C16F;" +
"}" +

".cal_item.custom_Not_Available > .cal_item.title, " +
".cal_item.custom_Not_Available {" +
  "border: gray;background-color: gray;" +
"}" +
".cal_item.custom_Non_bill_niet_fact > .cal_item.title, " +
".cal_item.custom_Non_bill_niet_fact {" +
  "border: #D64541;background-color: #D64541;" +
"}" +
"";
(function() {  'use strict'; document.getElementsByClassName("navbar-brand")[0].innerHTML = 'Prato Timesheets'; document.querySelectorAll("[class*='cal_item body']").forEach(el => {  if(el.getElementsByTagName('div')[0].getElementsByTagName('span')[2]) el.innerHTML = el.getElementsByTagName('div')[0].getElementsByTagName('span')[2].innerHTML });//Set Fontvar f = document.createElement('link');f.setAttribute('href',"https://fonts.googleapis.com/css?family=Roboto");f.setAttribute('rel',"stylesheet");(document.head || document.documentElement).appendChild(f);//Set stylesheetvar s = document.createElement('style');s.type = "text/css";s.innerHTML = styleSheet;(document.head || document.documentElement).appendChild(s);//Remove footer$("#cal_week").height($("footer > nav").offset().top);$(document).attr("title", "Prato TimeSheets");//Change faviconvar link = document.querySelector("link[rel*='icon']") || document.createElement('link');link.type = 'image/x-icon';link.rel = 'shortcut icon';link.href = 'https://media.licdn.com/dms/image/C560BAQE9RqmFlB0w3Q/company-logo_200_200/0?e=1544659200&v=beta&t=0gBSnfAIPrHHVf0CwIbeIoaI1iiJMWX8cbE9B-m0Lp4';document.getElementsByTagName('head')[0].appendChild(link); //Add buttons $( "#dialogs" ).on( "dialogopen", function( event, ui ) { window.setTimeout(function(){    //Hide travel stuff    $('#TravelFee').parent().parent().css("display","none");    //Hide Job    $('#Job_No').parent().parent().css("display","none");    //Hide nav tabs    $('.nav-tabs').css("display","none");    for(var prop in window.buttons) {        let buttonDeclaration = window.buttons[prop];        let $input = $('<input type="button" id="'+prop+'" value="'+buttonDeclaration.ButtonText+'" class="ui-button ui-corner-all ui-widget" style="margin:10px !important;" />');        $input.appendTo($("#dialogs"));        $input.on('click', function(){window.fillInDialog(buttonDeclaration)});    };},100);});window.fillInDialog = function(buttonDefinition){for(var prop in buttonDefinition) {        if(prop !== 'save' && prop !== 'ButtonText'){            window.fillInField(prop,buttonDefinition[prop]);        }    };void(0);};window.fillInField = function(field,value){document.getElementById(field).focus();document.getElementById(field).value=value;document.getElementById(field).blur();};})();