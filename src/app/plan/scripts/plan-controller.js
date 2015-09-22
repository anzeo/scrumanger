angular.module('scrumanger.plan').controller('PlanController', function($scope, $state, AppService, AppFactory, plan){
    var controller = this;

    controller.addSprint = addSprint;
    controller.closeSprint = closeSprint;
    controller.startSprint = startSprint;

    controller.plan = plan;

    $scope.$watch(function(){
        return JSON.stringify(controller.plan);
    }, function(newValue, oldValue){
        if(oldValue && oldValue !== newValue){
            savePlan();
        }
    });

    function savePlan(){
        AppService.put(controller.plan._links.self, controller.plan);
    }

    function addSprint(){
        AppService.post(controller.plan._links.addSprint, {
            nr: controller.plan._embedded.sprints.length +1
        }).then(function(sprint){
            controller.plan._embedded.sprints.push(sprint);
        });
    }

    function closeSprint(sprint){
        sprint.isActive = false;
        sprint.isClosed = true;

        var finishedTasks = sprint.tasks.filter(function(task){
            return task.status === 'done';
        });
        var unfinishedTasks = sprint.tasks.filter(function(task){
           return task.status !== 'done';
        });

        sprint.tasks = finishedTasks;

        controller.plan.backlog = controller.plan.backlog.concat(unfinishedTasks);

        AppService.setActiveSprint();
    }

    function startSprint(sprint){
        sprint.isActive = true;
        savePlan();

        AppService.setActiveSprint(sprint._links.self).then(function(){
            $state.go("main.sprint");
        });
    }
});