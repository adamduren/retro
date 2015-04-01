/* global angular */

(function () {
  'use strict';

  angular
    .module('retro-card-list.directive', ['retro.firebase'])
    .directive('retroCardList', RetroCardList);

  function RetroCardList() {
    return {
      restrict: 'E',
      templateUrl: '/components/retro-card-list/template.html',
      bindToController: true,
      controller: RetroCardListController,
      controllerAs: 'vm',
      scope: {
        cardList: '=ref'
      }
    };
  }

  RetroCardList.$inject = [];

  function RetroCardListController() {
    var vm = this;

    vm.updateCard = function(card) {
      vm.cardList.$save(card);
    };
  }

  RetroCardListController.$inject = [];
})();


