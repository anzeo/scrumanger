angular.module('scrumanger.board').directive('board', function($templateCache){

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            sprint: '@'
        },
        controller: 'BoardController',
        controllerAs: 'Board',
        bindToController: true,
        template: $templateCache.get('board/views/board.html')
    };
});