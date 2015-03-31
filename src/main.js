/* global _ */

(function() {
  'use strict';

  angular
    .module('retro', ['retro-board'])
    .controller('MainController', MainController);

    function MainController($scope, $mdSidenav, retroBoardService) {
      $scope.toggleLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

      $scope.boards = retroBoardService.boards;

      $scope.addBoard = function(name) {
        retroBoardService.add({
          name: name,
          users: [],
          cardsToDiscuss: [],
          cardsDiscussed: []
        });
        $scope.newBoardName = '';
      };

      $scope.openBoard = function(board) {
        $scope.toggleLeftMenu();
        $scope.activeBoard = board;
      };

    }

    MainController.$inject = ['$scope', '$mdSidenav', 'retroBoardService'];
}());

