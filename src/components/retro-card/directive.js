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
                data: '='
            }
        };
    }

    RetroCard.$inject = [];

    function RetroCardController() {
        var _this = this;

        _.defaults(this.data, {
            content: 'Placeholder',
            numVotes: 0
        });

        this.voted = false;
        this.editing = false;

        this.toggleVote = function() {
            if (_this.voted) {
                _this.data.numVotes -= 1;
            } else {
                _this.data.numVotes += 1;
            }

            _this.voted = !_this.voted;
        };
    }

    RetroCardController.$inject = [];

    function RetroCardLink($scope, $elem, $attrs, retroCardList) {
        $scope.$watch('vm.data', function (data) {
            retroCardList.updateCard(data);
        }, true);
    }
})();
