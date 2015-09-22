angular.module('scrumanger.taskList').controller('AddTaskDialogController', function($mdDialog){

    var controller = this;
    controller.ok = ok;
    controller.cancel = $mdDialog.cancel;

    function ok(){
        $mdDialog.hide(controller.taskName);
    }
});