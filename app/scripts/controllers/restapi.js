'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:RestApiCtrl
 * @description
 * # RestApiCtrl
 * Controller of the teonetWebkitApp
 * @param $scope
 * @param $localStorage
 * @param teonetRestApi
 */
angular.module('teonetWebkitApp')

.controller('RestApiCtrl', function ($scope, $localStorage, teonetRestApi) {

  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  
  if(!teonetRestApi || !teonetRestApi.start) { return; }

  // Set LocalStorage Defaults
  if(!$localStorage.restapi) { $localStorage.restapi = {}; }
  if(!$localStorage.restapi.req) {
    $localStorage.restapi.req = { 
        peer: 'teo-db', 
        cmd: 129, 
        data: null 
    };
  }
  $scope.req = $localStorage.restapi.req;

  /**
   * Form click function
   *
   * @param {type} peer
   * @param {type} cmd
   * @param {type} dataInput { key, from, to }
   * @returns {undefined}
   */
  $scope.doClick = function(peer, cmd, dataInput) {

    teonetRestApi.exec(peer, cmd, dataInput, function(err, data) {
        
        if(err) {
            console.log('teonetRestApi.exec error: ' + err);
            return;
        }
        //console.log('teonetRestApi.exec data: ' + JSON.stringify(data));
        $scope.res = data;
    });
   
  };
  
  teonetRestApi.start($scope);
});
