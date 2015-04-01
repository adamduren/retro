/* global angular */

(function () {
    'use strict';

    angular
        .module('retro-card-list.directive', ['retro.firebase'])
        .directive('retroCardList', RetroCardList);

    function RetroCardList() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/components/retro-card-list/template.html',
            bindToController: true,
            controller: RetroCardListController,
            controllerAs: 'vm'
        };
    }

    RetroCardList.$inject = [];

    function RetroCardListController(cards) {
        var _this = this;
        _this.cardList = cards;

        _this.updateCard = function(card) {
            _this.cardList.$save(card);
        };

        _this.addNewCard = function() {
            cards.$add({
                content: '',
                numVotes: 0
            });
        };
    }

    RetroCardListController.$inject = ['cards'];
})();


