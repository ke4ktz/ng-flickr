(function() {
    'use strict';

    angular.module('app').factory('ng-flickr', ['$q', '$http', flickr]);

    function flickr($q, $http) {
        var urlBase = 'https://api.flickr.com/services/rest/';
        var configParms ={
        	format: 'json',
        	jsoncallback: 'JSON_CALLBACK'
        };

        return {
            init: init,
            getPhotoSets: getPhotoSets,
            getPhotos: getPhotos
        };

        function init(api_key, user_id) {
            configParms.api_key = api_key;
            configParms.user_id = user_id;
        }

        function getPhotoSets(extras) {
            var deferred = $q.defer();

            var parms = configParms;
            parms.method = 'flickr.photosets.getList';
            parms.primary_photo_extras = extras;

            $http.jsonp(urlBase, { params: parms })
                .success(function(data, status, headers, config) {
                    deferred.resolve(data.photosets.photoset);
                })
                .error(function(data, status, headers, config, statusText) {
                    deferred.reject(statusText);
                });

            return deferred.promise;
        }

        function getPhotos(extras) {
            var deferred = $q.defer();

            var parms = configParms;
            parms.method = 'flickr.photosets.getPhotos';
            parms.extras = extras;
            parms.privacy_filter = '1';

            $http.jsonp(urlBase, { params: parms })
                .success(function(data, status, headers, config) {
                    deferred.resolve(data.photoset.photo);
                })
                .error(function(data, status, headers, config, statusText) {
                    deferred.reject(statusText);
                });

            return deferred.promise;
        }
    }
})();
