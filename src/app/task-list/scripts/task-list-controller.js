angular.module('scrumanger.taskList').controller('TaskListController', function($mdDialog, AppFactory){
    var controller = this;
    controller.addTask = addTask;

    function addTask(){
        $mdDialog.show({
            controller: 'AddTaskDialogController',
            controllerAs: 'AddTaskDialog',
            templateUrl: 'task-list/views/add-task.html',
            clickOutsideToClose:true
        }).then(function(taskName){
            controller.list.push(AppFactory.createTask(taskName));
        });
    }
});