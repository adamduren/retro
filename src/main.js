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

    function AppController($mdSidenav, $mdDialog, retroBoardService) {
      this.boards = retroBoardService.boards;
      this.alert = '';

      this.viewCard = function(ev) {
        $mdDialog.show(
          $mdDialog.alert()
            .title('Title')
            .content('Content here.')
            .ok('Done')
            .targetEvent(ev)
        );
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
}());

