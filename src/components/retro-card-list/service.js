/* global angular */

(function() {
  'use strict';

  angular
    .module('retro-card-list.service', ['retro.firebase'])
    .service('cardList', CardListService);

  function CardListService(backEnd, $firebaseArray) {
    var cards = backEnd('cards');
    return function(boardId, node) {
      return $firebaseArray(cards.child(boardId).child(node));
    };
  }

  CardListService.$inject = ['backEnd', '$firebaseArray'];
}());