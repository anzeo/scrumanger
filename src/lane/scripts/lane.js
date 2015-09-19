angular.module('scrumanger.lane').directive('lane', function($templateCache){
   return {
     restrict: 'E',
       scope: {
           title: '@'
       },
       controller: 'LaneController',
       controllerAs: 'Lane',
       bindToController: true,
       template: $templateCache.get('lane/views/lane.html')
   };
});