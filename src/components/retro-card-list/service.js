/* global angular, Firebase */

(function() {
  'use strict';

  var baseUrl = 'https://drivecurrent-retrospectives.firebaseio.com/';

  angular
    .module('retro-card-list.service', ['firebase', 'retro-board'])
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
          status: 'toDiscuss',
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

  function RetroCardListService($firebaseArray, $firebaseObject) {
    var CardListFactory;

    CardListFactory = $firebaseArray.$extend({
      $$added: function(snapshot) {
        var ref = new Firebase(baseUrl + 'cards_data/' + snapshot.val());
        return $firebaseObject(ref);
      },
      $$updated: function(snapshot) {
        return false;
      }
    });

    return {
      get: function(board) {
        var cards = board.$ref().child('cards');
        return new CardListFactory(cards);
      }
    };
  }

  RetroCardListService.$inject = ['$firebaseArray', '$firebaseObject'];
}());