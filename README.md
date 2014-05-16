Flickr Service for AngularJS
============================

This is an ongoing project to create a service for AngularJS that
will allow easy access to the full Flickr API within an AngularJS
website.  This will allow the developer to implement their own custom
photo gallery while taking advantage of the organization and storage
features of Flickr.

This service was created and tested under AngularJS **1.2.x**.

Manual
------
Before getting started, you will need to sign up for a developer API key
from Flickr.  The API key will be passed to the service on each call.

Each method in the service utilizes the `$q` and `$http` services to call
the Flickr API web services and return a promise to the caller.

Sample Usage
------------

```JavaScript
(function() {
    'use strict';

    angular.module('app').controller('photos', ['ng-flickr', photos]);

    function photos(ng-flickr) {
        var apiKey = '<REPLACE_WITH_YOUR_API_KEY>';
        var userId = '<YOUR_USER_ID>';

        var vm = this;
        vm.photoSets = [];
        vm.title = 'Photos';

        activate();

        function activate() {
            common.activateController([getPhotoSets()], controllerId)
                .then(function() {
                });
        }

        function getPhotoSets() {
            ng-flickr.getPhotoSets(apiKey, userId)
                .then(function(data) {
                    vm.photoSets = data;
                return data;
            });
        }
    }
})();

```

```HTML
<section id="photo-view" class="mainbar" data-ng-controller="photos as vm">
    <section class="matter">
        <div class="container">
            <div class="row-fluid">
                <div class="widget wblue">
                    <div data-cc-widget-header title="{{vm.title}}"></div>
                    <div class="widget-content user">
                        <div class="padd list-flow fader-animation" data-ng-repeat="p in vm.photoSets">
                            <img ng-src="{{p.primary_photo_extras.url_s}}"></img>
                            <h4>{{p.title._content}}</h4>
                        </div>
                    </div>
                    <div class="widget-foot">
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</section>

```
