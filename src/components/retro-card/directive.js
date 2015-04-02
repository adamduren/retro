/* global angular */

(function () {
    'use strict';

    angular.module('retro-card.directive', ['retro.firebase'])
        .directive('retroCard', RetroCard);

    function RetroCard () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/components/retro-card/template.html',
            bindToController: true,
            controller: RetroCardController,
            controllerAs: 'vm',
            require: '^retroCardList',
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
        this.editing = false;

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
        })
        .then(function(data) {
          console.log(data);
        });
      };
    }

    RetroCardController.$inject = ['$mdDialog'];

    function RetroCardLink($scope, $elem, $attrs, retroCardList) {
        $scope.$watch('vm.card', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            newValue.$save();
          }
        }, true);
    }

    function RetroCardDialogController($mdDialog) {
      this.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
})();
