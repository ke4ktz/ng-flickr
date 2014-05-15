(function() {
    'use strict';

    angular.module('app').factory('ng-flickr', ['$q', '$http', flickr]);

    function flickr($q, $http) {
        var urlBase = 'https://api.flickr.com/services/rest/';

        return {
            getPhotoSets: getPhotoSets,
            getPhotos: getPhotos
        };

        function getPhotoSets(apiKey, userId) {
            var deferred = $q.defer();

            $http.jsonp(urlBase, {
                params: {
                    'method': 'flickr.photosets.getList',
                    'api_key': apiKey,
                    'user_id': userId,
                    'format': 'json',
                    'jsoncallback': 'JSON_CALLBACK',
                    'primary_photo_extras': 'url_s'
                }
            }).success(function(data, status, headers, config) {
                deferred.resolve(data.photosets.photoset);
            }).error(function(data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getPhotos(apiKey, setId) {
            var deferred = $q.defer();

            $http.jsonp(urlBase, {
                params: {
                    'method': 'flickr.photosets.getPhotos',
                    'api_key': apiKey,
                    'photoset_id': setId,
                    'format': 'json',
                    'jsoncallback': 'JSON_CALLBACK',
                    'extras': 'url_s,url_m,url_o',
                    'privacy_filter': '1'
                }
            }).success(function(data, status, headers, config) {
                deferred.resolve(data.photoset.photo);
            }).error(function(data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }
    }
})();
