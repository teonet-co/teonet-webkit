'use strict';

/**
 * @ngdoc directive
 * @name teonetWebkitApp.directive:peerControl
 * @description
 * # peerControl
 */
angular.module('teonetWebkitApp')
  .directive('peerControl', function () {
    return {
      restrict: 'AE',
      replace:  'true',
      template: '<button ng-click="resetPeer(item.name); $event.stopPropagation();" class="btn btn-xs btn-circle pull-right btn-success" ng-class="item.status.class_reset" ng-hide="item.status.class === \'label-danger\';" data-toggle="tooltip" title="Reset peer"><i class="fa fa-refresh"></i></button>',      
      controller: ['$scope', 'teonet', function ($scope, teonet) {
          // This is Teonet based controller, exit if teonet undefined
          if(!teonet || teonet.notLoaded) { return; }
          // Set scope
          $scope.peersInfo = teonet.peersInfo;    
      }]
    };
  });
