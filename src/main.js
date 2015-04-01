/* global _ */

(function() {
  'use strict';

  angular
    .module('retro', ['retro-board'])
    .directive('app', App);

    function App() {
      return {
        controller: AppController,
        controllerAs: 'vm',
        templateUrl: '/main.html'
      };
    }

    function DialogController($scope, $mdDialog) {
      $scope.answer = function(answer) {
        $mdDialog.hide();
      }
    }

    function AppController($mdSidenav, $mdDialog, retroBoardService) {
      this.boards = retroBoardService.boards;
      this.alert = '';

      this.viewCard = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: '/dialog.template.html',
          targetEvent: ev
        })
      };

      this.addBoard = function(name) {
        retroBoardService.add({
          name: name,
          users: [],
          cardsToDiscuss: [],
          cardsDiscussed: []
        });
        this.newBoardName = '';
      };

      this.openSidebar = function() {
        $mdSidenav('left').open();
      };

      this.openBoard = function(board) {
        $mdSidenav('left').close();
        this.activeBoard = board;
      };

      this.updateBoard = function(board) {
        this.boards.$save(board);
      };
    }

    AppController.$inject = ['$mdSidenav', '$mdDialog', 'retroBoardService'];
    DialogController.$inject = ['$scope', '$mdDialog'];
}());

