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
        scope: {
          data: '='
        }
      };
    }

    function RetroBoardController() {
      this.attendees = [
        {
          name: 'Adam',
          isDone: false,
        },
        {
          name: 'Duane',
          isDone: true,
        },
        {
          name: 'Oz',
          isDone: false,
        }
      ];
    }
}());
