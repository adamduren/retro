(function() {
  'use strict';

  angular
    .module('retro', ['retro-board'])
    .controller('MainController', MainController);

    function MainController($scope, $mdSidenav) {
      $scope.toggleLeftMenu = function() {
        $mdSidenav('left').toggle();
      };
    }

    MainController.$inject = ['$scope', '$mdSidenav'];
}());

