/**
 * Created by davidbagno on 11/22/13.
 */
function doLearn(x){
switch(x)
{
    case "1":
        window.alert('1');
        break;

}
}

function hideByClassName(classname) {

    var l = document.getElementsByClassName(classname).length;
    try {
    for (var i = 0; i < l; i++) {document.getElementsByClassName(classname)[i].style.display = "none";}
    }
    catch (err) {
        window.alert(err.toString());
    }

}
function clearToolButtons() {
    var activeButton = "ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a ui-btn-active";
    var l = document.getElementsByClassName(activeButton).length;
    try {


        for (var i = 0; i < l; i++) {

            document.getElementsByClassName(activeButton)[i].className = "ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a";

        }
    }
    catch (err) {
        window.alert(err.toString());
    }

}
function loadDiv(pageurl,divid) {
    $.get(pageurl, function (retData) { $("#" + divid).append(retData); $("#" + divid).trigger('create'); });

}

function loadPage(id, url) {
    var req = false;
    // For Safari, Firefox, and other non-MS browsers
    if (window.XMLHttpRequest) {
        try {
            req = new XMLHttpRequest();
        } catch (e) {
            req = false;
        }
    } else if (window.ActiveXObject) {
        // For Internet Explorer on Windows
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                req = false;
            }
        }
    }
    var element = document.getElementById(id);
    if (!element) {
        alert("Bad id " + id +
            "passed to loadPage." +
            "You need a div or span element " +
            "with this id in your page.");
        return;
    }
    if (req) {
        // Synchronous request, wait till we have it all
        req.open('GET', url, false);
        req.send(null);
        element.innerHTML = req.responseText;
    } else {
        element.innerHTML =
            "Sorry, your browser does not support " +
                "XMLHTTPRequest objects. This page requires " +
                "Internet Explorer 5 or better for Windows, " +
                "or Firefox for any system, or Safari. Other " +
                "compatible browsers may also exist.";
    }
}