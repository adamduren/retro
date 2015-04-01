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

    function AppController($mdSidenav, retroBoardService) {

      this.toggleLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

      this.boards = retroBoardService.boards;

      this.addBoard = function(name) {
        retroBoardService.add({
          name: name,
          users: [],
          cardsToDiscuss: [],
          cardsDiscussed: []
        });
        this.newBoardName = '';
      };

      this.openBoard = function(board) {
        this.toggleLeftMenu();
        this.activeBoard = board;
      };

      this.updateBoard = function(board) {
        this.boards.$save(board);
      };
    }

    AppController.$inject = ['$mdSidenav', 'retroBoardService'];
}());

