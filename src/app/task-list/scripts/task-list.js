angular.module('scrumanger.taskList').directive('taskList', function($templateCache){
    return {
        restrict: 'E',
        scope: {
            list: '=',
            title: '@'
        },
        controller: 'TaskListController',
        controllerAs: 'TaskList',
        bindToController: true,
        template: $templateCache.get('task-list/views/task-list.html')
    };
});