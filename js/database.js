/**
 * Created by Daniel Streicher on 12/5/13.
 */

const oAuthURI = "https://hadev.agilexhealth.com:8443/ssoeproxy/veteran/authorize?response_type=code&state=stateId&client_id=MobileBlueButton&redirect_uri=https://hadev.agilexhealth.com:8443/MobileHealthPlatformWeb/oauthtoken?original_redirect_uri%3Dhttp://localhost:63342/jqm-root/index.html#goals&scope=read";

var userLoggedIn = false;
database = {};

(function ($){
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
            this.fetch({async: false});
        },
        fetch: function(options) {
            options = options || {};
            options.dataType = "xml";
            return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });

    database.initiate = function() {
        database.resources = new database.resources();
    };
})(jQuery);

$(document).on("pageinit", "#home", function () {
    database.initiate();
});

$(document).bind("pagebeforechange", function(e, data) {
    if (typeof data.toPage == "string") {
        var path = $.mobile.path.parseUrl(data.toPage),
            linkOne = /^#my-goals/,
            linkTwo = /^#pain-report/;
        if (path.hash.search(linkOne) !== -1 || path.hash.search(linkTwo) !== -1) {
            if (!userLoggedIn) {
                window.location = oAuthURI;
            }
        }
    }
});