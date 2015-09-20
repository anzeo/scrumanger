angular.module('scrumanger.ticket').directive('ticket', function($templateCache){
   return {
       restrict: 'E',
       scope: {
           title: '@'
       },
       controller: 'TicketController',
       controllerAs: 'Ticket',
       bindToController: true,
       template: $templateCache.get('ticket/views/ticket.html')
   }
});