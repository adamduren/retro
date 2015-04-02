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

  function MainController($state, $mdSidenav, retroBoardListService) {
    this.isSideNavOpen = $state.current.name === 'boards';
    this.activeBoard = '';
    this.boards = retroBoardListService;

    this.newBoardName = '';
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
  }

  MainController.$inject = ['$state', '$mdSidenav', 'retroBoardListService'];
}());

