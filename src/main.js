/* global _, angular */

(function() {
  'use strict';

  angular
    .module('retro', ['retro-board', 'ui.router'])
    .config(Config)
    .controller('MainController', MainController);

    function Config($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('boards');

      $stateProvider
        .state('boards', {
          url: '/boards',
          templateUrl: '/main.html',
          controller: 'MainController',
          controllerAs: 'vm'
        })
        .state('boards.view', {
          url: '/:id',
          template: '<retro-board></retro-board>'
        });
    }

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];


    function MainController($state, $mdSidenav, retroBoardService) {
      this.isSideNavOpen = $state.current.name === 'boards';
      this.newBoardName = '';
      this.activeBoard = '';
      this.boards = retroBoardService.boards;

      this.addBoard = function(name) {
        retroBoardService.add({
          name: name,
          users: [],
          cardsToDiscuss: [],
          cardsDiscussed: []
        });
        this.newBoardName = '';
      };

      this.openSidebar = function() {
        $mdSidenav('left').open();
      };

      this.openBoard = function(board) {
        $mdSidenav('left').close();
        $state.go('boards.view', {id: board.$id});
      };

      this.updateBoard = function(board) {
        retroBoardService.save(board);
      };
    }

    MainController.$inject = ['$state', '$mdSidenav', 'retroBoardService'];

    //.directive('app', App);
    //
    //function App() {
    //  return {
    //    controller: AppController,
    //    controllerAs: 'vm',
    //    templateUrl: '/main.html'
    //  };
    //}
    //
    //function AppController($mdSidenav, retroBoardService) {
    //  this.boards = retroBoardService.boards;
    //
    //  this.addBoard = function(name) {
    //    retroBoardService.add({
    //      name: name,
    //      users: [],
    //      cardsToDiscuss: [],
    //      cardsDiscussed: []
    //    });
    //    this.newBoardName = '';
    //  };
    //
    //  this.openSidebar = function() {
    //    $mdSidenav('left').open();
    //  };
    //
    //  this.openBoard = function(board) {
    //    $mdSidenav('left').close();
    //    this.activeBoard = board;
    //  };
    //
    //  this.updateBoard = function(board) {
    //    this.boards.$save(board);
    //  };
    //}
    //
    //AppController.$inject = ['$mdSidenav', 'retroBoardService'];
}());

