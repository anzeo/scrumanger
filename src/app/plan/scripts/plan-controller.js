angular.module('scrumanger.plan').controller('PlanController', function($scope, AppService, AppFactory, plan){
    var controller = this;

    controller.addSprint = addSprint;

    controller.plan = plan;

    $scope.$watch(function(){
        return JSON.stringify(controller.plan);
    }, function(newValue, oldValue){
        if(oldValue && oldValue !== newValue){
            AppService.put(controller.plan._links.self, controller.plan);
        }
    });

    function addSprint(){
        AppService.post(controller.plan._links.addSprint, {
            nr: controller.plan._embedded.sprints.length +1
        }).then(function(sprint){
            controller.plan._embedded.sprints.push(sprint);
        });
    }
});