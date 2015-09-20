angular.module('scrumanger.sprint').controller('SprintController', function($scope, AppService, activeSprint){
    var controller = this;
    controller.active = activeSprint;

    $scope.$watch(function(){
        return JSON.stringify(controller.active);
    }, function(newValue, oldValue){
        if(oldValue && oldValue !== newValue){
            AppService.put(controller.active._links.self, controller.active);
        }
    })
});