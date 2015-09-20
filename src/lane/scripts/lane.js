angular.module('scrumanger.lane').directive('lane', function ($templateCache) {
    return {
        require: '^board',
        restrict: 'E',
        scope: {
            title: '@',
            status: '@'
        },
        controller: 'LaneController',
        controllerAs: 'Lane',
        bindToController: true,
        template: $templateCache.get('lane/views/lane.html'),
        link: function(scope, element, attrs, BoardController){
            // workaround, TODO: figure out why this setup isn't working as intended
            scope.Board = BoardController;
        }
    };
});