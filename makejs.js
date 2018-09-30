"use strict";

var fs = require('fs');

var manifest = JSON.parse(fs.readFileSync('manifest.json'));

var header = "" +
"\"use strict\";\n" +
"\n" +
"// ==UserScript==\n" +
"// @name        " + manifest["name"] + "\n" +
"// @namespace   " + manifest["homepage_url"] + "\n" +
"// @description " + manifest["description"] + "\n" +
"// @author      " + manifest["author"] + "\n" +
"// @copyright   2018+, " + manifest["author"] + " (" + manifest["homepage_url"] + ")\n" +
"// @license     " + manifest["licenses"][0].type + "; " + manifest["licenses"][0].url + "\n" +
"// @version     " + manifest["version"] + "\n" +
"// @icon        " + manifest["homepage_url"] + "/raw/master/icon.png\n" +
"// @homepageURL " + manifest["homepage_url"] + "\n" +
"// @supportURL  " + manifest["homepage_url"] + "/issues\n" +
"// @match       https://timesheets.scapta365.com/*/prato/Registration/WeekOverview/* \n" +
"// @grant       none\n" +
"// ==/UserScript==\n" +
"\n";

var styleSheetFile = fs.readFileSync('prato-timesheet-enhancer.css');
var lines = styleSheetFile.toString().split("\n");
var stylesheet = "var styleSheet = \"\" +\n";
for (var i = 0; i < lines.length; i++) {
	if (lines[i] !== "") {
		lines[i] = lines[i].replace(/^( *)([^\/])/, "$1\"$2");
		if (!lines[i].match(/^ *\/\*/)) lines[i] = lines[i].replace(/( *\/\*[^\*]*\*\/)?$/, "\" +$1");
		lines[i] = lines[i].replace(/\/\*(.*)\*\/$/, "//$1").replace(/ +$/, "");
		stylesheet += lines[i];
	}
	stylesheet += "\n";
}
stylesheet += "\"\";\n";

var javascriptFile = fs.readFileSync('prato-timesheet-enhancer.js');
lines = javascriptFile.toString().split("\n");
var javascript = "";
for (var i = 0; i < lines.length; i++) {
	if (lines[i] !== "") {
		javascript += lines[i];
	}
}

fs.writeFileSync("build/prato-timesheet-enhancer.user.js", header + stylesheet + javascript);