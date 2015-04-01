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

    function AppController($mdSidenav, retroBoardListService, retroBoardService) {
      this.boards = retroBoardListService;

      this.addBoard = function(name) {
        retroBoardListService.add(name);
        this.newBoardName = '';
      };

      this.openSidebar = function() {
        $mdSidenav('left').open();
      };

      this.openBoard = function(board) {
        $mdSidenav('left').close();
        this.activeBoard = retroBoardService.get(board.key);
      };

      this.updateBoard = function(board) {
        this.boards.$save(board);
      };
    }

    AppController.$inject = ['$mdSidenav', 'retroBoardListService', 'retroBoardService'];
}());

