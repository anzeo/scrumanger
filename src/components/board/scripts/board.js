angular.module('scrumanger.components.board').directive('board', function($templateCache){

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            sprintNr: '@',
            tasks: '='
        },
        controller: 'BoardController',
        controllerAs: 'Board',
        bindToController: true,
        template: $templateCache.get('board/views/board.html')
    };
});