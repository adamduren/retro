/* global _, angular */

(function () {
  'use strict';

  angular
    .module('edit-in-place.directive', [])
    .directive('editInPlace', EditInPlace)
    .directive('editThis', EditThis);

  function EditInPlace() {
    return {
      restrict: 'A',
      transclude: true,
      templateUrl: '/components/edit-in-place/template.html',
      controller: EditInPlaceController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        canEdit: '=editInPlace',
        defaultText: '@'
      }
    };
  }

  EditInPlace.$inject = [];

  function EditInPlaceController($scope, $timeout) {
    var vm = this;

    vm.viewOnlyText = '';
    vm.setViewOnlyText = function(text) {
      vm.viewOnlyText = text;
    };

    vm.$element = null;
    vm.setEditElement = function($element) {
      if (vm.$element) {
        vm.$element.off('.editInPlace');
      }

      vm.$element = $element;
      vm.$element.on('blur.editInPlace', function(e) {
        vm.stopEditing();
        $scope.$apply();
      });
    };

    vm.editing = false;
    vm.startEditing = function () {
      if (!vm.canEdit) {
        return false;
      }

      vm.editing = true;
      $timeout(function() {
        vm.$element.focus();
      });
    };

    vm.stopEditing = function () {
      vm.editing = false;
    };
  }

  EditInPlaceController.$inject = ['$scope', '$timeout'];

  function EditThis() {
    return {
      restrict: 'A',
      require: ['ngModel', '^editInPlace'],
      link: EditThisLink,
      scope: {
        ngModel: '='
      }
    };
  }

  EditThis.$inject = [];

  function EditThisLink($scope, $element, $attrs, controllers) {
    var ngModel = controllers[0], editInPlace = controllers[1];

    editInPlace.setEditElement($element);

    ngModel.$viewChangeListeners.push(function() {
      editInPlace.setViewOnlyText(ngModel.$viewValue);
    });

    ngModel.$render = _.wrap(ngModel.$render, function($render) {
      editInPlace.setViewOnlyText(ngModel.$viewValue);
      $render();
    });
  }
}());

