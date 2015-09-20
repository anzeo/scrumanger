angular.module('scrumanger.ticket').directive('ticket', function($templateCache){
   return {
       restrict: 'E',
       require: '^lane',
       scope: {
           title: '@'
       },
       controller: 'TicketController',
       controllerAs: 'Ticket',
       bindToController: true,
       template: $templateCache.get('ticket/views/ticket.html'),
       link: function (scope, element, attrs, LaneController) {}
   }
});