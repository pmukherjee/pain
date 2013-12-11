/**
 * Created by Daniel Streicher on 12/5/13.
 */

const oAuthURI = "https://hadev.agilexhealth.com:8443/ssoeproxy/veteran/authorize?response_type=code&state=stateId&client_id=MobileBlueButton&redirect_uri=https://hadev.agilexhealth.com:8443/MobileHealthPlatformWeb/oauthtoken?original_redirect_uri%3Dhttp://localhost:63342/jqm-root/index.html&scope=read";
var database = {};

(function ($){
    database.userSession = Backbone.Model.extend( {
       initialize: function() {
           this.url = database.resources.get('public-user-session').get('href');
           this.fetch({async: false});
       },
        isLoggedIn: function() {
            var loggedIn = false,
                mhpUser = this.get('mhpuser');
            if (typeof mhpUser !== 'undefined' && mhpUser) {
                loggedIn = true;
            }
            return loggedIn;
        }
    });

    database.resourceLink = Backbone.Model.extend( {
        defaults: {
            "rel":"external",
            "title":"",
            "href":"",
            "id":""
        },
        initialize: function() {
            this.id = this.get('title');
        }
    });

    database.resources = Backbone.Collection.extend( {
        model: database.resourceLink,
        url: "http://hadev.agilexhealth.com:8080/MobileHealthPlatformWeb/rest/public/resource-directory",
        parse: function(response) {
            return response.link;
        },
        initialize: function() {
            this.fetch({async: false})
        }
    });

    database.painReportSummary = Backbone.Model.extend( {
       initialize: function() {
           this.url = database.resources.get('system-root').get('href') + "patient/" + database.userSession.toJSON().mhpuser.userIdentifier.assigningAuthority + "/" + database.userSession.toJSON().mhpuser.userIdentifier.uniqueId + "/pain-goals/report";
       }
    });

    database.painGoal = Backbone.Model.extend({
        defaults: {
            "name":"",
            "status":"Active",
            "dateStarted":"",
            "targetDate":"",
            "percentComplete":"0",
            "goalType":"Veteran",
            "details":"",
            "nextActionStep":""
        }
    });

    database.painGoalList = Backbone.Collection.extend( {
        model: database.painGoal,
        initialize: function() {
            this.url = database.resources.get('system-root').get('href') + "patient/" + database.userSession.toJSON().mhpuser.userIdentifier.assigningAuthority + "/" + database.userSession.toJSON().mhpuser.userIdentifier.uniqueId + "/pain-goals";
        }
    });

    database.initiate = function() {
        database.resources = new database.resources();
        database.userSession = new database.userSession();
    };
})(jQuery);

$(document).on("pageinit", "#home", function () {
    parseToken();
    database.initiate();
    if (database.userSession.isLoggedIn()) {
        $("#logout").show();
        database.painGoal = new database.painGoal();
        database.painReportSummary = new database.painReportSummary();
        database.painGoalList = new database.painGoalList();
    }
    else {
        $("#logout").hide();
    }
});

$(document).on("pageshow", "#pain-report", function() {
    database.painReportSummary.fetch({async: false});
    $("#pain-report-summary").empty();
    $("#pain-report-summary").append(database.painReportSummary.toJSON().report);
});

$(document).on("pageshow", "#my-goals", function() {
    database.painGoalList.fetch({async: false});
});

function saveGoals() {
    database.painGoal.save([
        {name: $("#create-goals-name").val()},
        {details: $("#create-goals-detail").val()},
        {targetDate: $("#create-goals-date").val()},
        {percentComplete: $("#create-goals-complete").val()}],
        {url: database.resources.get('system-root').get('href') + "patient/" + database.userSession.toJSON().mhpuser.userIdentifier.assigningAuthority + "/" + database.userSession.toJSON().mhpuser.userIdentifier.uniqueId + "/pain-goals"}
    );
    $.mobile.changePage("#my-goals");
}

function cleanSession() {
    window.sessionStorage['token'] = null;
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
            jqXHR.setRequestHeader("Authorization", "");
        }
    )
    document.cookie = encodeURIComponent('JSESSIONID') + "=deleted; expires=" + new Date(0).toUTCString();
}

function userLogin(redirect) {
    if (!database.userSession.isLoggedIn()) {
        window.location = oAuthURI;
    }
    else {
        window.location = redirect;
    }
}

function userLogout() {
    cleanSession();
    window.location = database.resources.get('logout').get('href') + "?redirect_uri=http://localhost:63342/jqm-root/index.html";
}

function parseToken() {
    var params = {},
        queryString = location.search.substring(1),
        regex = /([^&=]+)=([^&]*)/g,
        x;
    while (x = regex.exec(queryString)) {
        params[decodeURIComponent(x[1])] = decodeURIComponent(x[2]);
    }

    var token = params['token'];
    if (typeof token !== 'undefined' && token !== 'undefined' && token !== null && token !== 'null') {
        window.sessionStorage['token']= JSON.stringify(token);
    }
    var tokenObject = window.sessionStorage['token'];
    if (typeof tokenObject !== 'undefined' && tokenObject !== 'undefined' && tokenObject !== null && tokenObject !== 'null') {
        $.ajaxSetup( {
            data: { access_token: JSON.parse(tokenObject)}
        })
        $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
           jqXHR.setRequestHeader("Authorization", "Bearer " + JSON.parse(tokenObject));
        });
    } else {
        cleanSession();
    }

};