(function() {
    'use strict';

    angular.module('app').factory('ng-flickr', ['$q', '$http', flickr]);

    function flickr($q, $http) {
        var urlBase = 'https://api.flickr.com/services/rest/';
        var apiKey = '';
        var userId = '';

        return {
            init: init,
            getPhotoSets: getPhotoSets,
            getPhotos: getPhotos
        };

        function init(api, user) {
            apiKey = api;
            userId = user;
        }

        function getPhotoSets(extras) {
            var deferred = $q.defer();

            var configParam = {
                'method': 'flickr.photosets.getList',
                'api_key': apiKey,
                'user_id': userId,
                'format': 'json',
                'jsoncallback': 'JSON_CALLBACK',
                'primary_photo_extras': extras
            };

            $http.jsonp(urlBase, {
                params: configParam
            }).success(function(data, status, headers, config) {
                deferred.resolve(data.photosets.photoset);
            }).error(function(data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }

        function getPhotos(extras) {
            var deferred = $q.defer();

            var configParam = {
                'method': 'flickr.photosets.getPhotos',
                'api_key': apiKey,
                'photoset_id': setId,
                'format': 'json',
                'jsoncallback': 'JSON_CALLBACK',
                'extras': extras,
                'privacy_filter': '1'
            };

            $http.jsonp(urlBase, {
                params: configParam
            }).success(function(data, status, headers, config) {
                deferred.resolve(data.photoset.photo);
            }).error(function(data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        }
    }
})();
