(function() {
  'use strict';

  angular
    .module('retro', ['retro-board'])
    .controller('MainController', MainController);

    function MainController($scope, $mdSidenav, boardService) {
      $scope.toggleLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

      $scope.boards = [];

      $scope.addBoard = function(name) {
        $scope.boards.push({name: name});
        $scope.newBoardName = '';
      };

      $scope.openBoard = function(board) {
        $scope.toggleLeftMenu();
        $scope.activeBoard = board;
      };

    }

    MainController.$inject = ['$scope', '$mdSidenav'];
}());

