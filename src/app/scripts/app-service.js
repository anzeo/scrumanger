angular.module('scrumanger').factory('AppService', function ($window, $q) {

    return {
        get: get,
        post: post,
        put: post
    };

    function get(url) {
        var deferred = $q.defer();

        var item = JSON.parse($window.localStorage.getItem(url));

        if (item._embedded && item._embedded.sprints){
            var sprintPromises = [];
            item._embedded.sprints.forEach(function(sprint, index, array){
                sprintPromises.push(get(sprint._links.self).then(function(data){
                    array[index] = data;
                }));
            });
            $q.all(sprintPromises).then(function(){
                deferred.resolve(item);
            });
        } else {
            deferred.resolve(item);
        }

        return deferred.promise;
    }

    function post(url, body) {
        var deferred = $q.defer();

        $window.localStorage.setItem(url, JSON.stringify(body));
        if (body._embedded && body._embedded.sprints) {
            var sprintPromises = [];
            body._embedded.sprints.forEach(function (sprint) {
                sprintPromises.push(post(sprint._links.self, sprint));
            });
            $q.all(sprintPromises).then(function () {
                deferred.resolve(body);
            });
        } else {
            deferred.resolve(body);
        }

        return deferred.promise;
    }
});