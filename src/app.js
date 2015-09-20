angular.module('scrumanger', ['ngMaterial', 'ui.router', 'scrumanger.board', 'scrumanger.lane', 'scrumanger.sprint']).config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/sprint');

    $stateProvider.state('sprint', {
        url: '/sprint',
        controller: 'SprintController',
        controllerAs: 'Sprint',
        resolve: {
            activeSprint: function(){
                return {
                    nr: 1,
                    tasks: [
                        new Task('Eat', 'done'),
                        new Task('Sleep'),
                        new Task('Rave', 'doing'),
                        new Task('Repeat')
                    ]
                };

                function Task(title, status){
                    var task = this;

                    task.title = title;
                    task.status = status || 'todo';
                }
            }
        },
        templateProvider: function ($templateCache) {
            return $templateCache.get('sprint/views/sprint.html');
        }
    });
});