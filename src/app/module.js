angular.module('scrumanger', ['ngMaterial', 'ui.router', 'scrumanger.components', 'scrumanger.templates', 'scrumanger.sprint', 'scrumanger.plan']).config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/sprint');

    $stateProvider
        .state('main', {
            url: '/',
            abstract: true,
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
                    return AppService.get(root._links.activeSprint);
                }
            },
            templateProvider: function ($templateCache) {
                return $templateCache.get('sprint/views/sprint.html');
            }
        })
        .state('main.plan', {
            url: 'plan',
            controller: 'PlanController',
            controllerAs: 'Plan',
            resolve: {
                plan: function(AppService, root){
                    return AppService.get(root._links.plan);
                }
            },
            templateProvider: function($templateCache){
                return $templateCache.get('plan/views/plan.html')
            }
        });
}).run(function(AppFactory){
    var scrumangerVersion = 6;
    if(parseInt(window.localStorage.getItem('scrumanger.version')) === scrumangerVersion){
        return;
    }

    // set up active sprint
    var activeSprint = AppFactory.createSprint(1, [
        AppFactory.createTask('Eat', 'done'),
        AppFactory.createTask('Sleep'),
        AppFactory.createTask('Rave', 'doing'),
        AppFactory.createTask('Repeat')
    ], true);

    // set up product
    var plan = {
        backlog: [AppFactory.createTask('Finish code exercise')],
        _embedded: {
            sprints: [activeSprint]
        },
        _links: {
            self: 'api/plan',
            addSprint: 'api/sprint'
        }
    };

    // set up root
    var root = {
        _links: {
            self: 'api/root',
            activeSprint: activeSprint._links.self,
            plan: plan._links.self
        }
    };

    // clear localStorage
    localStorage.clear();

    // write initial data
    localStorage.setItem(root._links.self, JSON.stringify(root));
    localStorage.setItem(activeSprint._links.self, JSON.stringify(activeSprint));
    localStorage.setItem(plan._links.self, JSON.stringify(plan));

    // write version
    localStorage.setItem('scrumanger.version', scrumangerVersion);
});