angular.module('scrumanger.components.lane').controller('LaneController', function(){
    var controller = this;
    controller.moveTask = moveTask;

    function moveTask(event, index, task){
        task.status = controller.status;
        return task;
    }
});