'use strict';

/**
 * @ngdoc directive
 * @name teonetWebkitApp.directive:peersCount
 * @description
 * # peersCount
 */
angular.module('teonetWebkitApp')
  .directive('peersCount', function () {
    return {
      
      restrict: 'AE',
      replace: 'true',
      template: '<span>{{ peersCount }}</span>',      
      controller: 'PeersCountCtrl'
    };
//      link: function postLink(scope, element/*, attrs*/) {
//        element.text('this is the peersCount directive');
//      },
  });
