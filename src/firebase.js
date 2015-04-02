/* global angular, Firebase */

(function () {
    'use strict';

    angular
        .module('retro.firebase', ['firebase'])
        .constant('Firebase', Firebase)
        .constant('firebaseBaseUrl', 'https://drivecurrent-retrospectives.firebaseio.com/')
        .service('backEnd', backEndService)
        .service('cards', cardService);

    function backEndService(Firebase, firebaseBaseUrl) {
        return function (endpoint) {
            return new Firebase(firebaseBaseUrl + endpoint);
        };
    }

    function cardService($firebaseArray, backEnd) {
        return $firebaseArray(backEnd('cards'));
    }

    backEndService.$inject = ['Firebase', 'firebaseBaseUrl'];
    cardService.$inject = ['$firebaseArray', 'backEnd'];
})();
