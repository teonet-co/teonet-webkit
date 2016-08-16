'use strict';

/**
 * @ngdoc directive
 * @name teonetWebkitApp.directive:peerStatus
 * @description
 * # peerStatus
 */
angular.module('teonetWebkitApp')
  .directive('peerStatus', function () {
    return {
      restrict: 'AE',
      replace:  'true',
      template: '<span class="label label-primary">Active</span>',      
      controller: ['$scope', 'teonet', function ($scope, teonet) {
          // This is Teonet based controller, exit if teonet undefined
          if(!teonet || teonet.notLoaded) { return; }
          // Set scope
          $scope.peersInfo = teonet.peersInfo;    
      }]
    };
  });
