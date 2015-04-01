/* global _ */

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
        scope: true,
        link: RetroBoardLink
      };
    }

    function RetroBoardController($state) {
      this.boardId = $state.params.id;
      console.log(this.boardId)
    }

    RetroBoardController.$inject = ['$state'];

    function RetroBoardLink(scope, element, attrs, app) {

    }
}());

