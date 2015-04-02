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

    function RetroBoardController($state, retroBoardService, retroCardListService) {
      var vm = this;

      vm.board = retroBoardService.get($state.params.id);
      vm.cards = retroCardListService.get(vm.board);

      vm.toDiscussCardTitle = '';
      vm.addToDiscussCard = function(cardTitle) {
        vm.board.addCard(cardTitle);
        vm.toDiscussCardTitle = '';
      };

      vm.newUsername = '';

      vm.addUser = function (name) {
        vm.board.addUser(name);
        vm.newUsername = '';
      };

      vm.removeUser = function (name) {
        vm.board.removeUser(name);
      };
    }

    RetroBoardController.$inject = ['$state', 'retroBoardService', 'retroCardListService'];
}());

