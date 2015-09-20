angular.module('scrumanger').controller('AppController', function(root, $location){
    this.root = root;

    $location.path(root)
});