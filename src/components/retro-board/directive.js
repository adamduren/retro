/* global _, angular */

(function() {
  'use strict';

  angular
    .module('retro-board.directive', [])
    .directive('retroBoard', RetroBoard);

    function RetroBoard() {
      return {
        controller: RetroBoardController,
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: '/components/retro-board/template.html',
        scope: true
      };
    }

    function RetroBoardController($state, retroBoardService, cardList) {
      var vm = this;

      vm.board = retroBoardService.get($state.params.id);
      vm.cardsToDiscussRef = cardList(vm.board.$id, 'toDiscuss');
      vm.cardsDiscussedRef = cardList(vm.board.$id, 'discussed');

      vm.addNewToDiscussCard = function() {
        vm.cardsToDiscussRef.$add({
          content: '',
          numVotes: 0
        });
      };

      this.newUsername = '';

      this.addUser = function (name) {
        this.board.addUser(name);
        this.newUsername = '';
      };

      this.removeUser = function (name) {
        this.board.removeUser(name);
      };
    }

    RetroBoardController.$inject = ['$state', 'retroBoardService', 'cardList'];
}());

