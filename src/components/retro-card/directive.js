/* global angular */

(function () {
    'use strict';

    angular.module('retro-card.directive', ['retro-board', 'edit-in-place'])
        .directive('retroCard', RetroCard);

    function RetroCard () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/components/retro-card/template.html',
            bindToController: true,
            controller: RetroCardController,
            controllerAs: 'vm',
            require: ['retroCard', '^retroBoard'],
            link: RetroCardLink,
            scope: {
              card: '='
            }
        };
    }

    RetroCard.$inject = [];

    function RetroCardController($mdDialog) {
      var _this = this;

      this.voted = false;
      this.toggleVote = function() {
          if (_this.voted) {
              _this.card.votes -= 1;
          } else {
              _this.card.votes+= 1;
          }

          _this.voted = !_this.voted;
      };

      this.viewCard = function(card) {
        $mdDialog.show({
          controller: RetroCardDialogController,
          controllerAs: 'vm',
          bindToController: true,
          locals: {
            card: card
          },
          templateUrl: '/components/retro-card/dialog.html',
        });
      };
    }

    RetroCardController.$inject = ['$mdDialog'];

    function RetroCardLink($scope, $elem, $attrs, controllers) {
      var retroCard = controllers[0],
          retroBoard = controllers[1];

      retroCard.removeCard = function() {
        retroBoard.removeCard(retroCard.card);
      };

      $scope.$watch('vm.card', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          newValue.$save();
        }
      }, true);
    }

    function RetroCardDialogController($mdDialog) {
      this.close = function(action) {
        if (action === 'discussed') {
            this.card.status = action;
            this.card.$save();
        }
        $mdDialog.hide();
      };
    }
})();
