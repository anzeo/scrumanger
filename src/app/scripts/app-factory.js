angular.module('scrumanger').factory('AppFactory', function(){

    return {
        createSprint: createSprint,
        createTask: createTask
    };

    function createTask(title, status) {
        return {
            title: title,
            status: status || 'todo'
        };
    }

    function createSprint(nr, tasks, isActive, isClosed){
        if(!nr){
            throw 'Expect a number to be provided when creating a new sprint';
        }
        return {
            nr: nr,
            tasks: tasks || [],
            isActive: isActive || false,
            isClosed: isClosed || false,
            _links: {
                self: 'api/sprint/' + nr
            }
        };
    }
});