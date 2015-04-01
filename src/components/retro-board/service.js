/* global Firebase */

(function() {
  'use strict';

  angular
    .module('retro-board.service', ['firebase'])
    .service('retroBoardService', RetroBoardService);

  function RetroBoardService($firebaseArray) {
    var
      _this = this,
      baseUrl = 'https://drivecurrent-retrospectives.firebaseio.com/',
      ref = new Firebase(baseUrl + 'boards/');

    this.boards = $firebaseArray(ref);

    this.add = function(board) {
      _this.boards.$add(board);
    };

  }

  RetroBoardService.$inject = ['$firebaseArray'];
}());

