/* global Firebase, angular */

(function() {
  'use strict';

  var baseUrl = 'https://drivecurrent-retrospectives.firebaseio.com/';

  angular
    .module('retro-board.service', ['firebase', 'retro-card-list'])
    .factory('retroBoardService', RetroBoardService)
    .factory('retroBoardListService', RetroBoardListService);


  function RetroBoardService($firebaseObject, $firebaseArray, retroCardService) {
    var self, BoardFactory;

    BoardFactory = $firebaseObject.$extend({
      addUser: function(name) {
        this.users = this.users || {};

        if (!this.users[name]) {
          this.users[name] = {
            name: name,
            isDone: false,
          };
          this.$save();
        }
      },
      removeUser: function(user) {
        this.users = this.users || {};
        delete this.users[user.name];
        this.$save();
      },
      addCard: function(cardTitle) {
        var self = this;
        self.cards = this.cards || [];
        retroCardService.add(cardTitle).then(function(ref) {
          self.cards.push(ref.key());
          self.$save();
        });
      },
      removeCard: function(card) {
        this.cards = _.without(this.cards || [], card.$id);
        this.$save();

        retroCardService.remove(card);
      }
    });

    function getBoardRef(key) {
      var
        ref = new Firebase(baseUrl + 'boards_data/' + key),
        board = new BoardFactory(ref);
      return board;
    }

    self = {
      add: function(key) {
        var board = getBoardRef(key);

        if (!board.name) {
          board.name = key;
          board.$save();
        }

        return board.$id;
      },
      get: function(key) {
        return getBoardRef(key);
      }
    };

    return self;
  }

  RetroBoardService.$inject = ['$firebaseObject', '$firebaseArray', 'retroCardService'];

  function RetroBoardListService($firebaseArray, RetroBoardService) {
    var ref, RetroBoardList, service;

    ref = new Firebase(baseUrl + 'boards_list/');

    RetroBoardList = $firebaseArray.$extend({
      add: function(name) {
        this.$add({
          key: RetroBoardService.add(name),
          name: name
        });
      }
    });

    service = new RetroBoardList(ref);

    return service;

  }

  RetroBoardListService.$inject = ['$firebaseArray', 'retroBoardService'];
}());

