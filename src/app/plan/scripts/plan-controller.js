angular.module('scrumanger').controller('PlanController', function($scope, AppService, plan){
    var controller = this;
    controller.plan = plan;

    $scope.$watch(function(){
        return JSON.stringify(controller.plan);
    }, function(newValue, oldValue){
        if(oldValue && oldValue !== newValue){
            AppService.put(controller.plan._links.self, controller.plan);
        }
    });
});