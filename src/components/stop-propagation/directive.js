/* global _, angular */

(function () {
  'use strict';

  angular
    .module('stop-propagation.directive', [])
    .directive('stopPropagation', StopPropagation);

  function StopPropagation() {
    return {
      restrict: 'A',
      link: StopPropagationLink
    };
  }

  function StopPropagationLink(scope, element, attrs) {
    element.on(attrs.stopPropagation, function(e) {
      e.stopPropagation();
    });
  }
}());