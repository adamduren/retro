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

    function DialogController($mdDialog) {
      this.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }

    function AppController($mdSidenav, $mdDialog, retroBoardService) {
      this.boards = retroBoardService.boards;

      this.activeCard = {
        name: 'My Card',
        description: 'Something about the card',
        actionItems: 'We should do this',
        status: 'Discussed',
      };

      this.viewCard = function() {
        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'vm',
          bindToController: true,
          locals: {
            card: this.activeCard
          },
          templateUrl: '/dialog.template.html',
        })
        .then(function(data) {
          console.log(data);
        });
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
    DialogController.$inject = ['$mdDialog'];
}());

