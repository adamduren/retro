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
        require: '^app',
        bindToController: true,
        templateUrl: '/components/retro-board/template.html',
        scope: {
          data: '='
        },
        link: RetroBoardLink
      };
    }

    function RetroBoardController() {
      this.newUsername = '';

      this.addUser = function(name) {
        this.data.addUser(name);
        this.newUsername = '';
      };

      this.removeUser = function(name) {
        this.data.removeUser(name);
      };

    }

    function RetroBoardLink(scope, element, attrs, app) {
      scope.$watch('vm.data', function(newValue, oldValue) {
        // Don't save if it's not yet initialized
        // or if this is the first initialization
        if (oldValue === undefined || newValue === undefined) {
          return;
        }

        app.updateBoard(newValue);
      }, true);
    }
}());

