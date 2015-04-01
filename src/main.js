/* global _ */

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


  function MainController($state, $mdSidenav, retroBoardService, retroBoardListService) {
    this.isSideNavOpen = $state.current.name === 'boards';
    this.newBoardName = '';
    this.activeBoard = '';
    this.boards = retroBoardListService;

      this.addBoard = function(name) {
        retroBoardListService.add(name);
        this.newBoardName = '';
      };

      this.openSidebar = function() {
        $mdSidenav('left').open();
      };

      this.openBoard = function(board) {
        $mdSidenav('left').close();
        $state.go('boards.view', {id: board.key});
      };

      this.updateBoard = function(board) {
        retroBoardService.save(board);
      };
    }

    MainController.$inject = ['$state', '$mdSidenav', 'retroBoardService', 'retroBoardListService'];
}());

