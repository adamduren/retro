/* global angular, Firebase */

(function() {
  'use strict';

  var baseUrl = 'https://drivecurrent-retrospectives.firebaseio.com/';

  angular
    .module('retro-card-list.service', ['firebase'])
    .factory('retroCardService', RetroCardService)
    .factory('retroCardListService', RetroCardListService);

  function RetroCardService($firebaseArray) {
    function getCardRef() {
      var ref = new Firebase(baseUrl + 'cards_data/');
      return new $firebaseArray(ref);
    }

    return {
      add: function(cardTitle) {
        var cards = getCardRef();
        return cards.$add({
          title: cardTitle,
          votes: 0
        });
      },
      get: function(key) {
        var cards = getCardRef();
        return cards.$getRecord(key);
      }
    };
  }

  RetroCardService.$inject = ['$firebaseArray'];

  function RetroCardListService() {
    return {
      get: function() {

      }
    };
  }

  RetroCardListService.$inject = [];
}());