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

    function RetroBoardController($state, $mdDialog, retroBoardService, retroCardListService) {
      var vm = this;

      vm.board = retroBoardService.get($state.params.id);
      vm.cards = retroCardListService.get(vm.board);
      vm.toDiscussCardTitle = '';
      vm.newUsername = '';

      vm.addToDiscussCard = function(cardTitle) {
        vm.board.addCard(cardTitle);
        vm.toDiscussCardTitle = '';
      };

      vm.addUser = function (name) {
        vm.board.addUser(name);
        vm.newUsername = '';
      };

      vm.removeUser = function (name) {
        vm.board.removeUser(name);
      };
    }

    RetroBoardController.$inject = ['$state', '$mdDialog', 'retroBoardService', 'retroCardListService'];
}());

