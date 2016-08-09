'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:PeersCtrl
 * @description
 * # PeersCtrl
 * Controller of the teonetWebkitApp
 */
angular.module('teonetWebkitApp')

  .controller('PeersCtrl', function ($scope, teonet) {
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.master = {};

    $scope.update = function(user) {
        
      $scope.master = angular.copy(user);
      
      var userStr = JSON.stringify(user);
      teonet.sendCmdTo(teonet.kePtr, 'teo-nw-ser', 129, userStr);
      console.log('sendCmdTo: ' + userStr);
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
    
    $scope.var17 = 'Value-17';
    
//    function eventCb() { //ke, ev, data, data_len, user_data) {
//        
//    }
//    
//    teonet.eventCb.register(eventCb);    
    
  });
