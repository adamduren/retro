/* global angular */

(function () {
  'use strict';

  angular
    .module('retro-card-list.directive', [])
    .directive('retroCardList', RetroCardList);

  function RetroCardList() {
    return {
      restrict: 'E',
      templateUrl: '/components/retro-card-list/template.html',
      bindToController: true,
      controller: RetroCardListController,
      controllerAs: 'vm',
      scope: {
        cardList: '=',
        filterExpression: '='
      }
    };
  }

  RetroCardList.$inject = [];

  function RetroCardListController() {

  }

  RetroCardListController.$inject = [];
})();


