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
    }

    RetroBoardController.$inject = ['$state', 'retroBoardService', 'cardList'];
}());

