angular.module('scrumanger.taskList').directive('taskList', function($templateCache){
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            list: '=',
            title: '@',
            disableAdd: '&'
        },
        controller: 'TaskListController',
        controllerAs: 'TaskList',
        bindToController: true,
        template: $templateCache.get('task-list/views/task-list.html')
    };
});