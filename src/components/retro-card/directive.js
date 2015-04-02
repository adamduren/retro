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

    function RetroCardController() {
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
    }

    RetroCardController.$inject = [];

    function RetroCardLink($scope, $elem, $attrs, retroCardList) {
        $scope.$watch('vm.card', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            newValue.$save();
          }
        }, true);
    }
})();
