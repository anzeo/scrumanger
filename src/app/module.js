angular.module('scrumanger', ['ngMaterial', 'ui.router', 'scrumanger.components', 'scrumanger.templates', 'scrumanger.sprint']).config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('main', {
            url: '/',
            controller: 'AppController',
            controllerAs: 'App',
            resolve: {
                root: function(AppService){
                    return AppService.get('api/root');
                }
            },
            templateProvider: function($templateCache){
                return $templateCache.get('views/app.html');
            }
        })
        .state('main.sprint', {
            url: 'sprint',
            controller: 'SprintController',
            controllerAs: 'Sprint',
            resolve: {
                activeSprint: function (AppService, root) {
                    return AppService.get(root._links.sprint);
                }
            },
            templateProvider: function ($templateCache) {
                return $templateCache.get('sprint/views/sprint.html');
            }
        });
}).run(function(){
    var scrumangerVersion = 2;
    if(parseInt(window.localStorage.getItem('scrumanger.version')) === scrumangerVersion){
        return;
    }

    // set up root
    var root = {
        _links: {
            sprint: 'api/sprint/1'
        }
    };
    window.localStorage.setItem('api/root', JSON.stringify(root));

    // set up active sprint
    var activeSprint = {
        nr: 1,
        tasks: [
            new Task('Eat', 'done'),
            new Task('Sleep'),
            new Task('Rave', 'doing'),
            new Task('Repeat')
        ]
    };

    function Task(title, status) {
        var task = this;

        task.title = title;
        task.status = status || 'todo';
    }

    window.localStorage.setItem('api/sprint/1', JSON.stringify(activeSprint));

    // write version
    window.localStorage.setItem('scrumanger.version', scrumangerVersion);
});