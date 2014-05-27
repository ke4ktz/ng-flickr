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

###Prerequisites

####Angular Services
Each method in the service utilizes the `$q` and `$http` services to call
the Flickr API web services and return a promise to the caller.  These services
must be available to the `ng-flickr` service.

####API Key

Before getting started, you will need to sign up for a developer API key
from Flickr.  This key is needed each time the Flickr API key is called.

####Flickr User ID

To obtain access to just your photos, you will need to obtain your internal
user ID from Flickr.  To locate your internal user ID, log in to Flickr and
go to one of the Flickr API Explorer pages, like the
[flickr.photosets.getList](https://www.flickr.com/services/api/explore/flickr.photosets.getList)
page.  Your user ID will be listed in the column on the right side.

###Setup

The first step is to inject the `ng-flickr` service into your view controller:

```JavaScript
angular.module('app').controller('photo', ['ng-flickr', function(flickr) {
    // TODO Controller processing goes here
}]);
```

The second step is to call the `ng-flickr` initializer to set up the service
with your API key and user ID:

```JavaScript
var apiKey = '<REPLACE_WITH_YOUR_API_KEY>';
var userId = '<YOUR_USER_ID>';

flickr.init(apiKey, userId);
```

Sample Usage
------------

```JavaScript
angular.module('app').controller('photo', ['ng-flickr', function(flickr) {

    var apiKey = '<REPLACE_WITH_YOUR_API_KEY>';
    var userId = '<YOUR_USER_ID>';

    var vm = this;
    vm.photoSets = [];

    flickr.init(apiKey, userId);

    ng-flickr.getPhotoSets('url_s')
        .then(function(data) {
            vm.photoSets = data;
    });

}]);
```

```HTML
<section id="photo-view" data-ng-controller="photos as vm">
    <div class="padd list-flow fader-animation" data-ng-repeat="p in vm.photoSets">
        <img ng-src="{{p.primary_photo_extras.url_s}}"></img>
        <h4>{{p.title._content}}</h4>
    </div>
</section>
```
