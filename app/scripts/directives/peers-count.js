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
      template: '<span class="label label-primary label-peers-count">{{ peersInfo.count }}</span>',      
      controller: ['$scope', 'teonet', function ($scope, teonet) {
          // This is Teonet based controller, exit if teonet undefined
          if(!teonet || teonet.notLoaded) { return; }
          // Set scope
          $scope.peersInfo = teonet.peersInfo;    
      }]
    };
  });
