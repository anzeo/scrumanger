angular.module('scrumanger').factory('AppService', function($window, $q){

    return {
        get: get,
        post: post,
        put: post
    };

    function get(url){
        var deferred = $q.defer();

        deferred.resolve(JSON.parse($window.localStorage.getItem(url)));

        return deferred.promise;
    }

    function post(url, body){
        var deferred = $q.defer();
        $window.localStorage.setItem(url, JSON.stringify(body));
        deferred.resolve(body);
        return deferred.promise;
    }

});